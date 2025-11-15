'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

interface CreateFlashcardDialogProps {
  onCardCreated?: () => void;
}

export default function CreateFlashcardDialog({ onCardCreated }: CreateFlashcardDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [topic, setTopic] = useState('');

  const handleGenerateWithAI = async () => {
    if (!topic.trim()) {
      toast({
        title: '⚠️ Atenção',
        description: 'Digite um tópico para gerar flashcards',
        variant: 'destructive',
      });
      return;
    }

    setAiLoading(true);

    try {
      // Simulação de geração com IA (você pode integrar com OpenAI API aqui)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Exemplo de flashcard gerado
      const examples = {
        'javascript': {
          front: 'O que é uma closure em JavaScript?',
          back: 'Uma closure é uma função que tem acesso ao escopo externo, mesmo após a função externa ter retornado. Permite criar funções com estado privado.',
          category: 'Programação',
        },
        'história': {
          front: 'Quando ocorreu a Independência do Brasil?',
          back: '7 de setembro de 1822, proclamada por Dom Pedro I às margens do rio Ipiranga.',
          category: 'História',
        },
        'biologia': {
          front: 'O que é fotossíntese?',
          back: 'Processo pelo qual plantas convertem luz solar, água e CO2 em glicose e oxigênio, essencial para a vida na Terra.',
          category: 'Ciências',
        },
      };

      const topicLower = topic.toLowerCase();
      let generated = examples['javascript']; // padrão

      if (topicLower.includes('história') || topicLower.includes('historia')) {
        generated = examples['história'];
      } else if (topicLower.includes('biologia') || topicLower.includes('ciência')) {
        generated = examples['biologia'];
      } else if (topicLower.includes('javascript') || topicLower.includes('programação')) {
        generated = examples['javascript'];
      }

      setFront(generated.front);
      setBack(generated.back);
      setCategory(generated.category);

      toast({
        title: '✨ Flashcard gerado!',
        description: 'Revise e ajuste se necessário',
      });
    } catch (error) {
      toast({
        title: '❌ Erro ao gerar',
        description: 'Tente novamente',
        variant: 'destructive',
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: '❌ Erro',
        description: 'Você precisa estar logado',
        variant: 'destructive',
      });
      return;
    }

    if (!front.trim() || !back.trim() || !category.trim()) {
      toast({
        title: '⚠️ Atenção',
        description: 'Preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('flashcards').insert({
        user_id: user.id,
        front: front.trim(),
        back: back.trim(),
        category: category.trim(),
        difficulty,
        next_review: new Date().toISOString(),
        review_count: 0,
        correct_count: 0,
      });

      if (error) throw error;

      toast({
        title: '✅ Flashcard criado!',
        description: 'Comece a estudar agora',
      });

      // Resetar formulário
      setFront('');
      setBack('');
      setCategory('');
      setTopic('');
      setDifficulty('medium');
      setOpen(false);

      // Callback para recarregar dados
      if (onCardCreated) {
        onCardCreated();
      }
    } catch (error: any) {
      console.error('Erro ao criar flashcard:', error);
      toast({
        title: '❌ Erro ao criar',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-white text-purple-600 hover:bg-purple-50 dark:bg-gray-900 dark:text-purple-400 dark:hover:bg-gray-800"
        >
          <Plus className="h-5 w-5 mr-2" />
          Criar Flashcard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Flashcard</DialogTitle>
          <DialogDescription>
            Crie um flashcard manualmente ou use nossa IA para gerar automaticamente
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Geração com IA */}
          <div className="space-y-3 p-4 bg-gradient-to-r from-purple-50 via-blue-50 to-emerald-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-emerald-950/20 rounded-lg">
            <Label htmlFor="topic">Gerar com IA</Label>
            <div className="flex gap-2">
              <Input
                id="topic"
                placeholder="Ex: JavaScript, História do Brasil, Biologia..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleGenerateWithAI}
                disabled={aiLoading}
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 hover:from-purple-600 hover:via-blue-600 hover:to-emerald-600"
              >
                {aiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Gerar
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Digite um tópico e deixe a IA criar o flashcard para você
            </p>
          </div>

          {/* Campos manuais */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="front">Frente do Card *</Label>
              <Textarea
                id="front"
                placeholder="Digite a pergunta ou conceito..."
                value={front}
                onChange={(e) => setFront(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="back">Verso do Card *</Label>
              <Textarea
                id="back"
                placeholder="Digite a resposta ou explicação..."
                value={back}
                onChange={(e) => setBack(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Input
                  id="category"
                  placeholder="Ex: Matemática, Inglês..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Dificuldade</Label>
                <Select
                  value={difficulty}
                  onValueChange={(value: 'easy' | 'medium' | 'hard') =>
                    setDifficulty(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Fácil</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="hard">Difícil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 hover:from-purple-600 hover:via-blue-600 hover:to-emerald-600"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Flashcard
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
