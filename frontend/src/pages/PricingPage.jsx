import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

import { SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';
import { BRAND } from '../components/brandTokens';
import useFetch from '../hooks/useFetch';
import { cn } from '../utils/cn';

function normalizePlan(plan) {
  const name = plan.name ?? plan.title ?? plan.nome ?? 'Plano';
  const items = plan.items ?? plan.features ?? plan.benefits ?? [];
  const price = plan.priceLabel ?? plan.price ?? plan.preco ?? plan.amount;

  return {
    id: plan.id ?? plan._id ?? plan.slug ?? name,
    name,
    badge: plan.badge ?? plan.label ?? plan.tag ?? 'Plano Neura',
    price: price || price === 0 ? String(price) : 'Preço a definir',
    text: plan.text ?? plan.description ?? plan.summary ?? 'Detalhes do plano em atualização.',
    items: Array.isArray(items) ? items : [],
    featured: Boolean(plan.featured ?? plan.highlighted ?? plan.recommended),
    action: plan.action ?? plan.ctaUrl ?? plan.href ?? '/entrar',
    actionLabel: plan.actionLabel ?? plan.ctaLabel ?? 'Escolher',
  };
}

export default function PricingPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch('/api/plans');
  const plans = Array.isArray(data) ? data.map(normalizePlan) : [];

  return (
    <MarketingShell>
      <section className="bg-neura-hero py-20">
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
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-neura-text lg:text-6xl">
              Começa sem custo e evolui quando fizer sentido.
            </h1>
            <p className="mt-5 text-lg leading-8 text-neura-muted">
              Planos pensados para diferentes níveis de apoio, desde conversa imediata até acompanhamento profissional.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <article key={index} className="animate-pulse rounded-3xl border border-neura-line bg-neura-card p-7 shadow-neura">
                  <div className="h-7 w-28 rounded-full bg-neura-line" />
                  <div className="mt-6 h-5 w-36 rounded-full bg-neura-line" />
                  <div className="mt-4 h-10 w-28 rounded-full bg-neura-line" />
                  <div className="mt-6 space-y-2">
                    <div className="h-3 rounded-full bg-neura-line" />
                    <div className="h-3 w-5/6 rounded-full bg-neura-line" />
                  </div>
                </article>
              ))}

            {!loading && error && (
              <div className="rounded-3xl border border-neura-error/20 bg-red-50 p-6 text-sm font-medium text-neura-error lg:col-span-3" role="alert">
                {error}
              </div>
            )}

            {!loading && !error && plans.length === 0 && (
              <div className="rounded-3xl border border-neura-line bg-neura-card p-6 text-center text-sm leading-6 text-neura-muted shadow-neura lg:col-span-3">
                Ainda não há planos disponíveis para apresentar.
              </div>
            )}

            {!loading &&
              !error &&
              plans.map((plan, index) => (
                <motion.article
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={cn(
                    'rounded-3xl border p-7 shadow-neura transition-all hover:-translate-y-1',
                    plan.featured ? 'border-neura-secondary/30 text-white shadow-neura-premium' : 'border-neura-line bg-neura-card text-neura-text hover:shadow-xl',
                  )}
                  style={plan.featured ? { background: BRAND.gradient } : undefined}
                >
                  <div className="flex min-h-[185px] flex-col">
                    <span
                      className={cn(
                        'mb-5 inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold',
                        plan.featured ? 'bg-white/15 text-white' : 'bg-neura-primary/15 text-teal-700',
                      )}
                    >
                      {plan.badge}
                    </span>
                    <h2 className="text-lg font-bold">{plan.name}</h2>
                    <p className="mt-3 text-4xl font-extrabold leading-tight">{plan.price}</p>
                    <p className={cn('mt-4 text-sm leading-6', plan.featured ? 'text-white/85' : 'text-neura-muted')}>{plan.text}</p>
                  </div>
                  <div className="mt-8 space-y-3">
                    {plan.items.length > 0 ? (
                      plan.items.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 size={17} className={plan.featured ? 'text-white/85' : 'text-neura-success'} />
                          <span className={plan.featured ? 'text-white' : 'text-neura-muted'}>{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className={cn('text-sm leading-6', plan.featured ? 'text-white/80' : 'text-neura-muted')}>Benefícios em atualização.</p>
                    )}
                  </div>
                  <button
                    onClick={() => navigate(plan.action)}
                    className={cn(
                      'mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:scale-[1.02]',
                      plan.featured
                        ? 'bg-white text-teal-700 hover:bg-teal-50'
                        : 'border border-neura-line bg-neura-card text-neura-text hover:border-neura-secondary hover:bg-neura-secondary/10 hover:text-neura-secondary',
                    )}
                  >
                    {plan.actionLabel}
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
