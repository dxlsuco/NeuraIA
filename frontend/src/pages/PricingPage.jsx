import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import MarketingShell from '../components/MarketingShell';
import { SectionBadge } from '../components/Brand';
import { BRAND } from '../components/brandTokens';
import { cn } from '../utils/cn';

const plans = [
  {
    name: 'Essencial',
    badge: 'Plano gratuito',
    price: 'Grátis',
    text: 'Para começar com check-ins e conversa imediata.',
    items: ['Chat com IA', 'Check-in emocional', 'Modo anônimo'],
    featured: false,
    action: '/onboarding',
  },
  {
    name: 'Acompanhamento',
    badge: 'Plano premium',
    price: 'Personalizado',
    text: 'Para quem quer continuidade e suporte profissional.',
    items: ['Tudo do Essencial', 'Agendamento com psicólogo', 'Histórico e insights'],
    featured: true,
    action: '/entrar',
  },
  {
    name: 'Instituições',
    badge: 'Sob consulta',
    price: 'Sob consulta',
    text: 'Para escolas, equipas e organizações de cuidado.',
    items: ['Gestão de grupos', 'Relatórios agregados', 'Configuração assistida'],
    featured: false,
    action: '/entrar',
  },
];

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <MarketingShell>
      <section className="bg-[linear-gradient(135deg,#F8FAFF_0%,#EEF2FF_50%,#F5F3FF_100%)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <SectionBadge icon={Sparkles} tone="violet" className="justify-center">
              Preços
            </SectionBadge>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-slate-950 lg:text-6xl">
              Começa sem custo e evolui quando fizer sentido.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              Planos pensados para diferentes níveis de apoio, desde conversa imediata até acompanhamento profissional.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={cn(
                  'rounded-3xl border p-7 shadow-neura transition-all hover:-translate-y-1',
                  plan.featured ? 'border-violet-200 text-white shadow-neura-premium' : 'border-slate-100 bg-white text-slate-950 hover:shadow-xl',
                )}
                style={plan.featured ? { background: BRAND.gradient } : undefined}
              >
                <div className="flex min-h-[185px] flex-col">
                  <span
                    className={cn(
                      'mb-5 inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold',
                      plan.featured ? 'bg-white/15 text-white' : plan.name === 'Essencial' ? 'bg-blue-50 text-blue-700' : 'bg-violet-50 text-violet-700',
                    )}
                  >
                    {plan.badge}
                  </span>
                  <h2 className="text-lg font-bold">{plan.name}</h2>
                  <p className="mt-3 text-4xl font-extrabold leading-tight">{plan.price}</p>
                  <p className={cn('mt-4 text-sm leading-6', plan.featured ? 'text-blue-100' : 'text-slate-500')}>{plan.text}</p>
                </div>
                <div className="mt-8 space-y-3">
                  {plan.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={17} className={plan.featured ? 'text-teal-200' : 'text-teal-600'} />
                      <span className={plan.featured ? 'text-white' : 'text-slate-600'}>{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate(plan.action)}
                  className={cn(
                    'mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:scale-[1.02]',
                    plan.featured
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700',
                  )}
                >
                  Escolher
                  <ArrowRight size={15} />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
