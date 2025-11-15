'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAndCreateProfile(session.user);
      }
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkAndCreateProfile(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAndCreateProfile = async (user: User) => {
    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    // Se não existe, criar perfil
    if (!existingProfile) {
      const username = user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`;
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || username;

      await supabase.from('profiles').insert({
        id: user.id,
        username: username,
        full_name: fullName,
        avatar_url: user.user_metadata?.avatar_url || null,
        points: 0,
        level: 1,
        streak: 0,
      });
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
