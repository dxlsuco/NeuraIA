import { HiArrowRight, HiChatBubbleLeftRight, HiCheckCircle, HiClipboardDocumentCheck, HiSparkles, HiUserGroup } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import MarketingShell from '../components/MarketingShell';

const steps = [
  { icon: HiClipboardDocumentCheck, number: '01', title: 'Faz um check-in', text: 'Escolhe como te sentes e o tema que gostarias de explorar.' },
  { icon: HiChatBubbleLeftRight, number: '02', title: 'Conversa com a Neura', text: 'Recebe apoio imediato num chat simples, acolhedor e sem julgamentos.' },
  { icon: HiUserGroup, number: '03', title: 'Avança com apoio humano', text: 'Quando fizer sentido, agenda acompanhamento com um profissional.' },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <MarketingShell>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neura-200 rounded-full text-neura-700 text-xs font-medium">
            <HiSparkles size={12} />
            Como funciona
          </div>
          <h1 className="font-display text-5xl lg:text-[3.5rem] leading-[1.08] text-gray-900 tracking-tight">
            Começar deve ser simples, mesmo num dia difícil.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            A experiência foi desenhada para te levar do primeiro check-in ao apoio certo com o mínimo de fricção.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {steps.map(({ icon: Icon, number, title, text }) => (
            <article key={number} className="bg-white border border-neura-100 rounded-3xl p-7 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-neura-100 text-neura-600 flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <span className="font-display text-5xl text-neura-200 font-semibold leading-none">{number}</span>
              </div>
              <h2 className="font-semibold text-gray-900 mb-2">{title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-7">
          <div className="flex flex-wrap justify-center gap-2">
            {['Privado', 'Imediato', 'Humano quando necessário'].map(item => (
              <span key={item} className="inline-flex items-center gap-2 px-3.5 py-2 bg-neura-50 border border-neura-100 rounded-xl text-xs text-gray-600">
                <HiCheckCircle className="text-neura-500" size={14} />
                {item}
              </span>
            ))}
          </div>
          <h2 className="font-display text-4xl text-gray-900 tracking-tight">Experimenta o primeiro passo.</h2>
          <button onClick={() => navigate('/check-in')} className="inline-flex items-center gap-2 px-7 py-4 bg-neura-600 hover:bg-neura-700 text-white rounded-2xl font-semibold text-sm transition-colors shadow-lg shadow-neura-200/70">
            Fazer check-in <HiArrowRight size={16} />
          </button>
        </div>
      </section>
    </MarketingShell>
  );
}
