import { useEffect, useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Bell, Camera, Crown, Globe2, LogOut, Moon, ShieldAlert, Sparkles, Sun, Trash2, UserRound } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { PrimaryButton, SecondaryButton, SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';
import { useAuth } from '../context/AuthContext';
import profileService from '../services/profileService';
import { getChatUserId } from '../utils/chatSession';
import { cn } from '../utils/cn';
import { toast } from '../utils/toast';

const profileSchema = z
  .object({
    name: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
    email: z.string().trim().email('Indica um email válido.'),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    language: z.enum(['pt', 'en', 'es']),
    notifications: z.boolean(),
    theme: z.enum(['light', 'dark']),
  })
  .superRefine((values, ctx) => {
    const newPassword = values.newPassword ?? '';
    const confirmPassword = values.confirmPassword ?? '';

    if (!newPassword && !confirmPassword) {
      return;
    }

    if (newPassword.length < 6) {
      ctx.addIssue({
        code: 'custom',
        path: ['newPassword'],
        message: 'A nova password deve ter pelo menos 6 caracteres.',
      });
    }

    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'A confirmação deve coincidir com a nova password.',
      });
    }
  });

function getProfilePayload(payload) {
  return payload?.profile ?? payload?.user ?? payload?.data ?? payload ?? {};
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function getDefaultValues(user) {
  return {
    name: user?.name ?? user?.nome ?? '',
    email: user?.email ?? '',
    newPassword: '',
    confirmPassword: '',
    language: user?.preferences?.language ?? user?.language ?? 'pt',
    notifications: user?.preferences?.notifications ?? user?.notifications ?? true,
    theme: user?.preferences?.theme ?? user?.theme ?? 'light',
  };
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, logout } = useAuth();
  const userId = useMemo(() => getChatUserId(user, 'profile'), [user]);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? user?.avatar ?? '');
  const [plan, setPlan] = useState(user?.plan ?? 'free');
  const [loading, setLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: getDefaultValues(user),
  });

  const watchedValues = useWatch({ control });
  const name = watchedValues.name;
  const email = watchedValues.email;
  const theme = watchedValues.theme;
  const notifications = watchedValues.notifications;
  const language = watchedValues.language;
  const initials = getInitials(name || user?.email || 'N');

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(async () => {
      setLoading(true);

      try {
        const response = await profileService.getProfile(userId);
        const profile = getProfilePayload(response);

        if (cancelled) {
          return;
        }

        reset({
          name: profile.name ?? profile.nome ?? user?.name ?? user?.nome ?? '',
          email: profile.email ?? user?.email ?? '',
          newPassword: '',
          confirmPassword: '',
          language: profile.preferences?.language ?? profile.language ?? 'pt',
          notifications: profile.preferences?.notifications ?? profile.notifications ?? true,
          theme: profile.preferences?.theme ?? profile.theme ?? 'light',
        });
        setAvatarUrl(profile.avatarUrl ?? profile.avatar ?? '');
        setPlan(profile.plan ?? profile.activePlan ?? 'free');
      } catch {
        if (!cancelled) {
          reset(getDefaultValues(user));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [reset, user, userId]);

  const handleSave = async (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      preferences: {
        language: values.language,
        notifications: values.notifications,
        theme: values.theme,
      },
    };

    if (values.newPassword) {
      payload.password = values.newPassword;
    }

    await profileService.updateProfile(userId, payload);
    reset({ ...values, newPassword: '', confirmPassword: '' });
    toast.success('Perfil atualizado');
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarUploading(true);

    try {
      const response = await profileService.uploadAvatar(userId, file);
      const avatar = response?.avatarUrl ?? response?.url ?? response?.data?.avatarUrl;
      setAvatarUrl(avatar ?? URL.createObjectURL(file));
      toast.success('Foto de perfil atualizada.');
    } finally {
      setAvatarUploading(false);
      event.target.value = '';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);

    try {
      await profileService.deleteAccount(userId);
      toast.success('Conta eliminada.');
      logout();
      navigate('/', { replace: true });
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  return (
    <MarketingShell>
      <section className="bg-neura-hero px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <SectionBadge icon={UserRound} tone="blue">
              Perfil
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-extrabold tracking-normal text-neura-text sm:text-5xl">Gerir conta e preferências.</h1>
            <p className="mt-4 text-lg leading-8 text-neura-muted">
              Mantém os teus dados atualizados e ajusta a experiência da Neura ao teu ritmo.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-3xl border border-neura-line bg-white/85 p-6 shadow-neura backdrop-blur">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-neura-primary to-neura-secondary text-3xl font-extrabold text-white shadow-neura-premium">
                    {avatarUrl ? <img src={avatarUrl} alt="Foto de perfil" className="h-full w-full object-cover" /> : initials}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={avatarUploading}
                    className="absolute -bottom-3 -right-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white bg-neura-text text-white shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-60"
                    aria-label="Enviar foto de perfil"
                  >
                    <Camera size={18} />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </div>

                <h2 className="mt-7 text-2xl font-extrabold text-neura-text">{name || 'Utilizador Neura'}</h2>
                <p className="mt-1 text-sm font-medium text-neura-muted">{email || 'Email por definir'}</p>

                <div className="mt-6 w-full rounded-3xl border border-neura-line bg-neura-bg p-5 text-left">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neura-accent/15 text-violet-500">
                      <Crown size={21} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neura-muted">Plano ativo</p>
                      <p className="text-lg font-extrabold capitalize text-neura-text">{plan}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid w-full gap-3">
                  <SecondaryButton type="button" onClick={handleLogout} className="w-full rounded-xl px-5 py-3">
                    <LogOut size={17} />
                    Terminar sessão
                  </SecondaryButton>

                  <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
                    <Dialog.Trigger asChild>
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neura-error/20 bg-red-50 px-5 py-3 text-sm font-bold text-neura-error transition-all hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                        Eliminar conta
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 z-[80] bg-slate-950/40 backdrop-blur-sm" />
                      <Dialog.Content className="fixed left-1/2 top-1/2 z-[90] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-neura-line bg-white p-6 shadow-2xl">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-neura-error">
                          <ShieldAlert size={23} />
                        </div>
                        <Dialog.Title className="mt-5 text-2xl font-extrabold text-neura-text">Eliminar conta?</Dialog.Title>
                        <Dialog.Description className="mt-3 text-sm leading-6 text-neura-muted">
                          Esta ação remove a tua conta e não deve ser feita sem certeza. Confirma apenas se queres avançar.
                        </Dialog.Description>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          <SecondaryButton type="button" onClick={() => setDeleteOpen(false)} className="rounded-xl px-5 py-3">
                            Cancelar
                          </SecondaryButton>
                          <button
                            type="button"
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-neura-error px-5 py-3 text-sm font-bold text-white transition-all hover:bg-red-600 disabled:pointer-events-none disabled:opacity-60"
                          >
                            {deleting ? 'A eliminar...' : 'Eliminar'}
                          </button>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </div>
            </aside>

            <form onSubmit={handleSubmit(handleSave)} className="rounded-3xl border border-neura-line bg-neura-card p-6 shadow-neura sm:p-8" noValidate>
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <SectionBadge icon={Sparkles} tone="violet">
                    Dados da conta
                  </SectionBadge>
                  <h2 className="mt-4 text-2xl font-extrabold text-neura-text">Informação pessoal</h2>
                </div>
                {loading && <span className="rounded-full bg-neura-primary/10 px-3 py-1.5 text-xs font-bold text-teal-700">A carregar</span>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-bold text-neura-text">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-2xl border border-neura-line bg-neura-bg px-4 py-3.5 text-sm text-neura-text outline-none transition-all placeholder:text-neura-muted focus:border-neura-primary focus:bg-white focus:shadow-sm"
                    {...register('name')}
                  />
                  {errors.name && <p className="mt-2 text-sm font-medium text-neura-error">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-neura-text">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-2xl border border-neura-line bg-neura-bg px-4 py-3.5 text-sm text-neura-text outline-none transition-all placeholder:text-neura-muted focus:border-neura-primary focus:bg-white focus:shadow-sm"
                    {...register('email')}
                  />
                  {errors.email && <p className="mt-2 text-sm font-medium text-neura-error">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="newPassword" className="mb-2 block text-sm font-bold text-neura-text">
                    Password nova
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Opcional"
                    className="w-full rounded-2xl border border-neura-line bg-neura-bg px-4 py-3.5 text-sm text-neura-text outline-none transition-all placeholder:text-neura-muted focus:border-neura-primary focus:bg-white focus:shadow-sm"
                    {...register('newPassword')}
                  />
                  {errors.newPassword && <p className="mt-2 text-sm font-medium text-neura-error">{errors.newPassword.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-bold text-neura-text">
                    Confirmar password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repete a password nova"
                    className="w-full rounded-2xl border border-neura-line bg-neura-bg px-4 py-3.5 text-sm text-neura-text outline-none transition-all placeholder:text-neura-muted focus:border-neura-primary focus:bg-white focus:shadow-sm"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && <p className="mt-2 text-sm font-medium text-neura-error">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <div className="mt-9">
                <h3 className="text-lg font-extrabold text-neura-text">Preferências</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <label className="rounded-3xl border border-neura-line bg-neura-bg p-5">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-neura-primary/10 text-neura-primary">
                      <Globe2 size={21} />
                    </span>
                    <span className="block text-sm font-bold text-neura-text">Idioma</span>
                    <select
                      className="mt-3 w-full rounded-2xl border border-neura-line bg-white px-3 py-3 text-sm font-semibold text-neura-text outline-none focus:border-neura-primary"
                      {...register('language')}
                    >
                      <option value="pt">Português</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                    <span className="mt-2 block text-xs font-medium text-neura-muted">{language === 'pt' ? 'Interface em português' : 'Idioma personalizado'}</span>
                  </label>

                  <label className="rounded-3xl border border-neura-line bg-neura-bg p-5">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-neura-secondary/10 text-neura-secondary">
                      <Bell size={21} />
                    </span>
                    <span className="block text-sm font-bold text-neura-text">Notificações</span>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-neura-muted">{notifications ? 'Ativas' : 'Desativadas'}</span>
                      <input type="checkbox" className="h-5 w-5 rounded border-neura-line text-neura-primary focus:ring-teal-100" {...register('notifications')} />
                    </div>
                  </label>

                  <div className="rounded-3xl border border-neura-line bg-neura-bg p-5">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-neura-accent/15 text-violet-500">
                      {theme === 'dark' ? <Moon size={21} /> : <Sun size={21} />}
                    </span>
                    <span className="block text-sm font-bold text-neura-text">Tema</span>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {[
                        { label: 'Claro', value: 'light' },
                        { label: 'Escuro', value: 'dark' },
                      ].map((item) => (
                        <label
                          key={item.value}
                          className={cn(
                            'cursor-pointer rounded-2xl border px-3 py-3 text-center text-sm font-bold transition-all',
                            theme === item.value ? 'border-transparent text-white shadow-lg shadow-teal-400/20' : 'border-neura-line bg-white text-neura-muted hover:text-neura-text',
                          )}
                          style={theme === item.value ? { background: 'linear-gradient(135deg, #2DD4BF, #60A5FA)' } : undefined}
                        >
                          <input type="radio" value={item.value} className="sr-only" {...register('theme')} />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <SecondaryButton type="button" onClick={() => reset(getDefaultValues(user))} className="rounded-xl px-5 py-3">
                  Repor
                </SecondaryButton>
                <PrimaryButton type="submit" disabled={isSubmitting} showArrow={false} className="rounded-xl px-6 py-3">
                  {isSubmitting ? 'A guardar...' : 'Guardar alterações'}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
