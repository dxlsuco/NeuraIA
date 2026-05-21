import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandLogo, PrimaryButton, SecondaryButton } from './Brand';
import { cn } from '../utils/cn';

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Recursos', to: '/recursos' },
  { label: 'Psicólogos', to: '/psicologos' },
  { label: 'Como funciona', to: '/como-funciona' },
  { label: 'Preços', to: '/precos' },
];

const footerLinks = [
  { label: 'Privacidade', to: '/privacidade' },
  { label: 'Termos', to: '/termos' },
  { label: 'Contacto', to: '/contacto' },
];

export default function MarketingShell({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeAndGo = (to) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <div className="min-h-screen bg-neura-bg font-sans text-neura-text">
      <nav className="sticky top-0 z-50 border-b border-neura-line bg-white/80 shadow-[0_10px_34px_rgba(45,212,191,0.10)] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo onClick={() => closeAndGo('/')} />

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    isActive ? 'bg-neura-primary/15 text-teal-700' : 'text-neura-muted hover:bg-neura-bg hover:text-neura-text',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <SecondaryButton onClick={() => navigate('/onboarding')} className="px-5 py-2.5">
              Começar grátis
            </SecondaryButton>
            <PrimaryButton onClick={() => navigate('/entrar')} showArrow={false} className="px-5 py-2.5">
              Entrar
            </PrimaryButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neura-line bg-neura-card text-neura-text shadow-sm transition-colors hover:border-neura-secondary/30 hover:bg-neura-secondary/10 hover:text-neura-secondary md:hidden"
            aria-label="Abrir menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="border-t border-neura-line bg-neura-card px-4 py-4 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => closeAndGo(item.to)}
                    className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-neura-muted transition-colors hover:bg-neura-primary/10 hover:text-teal-700"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <SecondaryButton onClick={() => closeAndGo('/onboarding')} className="rounded-xl px-4 py-3">
                    Começar
                  </SecondaryButton>
                  <PrimaryButton onClick={() => closeAndGo('/entrar')} showArrow={false} className="rounded-xl px-4 py-3">
                    Entrar
                  </PrimaryButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>{children}</main>

      <footer className="border-t border-neura-line bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <BrandLogo onClick={() => navigate('/')} markClassName="shadow-none" />
          <p className="text-sm text-neura-muted">© 2026 Neura. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-5 text-sm text-neura-muted">
            {footerLinks.map((item) => (
              <NavLink key={item.to} to={item.to} className="transition-colors hover:text-teal-700">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
