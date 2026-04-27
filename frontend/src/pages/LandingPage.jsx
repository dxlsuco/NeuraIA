import { useState, useRef, useEffect } from 'react';
import {
  HiSparkles,
  HiArrowRight,
  HiChatBubbleLeftRight,
  HiClock,
  HiLockClosed,
  HiShieldCheck,
  HiXMark,
  HiPaperAirplane,
  HiCpuChip,
  HiVideoCamera,
  HiHeart,
  HiCheckCircle,
  HiStar,
  HiUserGroup,
} from 'react-icons/hi2';
import { FaUserDoctor } from 'react-icons/fa6';

const REPLIES = [
  'Obrigado por partilhares. Queres falar mais sobre isso?',
  'Entendo. Estou aqui contigo.',
  'Os teus sentimentos são válidos. Conta-me mais.',
  'Como posso ajudar-te hoje?',
  'Às vezes é importante ter um espaço seguro para falar.',
];

const features = [
  {
    icon: HiChatBubbleLeftRight,
    title: 'IA Empática 24/7',
    desc: 'Conversa imediata quando precisares de apoio emocional, a qualquer hora do dia ou da noite.',
    iconClass: 'bg-purple-50 text-purple-600',
    borderClass: 'border-purple-100',
  },
  {
    icon: FaUserDoctor,
    title: 'Psicólogos Certificados',
    desc: 'Profissionais reais disponíveis para sessões de acompanhamento personalizadas.',
    iconClass: 'bg-soft-blue text-blue-600',
    borderClass: 'border-blue-100',
  },
  {
    icon: HiShieldCheck,
    title: 'Privacidade Total',
    desc: 'As tuas conversas são encriptadas de ponta a ponta. Nada é partilhado.',
    iconClass: 'bg-soft-purple text-purple-600',
    borderClass: 'border-purple-100',
  },
  {
    icon: HiHeart,
    title: 'Sem Julgamentos',
    desc: 'Um espaço livre e seguro para seres tu mesmo, sem pressões nem expectativas.',
    iconClass: 'bg-soft-pink text-pink-600',
    borderClass: 'border-pink-100',
  },
];

const testimonials = [
  {
    name: 'Ana Martins',
    role: 'Professora, 34 anos',
    text: 'A Neura mudou a forma como lido com o stress do dia a dia. Ter apoio disponível a qualquer hora faz toda a diferença.',
    stars: 5,
  },
  {
    name: 'Ricardo Silva',
    role: 'Estudante, 22 anos',
    text: 'Nunca pensei que falar com uma IA fosse tão natural. Sinto-me realmente ouvido.',
    stars: 5,
  },
  {
    name: 'Mariana Costa',
    role: 'Engenheira, 29 anos',
    text: 'A transição para o psicólogo real foi muito fácil. A equipa é incrível.',
    stars: 5,
  },
];

export default function LandingPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [replyIdx, setReplyIdx] = useState(0);
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Olá. Estou aqui para te ouvir. Como te sentes hoje?' },
  ]);
  const msgsRef = useRef(null);

  const send = () => {
    const val = input.trim();
    if (!val) return;
    const aiText = REPLIES[replyIdx % REPLIES.length];
    setMessages(prev => [
      ...prev,
      { from: 'user', text: val },
      { from: 'ai', text: aiText },
    ]);
    setReplyIdx(i => i + 1);
    setInput('');
  };

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="min-h-screen bg-warm-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', Georgia, serif; }
        .chat-msgs::-webkit-scrollbar { width: 3px; }
        .chat-msgs::-webkit-scrollbar-thumb { background: #bbf7d0; border-radius: 4px; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-sm">
              <HiSparkles className="text-white" size={14} />
            </div>
            <span className="font-display font-semibold text-xl text-purple-900 tracking-tight">Neura</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Recursos', 'Psicólogos', 'Como funciona', 'Preços'].map(l => (
              <a key={l} href="#" className="text-sm text-gray-500 hover:text-purple-700 transition-colors">{l}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-purple-700 transition-colors px-4 py-2 rounded-xl hover:bg-purple-50">
              Entrar
            </button>
            <button className="text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm">
              Começar grátis
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-xs font-medium">
              <HiSparkles size={11} />
              Apoio emocional inteligente e humano
            </div>

            <h1 className="font-display text-5xl lg:text-[3.5rem] leading-[1.1] text-gray-900 tracking-tight">
              Não estás<br />
              <span className="text-purple-600 italic">sozinho.</span>
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              Um espaço seguro para falares, desabafares e encontrares apoio
              — com IA empática ou psicólogos certificados, sempre disponíveis.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-medium text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-purple-200/60">
                Começar agora <HiArrowRight size={14} />
              </button>
              <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-200 hover:border-purple-300 text-gray-700 rounded-2xl font-medium text-sm transition-all hover:-translate-y-0.5 shadow-sm">
                <HiVideoCamera size={14} className="text-purple-500" />
                Falar com psicólogo
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { icon: HiClock, label: 'Resposta em segundos' },
                { icon: HiLockClosed, label: '100% confidencial' },
                { icon: HiCheckCircle, label: 'Sem julgamentos' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-100 rounded-lg text-xs text-gray-400 shadow-sm">
                  <Icon size={12} className="text-purple-400" />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {['bg-neura-400', 'bg-blue-400', 'bg-pink-400', 'bg-amber-400'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`} />
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-gray-600">+12.000</span> pessoas já encontraram apoio
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 rounded-4xl -rotate-2 scale-105 opacity-70" />
            <div className="relative rounded-4xl overflow-hidden shadow-2xl shadow-purple-100/80">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=900&q=85"
                alt="Equipa de psicólogos"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neura-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <HiUserGroup size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Equipa clínica certificada</p>
                      <p className="text-xs text-gray-400">Disponível 7 dias por semana</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      <span className="text-xs text-purple-600 font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-white border-y border-gray-100/80 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-3">O que oferecemos</p>
            <h2 className="font-display text-4xl text-gray-900 tracking-tight">Tudo o que precisas,<br />num só lugar</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc, iconClass, borderClass }) => (
              <div key={title} className={`p-6 rounded-3xl border bg-white ${borderClass} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default`}>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${iconClass}`}>
                  <Icon size={19} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-3">Como funciona</p>
            <h2 className="font-display text-4xl text-gray-900 tracking-tight">Simples como deve ser</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Cria a tua conta', desc: 'Registo gratuito em menos de um minuto, sem cartão de crédito.', color: 'text-purple-400' },
              { step: '02', title: 'Fala como te sentes', desc: 'Começa com a nossa IA empática ou agenda diretamente com um psicólogo.', color: 'text-indigo-300' },
              { step: '03', title: 'Encontra o apoio certo', desc: 'Acompanhamento contínuo, ao teu ritmo, no teu horário.', color: 'text-violet-300' },
            ].map(({ step, title, desc, color }) => (
              <div key={step}>
                <div className={`font-display text-7xl font-semibold ${color} opacity-30 mb-3 leading-none select-none`}>{step}</div>
                <h3 className="font-semibold text-gray-800 mb-2 text-base">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-3">Testemunhos</p>
            <h2 className="font-display text-4xl text-gray-900 tracking-tight">O que dizem sobre nós</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, stars }) => (
              <div key={name} className="p-7 rounded-3xl border border-gray-100 bg-warm-50 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <HiStar key={i} size={13} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neura-100 flex items-center justify-center text-neura-700 font-semibold text-xs">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-neura-600 to-neura-800">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-display text-4xl text-white tracking-tight leading-tight">
            Começa hoje. O primeiro passo<br />
            <span className="italic text-neura-200">é sempre o mais difícil.</span>
          </h2>
          <p className="text-neura-300 text-sm">Grátis para começar. Sem compromissos.</p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neura-700 font-semibold rounded-2xl hover:bg-neura-50 transition-colors shadow-xl text-sm">
            Começar agora <HiArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-neura-900 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-neura-600 rounded-lg flex items-center justify-center">
              <HiSparkles className="text-white" size={12} />
            </div>
            <span className="font-display text-white font-semibold">Neura</span>
          </div>
          <p className="text-xs text-neura-500">© 2025 Neura. Todos os direitos reservados.</p>
          <div className="flex gap-5 text-xs text-neura-500">
            {['Privacidade', 'Termos', 'Contacto'].map(l => (
              <a key={l} href="#" className="hover:text-neura-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── FAB ── */}
      <button
        onClick={() => setChatOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-neura-600 hover:bg-neura-700 text-white rounded-2xl shadow-xl shadow-neura-300/40 flex items-center justify-center transition-all hover:scale-105"
      >
        {chatOpen ? <HiXMark size={22} /> : <HiChatBubbleLeftRight size={22} />}
      </button>

      {/* ── CHAT PANEL ── */}
      <div
        className={`
          fixed bottom-24 right-6 z-50 w-[340px] bg-white rounded-3xl shadow-2xl
          border border-gray-100 flex flex-col overflow-hidden
          transition-all duration-200 origin-bottom-right
          ${chatOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        style={{ maxHeight: 480 }}
      >
        {/* Chat header */}
        <div className="bg-gradient-to-r from-neura-600 to-neura-500 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <HiCpuChip size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Neura IA</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-neura-200 animate-pulse" />
                <p className="text-xs text-neura-100">Sempre disponível</p>
              </div>
            </div>
          </div>
          <button onClick={() => setChatOpen(false)} className="text-white/60 hover:text-white transition-colors">
            <HiXMark size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={msgsRef}
          className="chat-msgs flex-1 overflow-y-auto p-4 bg-warm-50 flex flex-col gap-3"
          style={{ minHeight: 200, maxHeight: 280 }}
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                m.from === 'user'
                  ? 'bg-neura-600 text-white rounded-br-sm'
                  : 'bg-white border border-gray-100 text-gray-600 rounded-bl-sm shadow-sm'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Escreve como te sentes..."
            className="flex-1 px-4 py-2.5 bg-warm-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:border-neura-300 transition-colors"
          />
          <button
            onClick={send}
            className="w-10 h-10 bg-neura-600 hover:bg-neura-700 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
          >
            <HiPaperAirplane size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}