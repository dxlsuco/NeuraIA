import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { BrandLogo } from '../components/Brand';
import { BRAND } from '../components/brandTokens';
import { useAuth } from '../context/AuthContext';
import { toast } from '../utils/toast';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Indica o email.').email('Indica um email válido.'),
  password: z.string().min(6, 'A palavra-passe deve ter pelo menos 6 caracteres.'),
  remember: z.boolean().optional(),
});

function getRedirectPath(location) {
  const from = location.state?.from;

  if (!from?.pathname) {
    return '/dashboard';
  }

  return `${from.pathname}${from.search ?? ''}${from.hash ?? ''}`;
}

function getOriginalError(error) {
  return error?.cause?.cause ?? error?.cause ?? error;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const redirectPath = getRedirectPath(location);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const busy = loading || isSubmitting;

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, redirectPath]);

  const handleLogin = async (values) => {
    setAuthError('');

    try {
      await login(values.email, values.password);
      toast.success('Sessão iniciada com sucesso.');
      navigate(redirectPath, { replace: true });
    } catch (error) {
      const message = error?.message ?? 'Credenciais inválidas. Verifica o email e a palavra-passe.';
      const originalError = getOriginalError(error);
      const isNetworkError = Boolean(originalError?.request && !originalError?.response);
      const status = originalError?.response?.status;

      setAuthError(message);

      if (!isNetworkError && (!status || status < 500)) {
        toast.error(message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neura-hero text-neura-text">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden overflow-hidden border-r border-white/50 p-10 text-white lg:flex lg:flex-col lg:justify-between" style={{ background: BRAND.gradient }}>
          <BrandLogo onClick={() => navigate('/')} light markClassName="bg-white/15 shadow-none" />

          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/90">
              <ShieldCheck size={16} />
              Espaço protegido
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal">Bem-vindo ao teu espaço seguro.</h1>
            <p className="mt-5 text-lg leading-8 text-white/85">
              Conversa com uma IA empática 24/7 ou continua o teu acompanhamento com psicólogos certificados.
            </p>
            <div className="mt-8 space-y-4">
              {['Apoio emocional imediato', 'Privacidade total', 'Profissionais certificados'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-white/85" />
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
                <p className="text-xs text-white/85">Sempre disponível para recomeçar a conversa.</p>
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

            <div className="rounded-3xl border border-neura-line bg-neura-card p-6 shadow-neura sm:p-8">
              <div className="mb-7">
                <h2 className="text-3xl font-extrabold tracking-normal text-neura-text">Entrar na conta</h2>
                <p className="mt-2 text-[15px] leading-7 text-neura-muted">Acede ao teu espaço seguro e continua de onde paraste.</p>
              </div>

              <AnimatePresence>
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-4 rounded-2xl border border-neura-error/20 bg-red-50 px-4 py-3 text-sm font-medium text-neura-error"
                    role="alert"
                  >
                    {authError}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(handleLogin)} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-neura-text">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neura-muted" size={18} />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="voce@exemplo.com"
                      className="w-full rounded-2xl border border-neura-line bg-neura-bg py-3.5 pl-12 pr-4 text-sm text-neura-text outline-none transition-all placeholder:text-neura-muted focus:border-neura-primary focus:bg-white focus:shadow-sm"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm font-medium text-neura-error">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-bold text-neura-text">
                      Palavra-passe
                    </label>
                    <a href="#" className="text-sm font-bold text-neura-primary transition-colors hover:text-neura-secondary">
                      Esqueceu-se?
                    </a>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-neura-muted" size={18} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-neura-line bg-neura-bg py-3.5 pl-12 pr-12 text-sm text-neura-text outline-none transition-all placeholder:text-neura-muted focus:border-neura-primary focus:bg-white focus:shadow-sm"
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neura-muted transition-colors hover:text-neura-text"
                      aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="mt-2 text-sm font-medium text-neura-error">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neura-line text-neura-primary focus:ring-teal-100"
                    {...register('remember')}
                  />
                  <label htmlFor="remember" className="cursor-pointer text-sm font-medium text-neura-muted">
                    Lembrar-me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-teal-400/30 disabled:pointer-events-none disabled:opacity-60"
                  style={{ background: BRAND.gradient }}
                >
                  {busy ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      A conectar...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-neura-line" />
                <span className="rounded-full bg-neura-bg px-3 py-1 text-xs font-bold text-neura-muted">OU</span>
                <div className="h-px flex-1 bg-neura-line" />
              </div>

              <button
                type="button"
                onClick={() => navigate('/onboarding')}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-neura-line bg-neura-card px-6 py-3.5 text-sm font-bold text-neura-text transition-all hover:border-neura-secondary hover:bg-neura-secondary/10 hover:text-neura-secondary"
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
