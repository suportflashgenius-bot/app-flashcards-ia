'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Sparkles, Mail, Lock, User, Zap, Star, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupFullName, setSignupFullName] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: '❌ Erro no login com Google',
        description: error.message || 'Tente novamente',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      toast({
        title: '✅ Login realizado!',
        description: 'Bem-vindo de volta ao Flash Genius!',
      });

      router.push('/');
    } catch (error: any) {
      toast({
        title: '❌ Erro no login',
        description: error.message || 'Verifique suas credenciais',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Criar usuário
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Criar perfil
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            username: signupUsername,
            full_name: signupFullName,
            points: 0,
            level: 1,
            streak: 0,
          });

        if (profileError) throw profileError;

        toast({
          title: '✅ Conta criada!',
          description: 'Bem-vindo ao Flash Genius! Verifique seu email.',
        });

        router.push('/');
      }
    } catch (error: any) {
      toast({
        title: '❌ Erro no cadastro',
        description: error.message || 'Tente novamente',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo & Header com animação */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 mb-4 shadow-2xl transform hover:scale-110 transition-transform duration-300 relative">
            <Brain className="h-10 w-10 text-white animate-pulse" />
            <Sparkles className="h-6 w-6 text-emerald-300 absolute -top-2 -right-2 animate-bounce" />
          </div>
          <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl">
            Flash Genius
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-5 w-5 text-emerald-300 animate-pulse" />
            <p className="text-white/90 text-lg font-semibold">
              Aprenda com Inteligência Artificial
            </p>
            <Star className="h-5 w-5 text-emerald-300 animate-pulse" />
          </div>
        </div>

        {/* Auth Card com design moderno */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom duration-700">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Rocket className="h-6 w-6 text-emerald-300" />
              Bem-vindo!
            </CardTitle>
            <CardDescription className="text-white/70 text-base">
              Entre ou crie sua conta para começar sua jornada de aprendizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Google Login Button com design aprimorado */}
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              variant="outline"
              className="w-full mb-6 border-2 border-white/30 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-3 text-white/70 font-semibold">
                  Ou continue com email
                </span>
              </div>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-md border-white/20 p-1">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-purple-600 font-semibold">
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-purple-600 font-semibold">
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white font-semibold">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/40"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white font-semibold">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/40"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 hover:from-purple-600 hover:via-blue-600 hover:to-emerald-600 text-white font-bold py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar 🚀'}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-white font-semibold">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="João Silva"
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/40"
                        value={signupFullName}
                        onChange={(e) => setSignupFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="text-white font-semibold">Nome de Usuário</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="joaosilva"
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/40"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white font-semibold">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/40"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white font-semibold">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/40"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                    <p className="text-xs text-white/60">Mínimo 6 caracteres</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 hover:from-purple-600 hover:via-blue-600 hover:to-emerald-600 text-white font-bold py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? 'Criando conta...' : 'Criar Conta 🎉'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-white/70 font-medium">
          Ao continuar, você concorda com nossos Termos de Uso
        </p>
      </div>
    </div>
  );
}
