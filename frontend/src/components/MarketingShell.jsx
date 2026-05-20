import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandLogo, PrimaryButton, SecondaryButton } from './Brand';
import { cn } from '../utils/cn';

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Recursos', to: '/recursos' },
  { label: 'Psicólogos', to: '/psicologos' },
  { label: 'Como funciona', to: '/como-funciona' },
  { label: 'Preços', to: '/precos' },
];

export default function MarketingShell({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeAndGo = (to) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] text-slate-950">
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 shadow-[0_4px_20px_rgba(37,99,235,0.04)] backdrop-blur-xl">
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
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-700 shadow-sm transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 md:hidden"
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
              className="border-t border-slate-100 bg-white px-4 py-4 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => closeAndGo(item.to)}
                    className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
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

      <footer className="border-t border-slate-100 bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <BrandLogo onClick={() => navigate('/')} light markClassName="shadow-none" />
          <p className="text-sm text-slate-400">© 2026 Neura. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-5 text-sm text-slate-400">
            {['Privacidade', 'Termos', 'Contacto'].map((label) => (
              <a key={label} href="#" className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
