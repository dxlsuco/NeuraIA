import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CloudRain, Frown, Heart, Meh, Smile, Sparkles } from 'lucide-react';
import { BrandLogo, SectionBadge } from '../components/Brand';
import { BRAND } from '../components/brandTokens';
import { cn } from '../utils/cn';

const moods = [
  { id: 'very-low', icon: Frown, label: 'Muito em baixo', tone: 'text-red-500 bg-red-50 border-red-100' },
  { id: 'confused', icon: CloudRain, label: 'Sobrecarregado/a', tone: 'text-orange-500 bg-orange-50 border-orange-100' },
  { id: 'neutral', icon: Meh, label: 'Neutro/a', tone: 'text-slate-500 bg-slate-50 border-slate-100' },
  { id: 'calm', icon: Smile, label: 'Em paz', tone: 'text-teal-600 bg-teal-50 border-teal-100' },
  { id: 'well', icon: Heart, label: 'Bem', tone: 'text-violet-600 bg-violet-50 border-violet-100' },
];

const topics = ['Ansiedade / Stress', 'Relações pessoais', 'Família', 'Trabalho / Estudos', 'Sono', 'Outro'];

export default function CheckInPage() {
  const navigate = useNavigate();
  const [mood, setMood] = useState(null);
  const [topic, setTopic] = useState(null);

  const handleContinue = () => {
    if (mood && topic) {
      navigate('/chat', { state: { mood, topic } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            aria-label="Voltar"
          >
            <ArrowLeft size={19} />
          </button>
          <BrandLogo onClick={() => navigate('/')} />
          <div className="h-10 w-10" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-neura sm:p-8"
        >
          <div className="text-center">
            <SectionBadge icon={Sparkles} tone="blue" className="justify-center">
              Check-in emocional
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-normal text-slate-950">Como te sentes neste momento?</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">Isto ajuda a Neura a começar a conversa com mais contexto.</p>
          </div>

          <section className="mt-9">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {moods.map((item, index) => {
                const Icon = item.icon;
                const selected = mood === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => setMood(item.id)}
                    className={cn(
                      'flex min-h-[124px] flex-col items-center justify-center gap-3 rounded-3xl border p-4 text-center transition-all hover:-translate-y-1',
                      selected ? 'border-transparent text-white shadow-xl shadow-blue-500/20' : `${item.tone} hover:shadow-neura`,
                    )}
                    style={selected ? { background: BRAND.gradient } : undefined}
                  >
                    <Icon size={30} className={selected ? 'text-white' : undefined} />
                    <span className="text-sm font-bold leading-5">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-slate-950">Sobre o que gostarias de falar?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {topics.map((item) => {
                const selected = topic === item;

                return (
                  <button
                    key={item}
                    onClick={() => setTopic(item)}
                    className={cn(
                      'rounded-2xl border px-5 py-4 text-left text-sm font-bold transition-all hover:-translate-y-0.5',
                      selected
                        ? 'border-transparent text-white shadow-lg shadow-blue-500/20'
                        : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700',
                    )}
                    style={selected ? { background: BRAND.tealGradient } : undefined}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </section>

          <button
            onClick={handleContinue}
            disabled={!mood || !topic}
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-xl transition-all hover:scale-[1.01] hover:shadow-blue-500/30 disabled:pointer-events-none disabled:bg-slate-300 disabled:shadow-none"
            style={mood && topic ? { background: BRAND.gradient } : undefined}
          >
            Começar conversa
            <ArrowRight size={17} />
          </button>
        </motion.div>
      </main>
    </div>
  );
}
