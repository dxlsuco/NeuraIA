import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton, SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';

const termNotes = [
  {
    icon: FileText,
    title: 'Termos da plataforma',
    description: 'A versão final irá descrever as condições de uso da Neura, limites da plataforma e responsabilidades do utilizador.',
  },
  {
    icon: HeartHandshake,
    title: 'Uso consciente',
    description: 'A Neura apoia bem-estar emocional, mas não substitui acompanhamento clínico, diagnóstico ou atendimento de emergência.',
  },
  {
    icon: ClipboardCheck,
    title: 'Transparência',
    description: 'As regras de conta, pagamentos, cancelamentos e funcionalidades serão organizadas aqui de forma simples.',
  },
];

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <MarketingShell>
      <section className="bg-gradient-to-br from-cyan-50 via-white to-purple-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <SectionBadge icon={FileText} tone="violet">
              Termos
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neura-text sm:text-5xl">
              Termos de uso da Neura.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neura-muted">
              Esta página está em preparação. O conteúdo jurídico completo será publicado aqui antes da disponibilização pública da plataforma.
            </p>
            <PrimaryButton showArrow={false} onClick={() => navigate('/')} className="mt-8 px-7 py-4">
              Voltar ao início
            </PrimaryButton>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {termNotes.map((note) => {
              const Icon = note.icon;

              return (
                <article
                  key={note.title}
                  className="rounded-3xl border border-sky-100 bg-white/85 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-neura-text">{note.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-neura-muted">{note.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
