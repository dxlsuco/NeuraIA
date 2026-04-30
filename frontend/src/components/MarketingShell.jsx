import { useNavigate, NavLink } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi2';

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Recursos', to: '/recursos' },
  { label: 'Psicólogos', to: '/psicologos' },
  { label: 'Como funciona', to: '/como-funciona' },
  { label: 'Preços', to: '/precos' },
];

export default function MarketingShell({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neura-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', Georgia, serif; }
      `}</style>

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neura-100/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-neura-500 to-neura-700 rounded-xl flex items-center justify-center shadow-sm">
              <HiSparkles className="text-white" size={14} />
            </div>
            <span className="font-display font-semibold text-xl text-neura-900 tracking-tight">Neura</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive ? 'text-neura-700 font-semibold' : 'text-gray-500 hover:text-neura-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/onboarding')} className="text-sm text-gray-600 hover:text-neura-700 transition-colors px-4 py-2 rounded-xl hover:bg-neura-50">
              Começar grátis
            </button>
            <button onClick={() => navigate('/entrar')} className="text-sm font-medium bg-neura-600 hover:bg-neura-700 text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm">
              Entrar
            </button>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-neura-900 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-neura-600 rounded-lg flex items-center justify-center">
              <HiSparkles className="text-white" size={12} />
            </div>
            <span className="font-display text-white font-semibold">Neura</span>
          </button>
          <p className="text-xs text-neura-500">© 2026 Neura. Todos os direitos reservados.</p>
          <div className="flex gap-5 text-xs text-neura-500">
            {['Privacidade', 'Termos', 'Contacto'].map(label => (
              <a key={label} href="#" className="hover:text-neura-300 transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
