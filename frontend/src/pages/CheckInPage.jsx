import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CloudRain, Frown, Heart, Meh, Smile, Sparkles } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { BrandLogo, SectionBadge } from '../components/Brand';
import { BRAND } from '../components/brandTokens';
import { useAuth } from '../context/AuthContext';
import { recordCheckIn } from '../services/emotionalMemoryService';
import { getChatUserId, saveCheckInContext } from '../utils/chatSession';
import { cn } from '../utils/cn';
import { toast } from '../utils/toast';

const moods = [
  { id: 'very-low', icon: Frown, label: 'Muito em baixo', tone: 'text-neura-error bg-red-50 border-red-100' },
  { id: 'confused', icon: CloudRain, label: 'Sobrecarregado/a', tone: 'text-neura-warning bg-neura-accent2/20 border-neura-accent2/40' },
  { id: 'neutral', icon: Meh, label: 'Neutro/a', tone: 'text-neura-muted bg-neura-bg border-neura-line' },
  { id: 'calm', icon: Smile, label: 'Em paz', tone: 'text-violet-500 bg-neura-accent/15 border-neura-accent/30' },
  { id: 'well', icon: Heart, label: 'Bem', tone: 'text-neura-secondary bg-neura-secondary/10 border-neura-secondary/25' },
];

const topics = ['Ansiedade / Stress', 'Relações pessoais', 'Família', 'Trabalho / Estudos', 'Sono', 'Outro'];

const checkInSchema = z.object({
  mood: z.string().min(1, 'Escolhe como te sentes neste momento.'),
  topic: z.string().min(1, 'Escolhe um tema para a conversa.'),
});

export default function CheckInPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const memoryUserId = getChatUserId(user, 'chat');
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      mood: '',
      topic: '',
    },
  });

  const mood = useWatch({ control, name: 'mood' });
  const topic = useWatch({ control, name: 'topic' });
  const isReady = Boolean(mood && topic);

  const selectMood = (value) => {
    setValue('mood', value, { shouldDirty: true, shouldValidate: true });
  };

  const selectTopic = (value) => {
    setValue('topic', value, { shouldDirty: true, shouldValidate: true });
  };

  const handleContinue = (values) => {
    const selectedMood = moods.find((item) => item.id === values.mood);
    const context = {
      mood: values.mood,
      moodLabel: selectedMood?.label ?? values.mood,
      topic: values.topic,
    };
    const memoryEntry = {
      ...context,
      source: 'check-in',
      createdAt: new Date().toISOString(),
    };

    saveCheckInContext(context);
    recordCheckIn(memoryUserId, memoryEntry);
    toast.success('Check-in registado. A preparar a conversa.');
    navigate('/chat', { state: context });
  };

  return (
    <div className="min-h-screen bg-neura-bg text-neura-text">
      <header className="sticky top-0 z-40 border-b border-neura-line bg-neura-card/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neura-line bg-neura-card text-neura-muted shadow-sm transition-colors hover:border-neura-primary/40 hover:bg-neura-primary/10 hover:text-teal-700"
            aria-label="Voltar"
          >
            <ArrowLeft size={19} />
          </button>
          <BrandLogo onClick={() => navigate('/')} />
          <div className="h-10 w-10" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.form
          onSubmit={handleSubmit(handleContinue)}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-neura-line bg-neura-card p-5 shadow-neura sm:p-8"
        >
          <input type="hidden" {...register('mood')} />
          <input type="hidden" {...register('topic')} />

          <div className="text-center">
            <SectionBadge icon={Sparkles} tone="blue" className="justify-center">
              Check-in emocional
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-normal text-neura-text">Como te sentes neste momento?</h1>
            <p className="mt-3 text-[15px] leading-7 text-neura-muted">Isto ajuda a Neura a começar a conversa com mais contexto.</p>
          </div>

          <section className="mt-9" aria-invalid={Boolean(errors.mood)} aria-describedby={errors.mood ? 'mood-error' : undefined}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {moods.map((item, index) => {
                const Icon = item.icon;
                const selected = mood === item.id;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => selectMood(item.id)}
                    className={cn(
                      'flex min-h-[124px] flex-col items-center justify-center gap-3 rounded-3xl border p-4 text-center transition-all hover:-translate-y-1',
                      selected ? 'border-transparent text-white shadow-xl shadow-teal-400/20' : `${item.tone} hover:shadow-neura`,
                    )}
                    style={selected ? { background: BRAND.gradient } : undefined}
                  >
                    <Icon size={30} className={selected ? 'text-white' : undefined} />
                    <span className="text-sm font-bold leading-5">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
            {errors.mood && (
              <p id="mood-error" className="mt-3 text-sm font-medium text-neura-error">
                {errors.mood.message}
              </p>
            )}
          </section>

          <section className="mt-10" aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? 'topic-error' : undefined}>
            <h2 className="text-xl font-extrabold text-neura-text">Sobre o que gostarias de falar?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {topics.map((item) => {
                const selected = topic === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => selectTopic(item)}
                    className={cn(
                      'rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all hover:-translate-y-0.5',
                      selected
                        ? 'border-transparent text-white shadow-lg shadow-teal-400/20'
                        : 'border-neura-line bg-neura-bg text-neura-text hover:border-neura-secondary/30 hover:bg-neura-secondary/10 hover:text-neura-secondary',
                    )}
                    style={selected ? { background: BRAND.tealGradient } : undefined}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            {errors.topic && (
              <p id="topic-error" className="mt-3 text-sm font-medium text-neura-error">
                {errors.topic.message}
              </p>
            )}
          </section>

          <button
            type="submit"
            className={cn(
              'mt-10 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-xl transition-all hover:scale-[1.01] hover:shadow-teal-400/30',
              !isReady && 'bg-slate-300 shadow-none hover:scale-100 hover:shadow-none',
            )}
            style={isReady ? { background: BRAND.gradient } : undefined}
          >
            Começar conversa
            <ArrowRight size={17} />
          </button>
        </motion.form>
      </main>
    </div>
  );
}
