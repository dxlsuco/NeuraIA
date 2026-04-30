import { HiArrowRight, HiCheckCircle, HiSparkles } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import MarketingShell from '../components/MarketingShell';

const plans = [
  { name: 'Essencial', price: 'Grátis', text: 'Para começar com check-ins e conversa imediata.', items: ['Chat com IA', 'Check-in emocional', 'Modo anónimo'], featured: false },
  { name: 'Acompanhamento', price: 'Personalizado', text: 'Para quem quer continuidade e suporte profissional.', items: ['Tudo do Essencial', 'Agendamento com psicólogo', 'Histórico e insights'], featured: true },
  { name: 'Instituições', price: 'Sob consulta', text: 'Para escolas, equipas e organizações de cuidado.', items: ['Gestão de grupos', 'Relatórios agregados', 'Configuração assistida'], featured: false },
];

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <MarketingShell>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neura-200 rounded-full text-neura-700 text-xs font-medium">
            <HiSparkles size={12} />
            Preços
          </div>
          <h1 className="font-display text-5xl lg:text-[3.5rem] leading-[1.08] text-gray-900 tracking-tight">
            Começa sem custo e evolui quando fizer sentido.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Planos pensados para diferentes níveis de apoio, desde conversa imediata até acompanhamento profissional.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mt-16">
          {plans.map(plan => (
            <article
              key={plan.name}
              className={`rounded-3xl p-7 border shadow-sm ${
                plan.featured
                  ? 'bg-gradient-to-br from-neura-600 to-neura-800 border-neura-700 text-white shadow-xl shadow-neura-200/80'
                  : 'bg-white border-neura-100 text-gray-900'
              }`}
            >
              <div className="min-h-[150px]">
                <h2 className="font-semibold text-lg mb-3">{plan.name}</h2>
                <p className={`font-display text-4xl leading-tight mb-3 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>{plan.price}</p>
                <p className={`text-sm leading-relaxed ${plan.featured ? 'text-neura-100' : 'text-gray-500'}`}>{plan.text}</p>
              </div>
              <div className="space-y-3 mt-8">
                {plan.items.map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <HiCheckCircle size={17} className={plan.featured ? 'text-neura-200' : 'text-neura-500'} />
                    <span className={plan.featured ? 'text-neura-50' : 'text-gray-600'}>{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate(plan.featured ? '/entrar' : '/onboarding')}
                className={`w-full mt-8 px-5 py-3 rounded-2xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                  plan.featured
                    ? 'bg-white text-neura-700 hover:bg-neura-50'
                    : 'bg-neura-50 text-neura-700 hover:bg-neura-100 border border-neura-100'
                }`}
              >
                Escolher <HiArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
