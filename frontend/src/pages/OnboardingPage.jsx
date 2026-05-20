import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, LockKeyhole, ShieldCheck, UserPlus } from 'lucide-react';
import { BrandLogo, SectionBadge } from '../components/Brand';
import { BRAND } from '../components/brandTokens';

const options = [
  {
    title: 'Modo anónimo',
    text: 'Conversa sem criar conta. Privacidade total para começar agora.',
    icon: LockKeyhole,
    to: '/check-in',
    featured: false,
  },
  {
    title: 'Criar conta',
    text: 'Guarda histórico, recebe insights e continua com acompanhamento personalizado.',
    icon: UserPlus,
    to: '/entrar',
    featured: true,
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#F8FAFF_52%,#F5F3FF_100%)] px-4 py-6 text-slate-950 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-7xl flex-col">
        <BrandLogo onClick={() => navigate('/')} />

        <main className="flex flex-1 items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl"
          >
            <div className="text-center">
              <SectionBadge tone="violet" icon={ShieldCheck} className="justify-center">
                Primeiro passo
              </SectionBadge>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl">
                Como gostarias de começar?
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-500">Escolhe o formato que deixa este momento mais confortável para ti.</p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {options.map(({ title, text, icon: Icon, to, featured }, index) => (
                <motion.button
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => navigate(to)}
                  className="group rounded-3xl border p-6 text-left shadow-neura transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={featured ? { background: BRAND.gradient, borderColor: 'transparent' } : undefined}
                >
                  <div className="flex items-start gap-4">
                    <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${featured ? 'bg-white/15 text-white' : 'bg-blue-50 text-blue-600'}`}>
                      <Icon size={24} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className={`text-lg font-bold ${featured ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
                      <p className={`mt-2 text-sm leading-6 ${featured ? 'text-blue-100' : 'text-slate-500'}`}>{text}</p>
                    </div>
                    <ArrowRight className={`mt-1 flex-shrink-0 transition-transform group-hover:translate-x-1 ${featured ? 'text-white/80' : 'text-blue-600'}`} size={20} />
                  </div>
                </motion.button>
              ))}
            </div>

            <p className="mt-8 text-center text-sm font-medium text-slate-400">Podes mudar de modo a qualquer momento.</p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
