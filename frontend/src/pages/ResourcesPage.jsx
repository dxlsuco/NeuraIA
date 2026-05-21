import { motion } from 'framer-motion';
import { Bot, Brain, ChartNoAxesCombined, LockKeyhole, Moon, Sparkles, Wind } from 'lucide-react';

import { SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';
import useFetch from '../hooks/useFetch';
import { cn } from '../utils/cn';

const resourceIcons = {
  ai: Bot,
  bot: Bot,
  chat: Bot,
  mood: ChartNoAxesCombined,
  checkin: ChartNoAxesCombined,
  emotional: ChartNoAxesCombined,
  clarity: Brain,
  brain: Brain,
  privacy: LockKeyhole,
  security: LockKeyhole,
};

const fallbackIcons = [Bot, ChartNoAxesCombined, Brain, LockKeyhole];

const fallbackTones = [
  'bg-neura-primary/10 text-neura-primary',
  'bg-neura-secondary/10 text-neura-secondary',
  'bg-neura-accent/15 text-violet-500',
  'bg-neura-secondary/10 text-neura-secondary',
];

const routine = [
  { icon: Wind, label: 'Respirar', desc: 'Pausas rápidas para reduzir tensão.' },
  { icon: Bot, label: 'Falar', desc: 'Desabafar com contexto e segurança.' },
  { icon: Moon, label: 'Repor', desc: 'Fechar o dia com mais estabilidade.' },
];

function normalizeResource(resource, index) {
  const iconKey = String(resource.icon ?? resource.type ?? resource.category ?? '').toLowerCase();
  const Icon = resourceIcons[iconKey] ?? fallbackIcons[index % fallbackIcons.length];

  return {
    id: resource.id ?? resource._id ?? resource.slug ?? resource.title ?? resource.name ?? index,
    icon: Icon,
    title: resource.title ?? resource.name ?? 'Recurso',
    text: resource.text ?? resource.description ?? resource.summary ?? 'Descrição em atualização.',
    tone: resource.tone ?? fallbackTones[index % fallbackTones.length],
  };
}

export default function ResourcesPage() {
  const { data, loading, error } = useFetch('/api/resources');
  const resources = Array.isArray(data) ? data.map(normalizeResource) : [];

  return (
    <MarketingShell>
      <section className="bg-neura-hero py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <SectionBadge icon={Sparkles} tone="teal">
              Recursos
            </SectionBadge>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-neura-text lg:text-6xl">
              Apoio prático para o teu dia a dia emocional.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neura-muted">
              Ferramentas discretas, acolhedoras e fáceis de usar para acompanhar o que sentes e encontrar o próximo passo certo.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <article key={index} className="animate-pulse rounded-3xl border border-neura-line bg-neura-card p-6 shadow-neura">
                  <div className="mb-5 h-11 w-11 rounded-2xl bg-neura-line" />
                  <div className="h-4 w-2/3 rounded-full bg-neura-line" />
                  <div className="mt-4 space-y-2">
                    <div className="h-3 rounded-full bg-neura-line" />
                    <div className="h-3 w-5/6 rounded-full bg-neura-line" />
                  </div>
                </article>
              ))}

            {!loading && error && (
              <div className="rounded-3xl border border-neura-error/20 bg-red-50 p-6 text-sm font-medium text-neura-error md:col-span-2 lg:col-span-4" role="alert">
                {error}
              </div>
            )}

            {!loading && !error && resources.length === 0 && (
              <div className="rounded-3xl border border-neura-line bg-neura-card p-6 text-sm leading-6 text-neura-muted shadow-neura md:col-span-2 lg:col-span-4">
                Ainda não há recursos disponíveis para apresentar.
              </div>
            )}

            {!loading &&
              !error &&
              resources.map(({ id, icon: Icon, title, text, tone }, index) => (
                <motion.article
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-3xl border border-neura-line bg-neura-card p-6 shadow-neura transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={cn('mb-5 flex h-11 w-11 items-center justify-center rounded-2xl', tone)}>
                    <Icon size={21} />
                  </div>
                  <h2 className="text-base font-bold text-neura-text">{title}</h2>
                  <p className="mt-3 text-[15px] leading-7 text-neura-muted">{text}</p>
                </motion.article>
              ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neura-line bg-neura-card py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionBadge tone="blue">Rotina guiada</SectionBadge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-normal text-neura-text sm:text-4xl">Pequenos passos, mais clareza.</h2>
            <p className="mt-4 text-base leading-7 text-neura-muted">
              A Neura combina conversa, check-in e sugestões suaves para transformar momentos difíceis em decisões mais simples.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {routine.map(({ icon: Icon, label, desc }) => (
              <article key={label} className="rounded-3xl border border-neura-line bg-neura-bg p-6 shadow-neura">
                <Icon className="mb-5 text-neura-primary" size={24} />
                <h3 className="text-sm font-bold text-neura-text">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-neura-muted">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
