import { motion } from 'framer-motion';
import { Clock3, Mail, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton, SecondaryButton, SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';

const contactCards = [
  {
    icon: Mail,
    title: 'Contacto institucional',
    description: 'A área de contacto será ligada aos canais oficiais da Neura quando a plataforma estiver pronta.',
  },
  {
    icon: MessageCircle,
    title: 'Apoio ao utilizador',
    description: 'Perguntas sobre conta, planos e utilização terão um fluxo próprio de suporte.',
  },
  {
    icon: Clock3,
    title: 'Resposta organizada',
    description: 'Os pedidos serão tratados com prioridade e contexto, mantendo uma experiência simples e acolhedora.',
  },
];

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <MarketingShell>
      <section className="bg-gradient-to-br from-teal-50 via-white to-violet-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <SectionBadge icon={Mail} tone="sage">
              Contacto
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neura-text sm:text-5xl">
              Fala com a equipa Neura.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neura-muted">
              Esta página está em preparação. Em breve, estarão disponíveis canais claros para contacto, suporte e parcerias.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton showArrow={false} onClick={() => navigate('/')} className="px-7 py-4">
                Voltar ao início
              </PrimaryButton>
              <SecondaryButton onClick={() => navigate('/check-in')} className="px-7 py-4">
                Fazer check-in
              </SecondaryButton>
            </div>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-3xl border border-orange-100 bg-white/85 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-neura-text">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-neura-muted">{card.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
