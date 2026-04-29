import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiSparkles, HiPaperAirplane, HiXMark, HiCpuChip, HiArrowLeft } from 'react-icons/hi2';

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Olá. Estou aqui para te ouvir. Como te sentes hoje?' },
  ]);
  const [input, setInput] = useState('');
  const msgsRef = useRef(null);

  const REPLIES = [
    'Obrigado por partilhares. Queres falar mais sobre isso?',
    'Entendo. Estou aqui contigo.',
    'Os teus sentimentos são válidos. Conta-me mais.',
    'Como posso ajudar-te hoje?',
    'Às vezes é importante ter um espaço seguro para falar.',
  ];

  const send = () => {
    const val = input.trim();
    if (!val) return;
    const aiText = REPLIES[Math.floor(Math.random() * REPLIES.length)];
    setMessages(prev => [
      ...prev,
      { from: 'user', text: val },
      { from: 'ai', text: aiText },
    ]);
    setInput('');
  };

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="h-screen w-screen bg-neura-50 flex flex-col overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', Georgia, serif; }
        .chat-msgs::-webkit-scrollbar { width: 6px; }
        .chat-msgs::-webkit-scrollbar-thumb { background: #d9cec1; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-r from-neura-600 to-neura-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="hover:opacity-75 transition-opacity">
            <HiArrowLeft className="text-white" size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <HiCpuChip size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Neura IA</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-neura-200 animate-pulse" />
                <p className="text-xs text-neura-100">Sempre disponível</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={msgsRef}
        className="chat-msgs flex-1 overflow-y-auto p-6 flex flex-col gap-4"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-md px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                m.from === 'user'
                  ? 'bg-neura-600 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Escreve como te sentes..."
          className="flex-1 px-4 py-3 bg-neura-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-neura-300 focus:ring-2 focus:ring-neura-200 transition-all"
        />
        <button
          onClick={send}
          className="w-10 h-10 bg-neura-600 hover:bg-neura-700 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          <HiPaperAirplane size={16} />
        </button>
      </div>
    </div>
  );
}
