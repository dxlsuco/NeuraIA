import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../components/Brand';
import { BRAND } from '../components/brandTokens';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        navigate('/check-in');
      } else {
        setError('Por favor, preenche todos os campos.');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#EEF2FF_0%,#F8FAFF_50%,#F5F3FF_100%)] text-slate-950">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden overflow-hidden border-r border-white/50 p-10 text-white lg:flex lg:flex-col lg:justify-between" style={{ background: BRAND.gradient }}>
          <BrandLogo onClick={() => navigate('/')} light markClassName="bg-white/15 shadow-none" />

          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-blue-50">
              <ShieldCheck size={16} />
              Espaço protegido
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal">Bem-vindo ao teu espaço seguro.</h1>
            <p className="mt-5 text-lg leading-8 text-blue-100">
              Conversa com uma IA empática 24/7 ou continua o teu acompanhamento com psicólogos certificados.
            </p>
            <div className="mt-8 space-y-4">
              {['Apoio emocional imediato', 'Privacidade total', 'Profissionais certificados'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-teal-200" />
                  <span className="text-sm font-semibold text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <Bot size={20} />
              </span>
              <div>
                <p className="text-sm font-bold">Neura IA</p>
                <p className="text-xs text-blue-100">Sempre disponível para recomeçar a conversa.</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <div className="mb-10 lg:hidden">
              <BrandLogo onClick={() => navigate('/')} />
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-neura sm:p-8">
              <div className="mb-7">
                <h2 className="text-3xl font-extrabold tracking-normal text-slate-950">Entrar na conta</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Acede ao teu espaço seguro e continua de onde paraste.</p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="voce@exemplo.com"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                      Palavra-passe
                    </label>
                    <a href="#" className="text-sm font-bold text-blue-600 transition-colors hover:text-violet-600">
                      Esqueceu-se?
                    </a>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
                      aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input id="remember" type="checkbox" className="h-4 w-4 rounded border-slate-200 text-blue-600 focus:ring-blue-200" />
                  <label htmlFor="remember" className="cursor-pointer text-sm font-medium text-slate-500">
                    Lembrar-me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-blue-500/30 disabled:pointer-events-none disabled:opacity-60"
                  style={{ background: BRAND.gradient }}
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      A conectar...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-400">OU</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <button
                type="button"
                onClick={() => navigate('/onboarding')}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
              >
                Criar conta gratuita
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
