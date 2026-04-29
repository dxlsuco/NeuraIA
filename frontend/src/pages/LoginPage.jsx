import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSparkles, HiArrowRight, HiLockClosed, HiEnvelopeOpen, HiEye, HiEyeSlash, HiCheckCircle } from 'react-icons/hi2';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        navigate('/dashboard');
      } else {
        setError('Por favor, preenche todos os campos.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-neura-50 to-neura-100 flex overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', Georgia, serif; }
      `}</style>

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-neura-600 to-neura-800 flex-col justify-between p-10 text-white relative overflow-hidden h-screen">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neura-500/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neura-700/20 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5 hover:opacity-75 transition-opacity relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <HiSparkles className="text-white" size={16} />
          </div>
          <span className="font-display font-bold text-2xl">Neura</span>
        </button>

        <div className="relative z-10 space-y-8">
          <h1 className="font-display text-5xl leading-tight font-bold">
            Bem-vindo ao teu espaço seguro
          </h1>
          
          <p className="text-neura-200 text-lg max-w-md leading-relaxed">
            Conversa com uma IA empática 24/7 ou com psicólogos certificados. Sem julgamentos. Sem compromissos.
          </p>

          <div className="space-y-4 pt-4">
            {[
              'Apoio emocional imediato',
              'Privacidade total e encriptada',
              'Profissionais certificados disponíveis'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <HiCheckCircle size={20} className="text-neura-200" />
                <span className="text-neura-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-neura-300 text-sm relative z-10">
          © 2025 Neura. Todos os direitos reservados.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 h-screen overflow-y-auto lg:overflow-y-hidden">
        <div className="w-full max-w-md flex-shrink-0">
          <div className="mb-6 lg:hidden">
            <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-neura-500 to-neura-700 rounded-xl flex items-center justify-center">
                <HiSparkles className="text-white" size={14} />
              </div>
              <span className="font-display font-semibold text-xl text-neura-900">Neura</span>
            </button>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">
              Entrar na conta
            </h2>
            <p className="text-sm text-gray-500">Acede ao teu espaço seguro</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <HiEnvelopeOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-neura-400" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="você@exemplo.com"
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:border-neura-400 focus:ring-2 focus:ring-neura-200 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-700">
                  Palavra-passe
                </label>
                <a href="#" className="text-xs font-semibold text-neura-600 hover:text-neura-700">
                  Esqueceu-se?
                </a>
              </div>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-neura-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:border-neura-400 focus:ring-2 focus:ring-neura-200 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded-lg border-2 border-gray-300 text-neura-600 cursor-pointer accent-neura-600"
              />
              <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer font-medium">
                Lembra-te de mim
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-neura-600 to-neura-700 hover:from-neura-700 hover:to-neura-800 disabled:from-neura-400 disabled:to-neura-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  A conectar...
                </>
              ) : (
                <>
                  Entrar <HiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OU</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-white border-2 border-gray-200 hover:border-neura-300 text-gray-700 font-semibold rounded-xl transition-all hover:bg-neura-50 flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1.040,12.545,1.040 c-6.302,0-11.405,5.103-11.405,11.405c0,6.302,5.103,11.405,11.405,11.405c10.745,0,11.564-8.942,10.846-13.471H12.545z"
              />
            </svg>
            Google
          </button>

          <p className="text-center text-xs text-gray-600 mt-5">
            Ainda não tens conta?{' '}
            <a href="#" className="font-semibold text-neura-600 hover:text-neura-700 transition-colors">
              Regista-te
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
