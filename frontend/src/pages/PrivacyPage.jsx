import { motion } from 'framer-motion';
import { LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton, SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';

const privacyPoints = [
  {
    icon: ShieldCheck,
    title: 'Proteção em primeiro lugar',
    description: 'A versão final desta página irá detalhar como os dados pessoais são recolhidos, usados e protegidos.',
  },
  {
    icon: LockKeyhole,
    title: 'Dados sensíveis',
    description: 'As informações emocionais e de bem-estar devem ter tratamento claro, seguro e transparente.',
  },
  {
    icon: Sparkles,
    title: 'IA responsável',
    description: 'A política irá explicar como a IA da Neura usa contexto para apoiar a experiência sem substituir cuidado profissional.',
  },
];

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <MarketingShell>
      <section className="bg-neura-hero px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <SectionBadge icon={ShieldCheck} tone="blue">
              Privacidade
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neura-text sm:text-5xl">
              Privacidade e proteção dos teus dados.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neura-muted">
              Esta página está em preparação. Em breve, a Neura irá apresentar aqui a política completa de privacidade, com linguagem clara e foco em confiança.
            </p>
            <PrimaryButton showArrow={false} onClick={() => navigate('/')} className="mt-8 px-7 py-4">
              Voltar ao início
            </PrimaryButton>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {privacyPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="rounded-3xl border border-teal-100 bg-white/85 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-neura-text">{point.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-neura-muted">{point.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
