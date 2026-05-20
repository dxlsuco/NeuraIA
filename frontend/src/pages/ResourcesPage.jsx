import { motion } from 'framer-motion';
import { Bot, Brain, ChartNoAxesCombined, LockKeyhole, Moon, Sparkles, Wind } from 'lucide-react';
import MarketingShell from '../components/MarketingShell';
import { SectionBadge } from '../components/Brand';
import { cn } from '../utils/cn';

const resources = [
  {
    icon: Bot,
    title: 'Conversa com IA empática',
    text: 'Um espaço imediato para organizar pensamentos, respirar e falar sem pressão.',
    tone: 'bg-blue-50 text-blue-600',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Registo emocional',
    text: 'Check-ins simples ajudam a perceber padrões de humor, stress e energia.',
    tone: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Brain,
    title: 'Clareza guiada',
    text: 'Perguntas curtas transformam momentos difíceis em decisões pequenas e possíveis.',
    tone: 'bg-teal-50 text-teal-600',
  },
  {
    icon: LockKeyhole,
    title: 'Privacidade por desenho',
    text: 'Fluxos pensados para proteger conversas sensíveis desde o primeiro contacto.',
    tone: 'bg-sage-50 text-sage-600',
  },
];

const routine = [
  { icon: Wind, label: 'Respirar', desc: 'Pausas rápidas para reduzir tensão.' },
  { icon: Bot, label: 'Falar', desc: 'Desabafar com contexto e segurança.' },
  { icon: Moon, label: 'Repor', desc: 'Fechar o dia com mais estabilidade.' },
];

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <section className="bg-[linear-gradient(135deg,#EEF2FF_0%,#F8FAFF_54%,#F0FDFA_100%)] py-20">
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
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-slate-950 lg:text-6xl">
              Apoio prático para o teu dia a dia emocional.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              Ferramentas discretas, acolhedoras e fáceis de usar para acompanhar o que sentes e encontrar o próximo passo certo.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {resources.map(({ icon: Icon, title, text, tone }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-neura transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={cn('mb-5 flex h-11 w-11 items-center justify-center rounded-2xl', tone)}>
                  <Icon size={21} />
                </div>
                <h2 className="text-base font-bold text-slate-950">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionBadge tone="blue">Rotina guiada</SectionBadge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">Pequenos passos, mais clareza.</h2>
            <p className="mt-4 text-base leading-7 text-slate-500">
              A Neura combina conversa, check-in e sugestões suaves para transformar momentos difíceis em decisões mais simples.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {routine.map(({ icon: Icon, label, desc }) => (
              <article key={label} className="rounded-3xl border border-slate-100 bg-[#F8FAFF] p-6 shadow-neura">
                <Icon className="mb-5 text-blue-600" size={24} />
                <h3 className="text-sm font-bold text-slate-950">{label}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
