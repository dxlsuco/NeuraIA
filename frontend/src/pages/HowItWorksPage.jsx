import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, CheckCircle2, ClipboardCheck, Sparkles, Users } from 'lucide-react';
import MarketingShell from '../components/MarketingShell';
import { PrimaryButton, SectionBadge } from '../components/Brand';

const steps = [
  {
    icon: ClipboardCheck,
    number: '01',
    title: 'Faz um check-in',
    text: 'Escolhe como te sentes e o tema que gostarias de explorar.',
  },
  {
    icon: Bot,
    number: '02',
    title: 'Conversa com a Neura',
    text: 'Recebe apoio imediato num chat simples, acolhedor e sem julgamentos.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Avança com apoio humano',
    text: 'Quando fizer sentido, agenda acompanhamento com um profissional.',
  },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <MarketingShell>
      <section className="bg-neura-hero py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <SectionBadge icon={Sparkles} tone="blue" className="justify-center">
              Como funciona
            </SectionBadge>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-neura-text lg:text-6xl">
              Começar deve ser simples, mesmo num dia difícil.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neura-muted">
              A experiência foi desenhada para te levar do primeiro check-in ao apoio certo com o mínimo de fricção.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, number, title, text }, index) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-neura-line bg-neura-card p-7 shadow-neura transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neura-primary/10 text-neura-primary">
                    <Icon size={23} />
                  </div>
                  <span className="text-5xl font-extrabold leading-none text-neura-primary/25">{number}</span>
                </div>
                <h2 className="text-lg font-bold text-neura-text">{title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-neura-muted">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neura-line bg-neura-card py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {['Privado', 'Imediato', 'Humano quando necessário'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-neura-line bg-neura-bg px-4 py-2 text-sm font-semibold text-neura-muted">
                <CheckCircle2 className="text-neura-success" size={15} />
                {item}
              </span>
            ))}
          </div>
          <h2 className="mt-7 text-3xl font-extrabold tracking-normal text-neura-text sm:text-4xl">Experimenta o primeiro passo.</h2>
          <PrimaryButton onClick={() => navigate('/check-in')} className="mt-8 px-7 py-4">
            Fazer check-in
          </PrimaryButton>
          <button
            onClick={() => navigate('/recursos')}
            className="ml-0 mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-neura-muted transition-colors hover:text-neura-secondary sm:ml-3"
          >
            Ver recursos
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </MarketingShell>
  );
}
