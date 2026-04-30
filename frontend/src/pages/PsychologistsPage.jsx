import { FaUserDoctor } from 'react-icons/fa6';
import { HiAcademicCap, HiCalendarDays, HiCheckCircle, HiShieldCheck, HiSparkles } from 'react-icons/hi2';
import MarketingShell from '../components/MarketingShell';

const psychologists = [
  { name: 'Dra. Ana Martins', area: 'Ansiedade e stress', time: 'Sessões online' },
  { name: 'Dr. Miguel Costa', area: 'Relações e autoestima', time: 'Disponível à noite' },
  { name: 'Dra. Sofia Almeida', area: 'Jovens adultos', time: 'Acompanhamento semanal' },
];

export default function PsychologistsPage() {
  return (
    <MarketingShell>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neura-200 rounded-full text-neura-700 text-xs font-medium">
              <HiSparkles size={12} />
              Psicólogos
            </div>
            <h1 className="font-display text-5xl lg:text-[3.5rem] leading-[1.08] text-gray-900 tracking-tight">
              Profissionais reais quando precisares de acompanhamento.
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Encontra psicólogos certificados para sessões online, com uma experiência calma e integrada ao teu percurso na Neura.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Certificados', 'Online', 'Acompanhamento contínuo'].map(item => (
                <span key={item} className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-neura-100 rounded-xl text-xs text-gray-600 shadow-sm">
                  <HiCheckCircle className="text-neura-500" size={14} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-neura-100 rounded-4xl p-5 shadow-xl shadow-neura-100/70">
            <div className="rounded-3xl bg-gradient-to-br from-neura-600 to-neura-800 p-6 text-white mb-4">
              <FaUserDoctor size={28} className="mb-8 text-neura-100" />
              <p className="font-display text-3xl leading-tight">Escolha cuidadosa, conversa humana e confidencial.</p>
            </div>
            <div className="space-y-3">
              {psychologists.map(person => (
                <div key={person.name} className="flex items-center gap-4 p-4 rounded-2xl bg-neura-50 border border-neura-100">
                  <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-neura-600 border border-neura-100">
                    <FaUserDoctor size={18} />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900 text-sm">{person.name}</h2>
                    <p className="text-xs text-gray-500">{person.area}</p>
                  </div>
                  <span className="text-xs text-neura-600 font-medium">{person.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-5">
          {[
            { icon: HiAcademicCap, title: 'Validação clínica', text: 'Perfis revistos com foco em formação, experiência e ética profissional.' },
            { icon: HiCalendarDays, title: 'Agenda flexível', text: 'Horários pensados para encaixar no trabalho, estudos e rotina familiar.' },
            { icon: HiShieldCheck, title: 'Ambiente protegido', text: 'Sessões e dados tratados com discrição e segurança desde o agendamento.' },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl bg-neura-50 border border-neura-100 p-7">
              <Icon size={24} className="text-neura-600 mb-5" />
              <h2 className="font-semibold text-gray-900 mb-2">{title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
