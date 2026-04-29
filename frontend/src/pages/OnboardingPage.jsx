import { useNavigate } from 'react-router-dom';
import { HiSparkles, HiArrowRight, HiLockClosed, HiUser } from 'react-icons/hi2';

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-neura-50 to-neura-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', Georgia, serif; }
      `}</style>

      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2.5 hover:opacity-75 transition-opacity"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-neura-500 to-neura-700 rounded-xl flex items-center justify-center">
          <HiSparkles className="text-white" size={14} />
        </div>
        <span className="font-display font-semibold text-xl text-neura-900">Neura</span>
      </button>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="font-display text-4xl font-bold text-gray-900">
            Como gostarias de começar?
          </h1>
          <p className="text-gray-500">Escolhe o que funciona melhor para ti</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/check-in')}
            className="w-full p-6 bg-white border-2 border-neura-200 hover:border-neura-400 rounded-2xl text-left transition-all hover:shadow-lg hover:-translate-y-1 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-neura-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-neura-200 transition-colors">
                <HiLockClosed size={24} className="text-neura-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Modo Anónimo</h3>
                <p className="text-sm text-gray-500">Conversa sem criar conta. Privacidade total.</p>
              </div>
              <HiArrowRight size={20} className="text-neura-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => navigate('/entrar')}
            className="w-full p-6 bg-gradient-to-r from-neura-600 to-neura-700 hover:from-neura-700 hover:to-neura-800 rounded-2xl text-left transition-all hover:shadow-lg hover:-translate-y-1 group shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                <HiUser size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Criar Conta</h3>
                <p className="text-sm text-neura-100">Histórico, insights e acompanhamento personalizado.</p>
              </div>
              <HiArrowRight size={20} className="text-white/60 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          Podes mudar de modo a qualquer momento
        </p>
      </div>
    </div>
  );
}
