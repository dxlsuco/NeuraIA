import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bot, CalendarCheck, Menu, MessageCircle, PanelLeftClose, PanelLeftOpen, Send, ShieldCheck, X } from 'lucide-react';
import { BrandLogo } from '../components/Brand';
import { BRAND } from '../components/brandTokens';
import { cn } from '../utils/cn';

const replies = [
  'Obrigado por partilhares. Queres falar mais sobre isso?',
  'Entendo. Estou aqui contigo. O que sentes agora é válido.',
  'Podemos dividir isso em partes pequenas. O que parece mais urgente?',
  'Vamos abrandar um pouco. Que pensamento está a repetir-se mais?',
  'Se quiseres, podemos transformar isso num plano para os próximos 10 minutos.',
];

const quickPrompts = ['Estou ansioso/a', 'Preciso de respirar', 'Quero organizar pensamentos'];

function MessageBubble({ message }) {
  const isUser = message.from === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm sm:max-w-xl',
          isUser
            ? 'rounded-tr-sm bg-gradient-to-br from-blue-600 to-violet-600 text-white'
            : 'rounded-tl-sm border border-slate-100 bg-white text-slate-600',
        )}
      >
        {message.text}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3 shadow-sm">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: `${dot * 130}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Olá. Estou aqui para te ouvir. Como te sentes hoje?' }]);
  const [input, setInput] = useState('');
  const [replyIdx, setReplyIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const msgsRef = useRef(null);
  const timeoutRef = useRef(null);

  const mood = location.state?.mood;
  const topic = location.state?.topic;

  const send = (value = input) => {
    const text = value.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setIsTyping(true);

    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'ai', text: replies[replyIdx % replies.length] }]);
      setReplyIdx((idx) => idx + 1);
      setIsTyping(false);
    }, 650);
  };

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFF] text-slate-950">
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 288, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="hidden shrink-0 overflow-hidden border-r border-slate-100 bg-white shadow-neura-sidebar lg:block"
          >
            <div className="flex h-full w-72 flex-col p-5">
              <div className="flex items-center justify-between">
                <BrandLogo onClick={() => navigate('/')} />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
                  aria-label="Fechar sidebar"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>

              <div className="mt-7 rounded-3xl p-5 text-white" style={{ background: BRAND.gradient }}>
                <Bot size={24} className="mb-6 text-blue-100" />
                <h2 className="text-lg font-extrabold">Sessão com Neura IA</h2>
                <p className="mt-2 text-sm leading-6 text-blue-100">Conversa acolhedora com contexto do teu check-in.</p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { icon: CalendarCheck, label: 'Tema', value: topic || 'Livre' },
                  { icon: ShieldCheck, label: 'Privacidade', value: 'Protegida' },
                  { icon: MessageCircle, label: 'Estado', value: mood ? 'Check-in recebido' : 'Sem check-in' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-slate-100 bg-[#F8FAFF] p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-slate-400">{label}</p>
                        <p className="text-sm font-bold text-slate-800">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/check-in')}
                className="mt-auto rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
              >
                Novo check-in
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="z-20 flex h-[72px] items-center justify-between border-b border-slate-100 bg-white/90 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              aria-label="Voltar"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              onClick={() => setSidebarOpen((open) => !open)}
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 shadow-sm transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 lg:flex"
              aria-label="Alternar sidebar"
            >
              {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>
            <button
              onClick={() => setSidebarOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 shadow-sm transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 lg:hidden"
              aria-label="Menu"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg shadow-blue-500/20" style={{ background: BRAND.gradient }}>
                <Bot size={19} />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-950">Neura IA</p>
                <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Sempre disponível
                </p>
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="border-b border-slate-100 bg-white p-4 lg:hidden"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Tema', value: topic || 'Livre' },
                  { label: 'Estado', value: mood ? 'Check-in recebido' : 'Sem check-in' },
                  { label: 'Privacidade', value: 'Protegida' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-100 bg-[#F8FAFF] p-3">
                    <p className="text-xs font-semibold text-slate-400">{item.label}</p>
                    <p className="text-sm font-bold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={msgsRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        </div>

        <footer className="border-t border-slate-100 bg-white px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => send(prompt)}
                  disabled={isTyping}
                  className="rounded-full border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && send()}
                placeholder="Escreve como te sentes..."
                className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:shadow-sm"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || isTyping}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-all hover:scale-105 disabled:pointer-events-none disabled:bg-slate-300 disabled:shadow-none"
                style={input.trim() && !isTyping ? { background: BRAND.tealGradient } : undefined}
                aria-label="Enviar mensagem"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
