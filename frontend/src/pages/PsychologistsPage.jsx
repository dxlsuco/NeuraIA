import { motion } from 'framer-motion';
import { BadgeCheck, CalendarDays, CheckCircle2, GraduationCap, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react';

import { SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';
import { BRAND } from '../components/brandTokens';
import useFetch from '../hooks/useFetch';

const guarantees = [
  {
    icon: GraduationCap,
    title: 'Validação clínica',
    text: 'Perfis revistos com foco em formação, experiência e ética profissional.',
  },
  {
    icon: CalendarDays,
    title: 'Agenda flexível',
    text: 'Horários pensados para encaixar no trabalho, estudos e rotina familiar.',
  },
  {
    icon: ShieldCheck,
    title: 'Ambiente protegido',
    text: 'Sessões e dados tratados com discrição e segurança desde o agendamento.',
  },
];

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function normalizePsychologist(person) {
  const name = person.name ?? person.fullName ?? person.nome ?? 'Psicólogo/a';

  return {
    id: person.id ?? person._id ?? name,
    name,
    area: person.area ?? person.specialty ?? person.specialization ?? person.especialidade ?? 'Especialidade em atualização',
    time: person.time ?? person.availability ?? person.disponibilidade ?? 'Disponibilidade a confirmar',
    initials: person.initials ?? person.iniciais ?? getInitials(name),
  };
}

export default function PsychologistsPage() {
  const { data, loading, error } = useFetch('/api/psychologists');
  const psychologists = Array.isArray(data) ? data.map(normalizePsychologist) : [];

  return (
    <MarketingShell>
      <section className="bg-neura-hero py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionBadge icon={Sparkles} tone="violet">
              Psicólogos
            </SectionBadge>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-neura-text lg:text-6xl">
              Profissionais reais quando precisares de acompanhamento.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neura-muted">
              Encontra psicólogos certificados para sessões online, com uma experiência calma e integrada ao teu percurso na Neura.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {['Certificados', 'Online', 'Acompanhamento contínuo'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-neura-line bg-neura-card px-4 py-2 text-sm font-semibold text-neura-muted shadow-neura">
                  <CheckCircle2 className="text-neura-success" size={16} />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="rounded-3xl border border-neura-line bg-neura-card p-5 shadow-neura-premium"
          >
            <div className="rounded-3xl p-6 text-white" style={{ background: BRAND.gradient }}>
              <UserRoundCheck size={30} className="mb-8 text-white/85" />
              <p className="text-3xl font-extrabold leading-tight">Escolha cuidadosa, conversa humana e confidencial.</p>
              <div className="mt-6 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                <BadgeCheck size={16} />
                Rede clínica verificada
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex animate-pulse items-center gap-4 rounded-2xl border border-neura-line bg-neura-bg p-4">
                    <div className="h-12 w-12 rounded-2xl bg-neura-line" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-2/3 rounded-full bg-neura-line" />
                      <div className="h-3 w-1/2 rounded-full bg-neura-line" />
                    </div>
                  </div>
                ))}

              {!loading && error && (
                <div className="rounded-2xl border border-neura-error/20 bg-red-50 p-4 text-sm font-medium text-neura-error" role="alert">
                  {error}
                </div>
              )}

              {!loading && !error && psychologists.length === 0 && (
                <div className="rounded-2xl border border-neura-line bg-neura-bg p-5 text-sm leading-6 text-neura-muted">
                  Ainda não há psicólogos disponíveis para apresentar.
                </div>
              )}

              {!loading &&
                !error &&
                psychologists.map((person) => (
                  <article key={person.id} className="flex items-center gap-4 rounded-2xl border border-neura-line bg-neura-bg p-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-neura-primary to-neura-secondary text-sm font-bold text-white">
                      {person.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-sm font-bold text-neura-text">{person.name}</h2>
                      <p className="text-sm text-neura-muted">{person.area}</p>
                    </div>
                    <span className="hidden rounded-full bg-neura-accent/15 px-3 py-1.5 text-xs font-semibold text-violet-500 sm:inline-flex">
                      {person.time}
                    </span>
                  </article>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-neura-line bg-neura-card py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {guarantees.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-neura-line bg-neura-bg p-7 shadow-neura"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-neura-primary/10 text-neura-primary">
                <Icon size={22} />
              </div>
              <h2 className="text-base font-bold text-neura-text">{title}</h2>
              <p className="mt-3 text-[15px] leading-7 text-neura-muted">{text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
