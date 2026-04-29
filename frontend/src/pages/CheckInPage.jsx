import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSparkles, HiArrowRight, HiXMark, HiQuestionMarkCircle, HiEllipsisHorizontal, HiCheckCircle, HiHeart } from 'react-icons/hi2';

export default function CheckInPage() {
  const navigate = useNavigate();
  const [mood, setMood] = useState(null);
  const [topic, setTopic] = useState(null);

  const moods = [
    { id: 'very-low', icon: HiXMark, iconColor: 'text-red-500', label: 'Muito em baixo', bgHover: 'hover:bg-red-50' },
    { id: 'confused', icon: HiQuestionMarkCircle, iconColor: 'text-orange-500', label: 'Confuso/a', bgHover: 'hover:bg-orange-50' },
    { id: 'neutral', icon: HiEllipsisHorizontal, iconColor: 'text-gray-500', label: 'Neutro/a', bgHover: 'hover:bg-gray-50' },
    { id: 'calm', icon: HiCheckCircle, iconColor: 'text-green-500', label: 'Em paz', bgHover: 'hover:bg-green-50' },
    { id: 'well', icon: HiHeart, iconColor: 'text-pink-500', label: 'Bem', bgHover: 'hover:bg-pink-50' },
  ];

  const topics = [
    'Ansiedade / Stress',
    'Relações pessoais',
    'Família',
    'Trabalho / Estudos',
    'Outro',
  ];

  const handleContinue = () => {
    if (mood && topic) {
      navigate('/chat', { state: { mood, topic } });
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-neura-50 to-neura-100 flex flex-col overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', Georgia, serif; }
      `}</style>

      <nav className="border-b border-neura-100/60 px-6 h-16 flex items-center">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2.5 hover:opacity-75 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-neura-500 to-neura-700 rounded-xl flex items-center justify-center">
            <HiSparkles className="text-white" size={14} />
          </div>
          <span className="font-display font-semibold text-xl text-neura-900">Neura</span>
        </button>
      </nav>

      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Como te sentes neste momento?
            </h2>

            <div className="grid grid-cols-5 gap-3">
              {moods.map(m => {
                const IconComponent = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={`p-4 rounded-2xl transition-all duration-200 flex flex-col items-center gap-2 border-2 ${
                      mood === m.id
                        ? `bg-neura-600 border-neura-700 text-white shadow-lg scale-105`
                        : `bg-white border-gray-200 text-gray-900 hover:border-neura-300 ${m.bgHover}`
                    }`}
                  >
                    <IconComponent size={28} className={mood === m.id ? 'text-white' : m.iconColor} />
                    <span className="text-xs font-medium text-center">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Sobre o que gostarias de falar?
            </h2>

            <div className="space-y-3">
              {topics.map(t => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`w-full p-4 text-left rounded-2xl transition-all duration-200 font-medium ${
                    topic === t
                      ? 'bg-neura-600 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-neura-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!mood || !topic}
            className="w-full px-6 py-4 bg-gradient-to-r from-neura-600 to-neura-700 hover:from-neura-700 hover:to-neura-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Começar <HiArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
