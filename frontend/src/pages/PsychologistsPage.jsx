import { motion } from 'framer-motion';
import { BadgeCheck, CalendarDays, CheckCircle2, GraduationCap, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react';
import MarketingShell from '../components/MarketingShell';
import { SectionBadge } from '../components/Brand';
import { BRAND } from '../components/brandTokens';

const psychologists = [
  { name: 'Dra. Ana Martins', area: 'Ansiedade e stress', time: 'Sessões online', initials: 'AM' },
  { name: 'Dr. Miguel Costa', area: 'Relações e autoestima', time: 'Disponível à noite', initials: 'MC' },
  { name: 'Dra. Sofia Almeida', area: 'Jovens adultos', time: 'Acompanhamento semanal', initials: 'SA' },
];

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

export default function PsychologistsPage() {
  return (
    <MarketingShell>
      <section className="bg-[linear-gradient(135deg,#F8FAFF_0%,#EEF2FF_48%,#F5F3FF_100%)] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionBadge icon={Sparkles} tone="violet">
              Psicólogos
            </SectionBadge>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-slate-950 lg:text-6xl">
              Profissionais reais quando precisares de acompanhamento.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              Encontra psicólogos certificados para sessões online, com uma experiência calma e integrada ao teu percurso na Neura.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {['Certificados', 'Online', 'Acompanhamento contínuo'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-neura">
                  <CheckCircle2 className="text-teal-600" size={16} />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-neura-premium"
          >
            <div className="rounded-3xl p-6 text-white" style={{ background: BRAND.gradient }}>
              <UserRoundCheck size={30} className="mb-8 text-blue-100" />
              <p className="text-3xl font-extrabold leading-tight">Escolha cuidadosa, conversa humana e confidencial.</p>
              <div className="mt-6 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                <BadgeCheck size={16} />
                Rede clínica verificada
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {psychologists.map((person) => (
                <article key={person.name} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-[#F8FAFF] p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">
                    {person.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-bold text-slate-950">{person.name}</h2>
                    <p className="text-xs text-slate-500">{person.area}</p>
                  </div>
                  <span className="hidden rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 sm:inline-flex">
                    {person.time}
                  </span>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {guarantees.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-slate-100 bg-[#F8FAFF] p-7 shadow-neura"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Icon size={22} />
              </div>
              <h2 className="text-base font-bold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
