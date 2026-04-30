import { HiChatBubbleLeftRight, HiChartBarSquare, HiLockClosed, HiMoon, HiSparkles, HiUserGroup } from 'react-icons/hi2';
import MarketingShell from '../components/MarketingShell';

const resources = [
  { icon: HiChatBubbleLeftRight, title: 'Conversa com IA empática', text: 'Um espaço imediato para organizar pensamentos, respirar e falar sem pressão.' },
  { icon: HiChartBarSquare, title: 'Registo emocional', text: 'Check-ins simples ajudam a perceber padrões de humor, stress e energia.' },
  { icon: HiUserGroup, title: 'Encaminhamento humano', text: 'Quando precisares, a plataforma aproxima-te de psicólogos certificados.' },
  { icon: HiLockClosed, title: 'Privacidade por desenho', text: 'Fluxos pensados para proteger conversas sensíveis desde o primeiro contacto.' },
];

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neura-200 rounded-full text-neura-700 text-xs font-medium">
            <HiSparkles size={12} />
            Recursos
          </div>
          <h1 className="font-display text-5xl lg:text-[3.5rem] leading-[1.08] text-gray-900 tracking-tight">
            Apoio prático para o teu dia a dia emocional.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Ferramentas discretas, acolhedoras e fáceis de usar para acompanhar o que sentes e encontrar o próximo passo certo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {resources.map(({ icon: Icon, title, text }) => (
            <article key={title} className="bg-white border border-neura-100 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-neura-100 text-neura-600 flex items-center justify-center mb-5">
                <Icon size={20} />
              </div>
              <h2 className="font-semibold text-gray-900 mb-2 text-sm">{title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div>
            <p className="text-xs font-semibold text-neura-600 uppercase tracking-widest mb-3">Rotina guiada</p>
            <h2 className="font-display text-4xl text-gray-900 tracking-tight mb-4">Pequenos passos, mais clareza.</h2>
            <p className="text-gray-500 leading-relaxed">
              A Neura combina conversa, check-in e sugestões suaves para transformar momentos difíceis em decisões mais simples.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: HiMoon, label: 'Respirar', desc: 'Pausas rápidas para reduzir tensão.' },
              { icon: HiChatBubbleLeftRight, label: 'Falar', desc: 'Desabafar com contexto e segurança.' },
              { icon: HiChartBarSquare, label: 'Perceber', desc: 'Reconhecer sinais recorrentes.' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-3xl bg-neura-50 border border-neura-100 p-5">
                <Icon className="text-neura-600 mb-4" size={22} />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
