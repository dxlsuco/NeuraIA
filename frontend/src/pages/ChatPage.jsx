import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bot, Brain, CalendarCheck, Menu, MessageCircle, PanelLeftClose, PanelLeftOpen, Send, ShieldCheck, X } from 'lucide-react';

import { BrandLogo } from '../components/Brand';
import { BRAND } from '../components/brandTokens';
import { useAuth } from '../context/AuthContext';
import useChatSession from '../hooks/useChatSession';
import useEmotionalMemory from '../hooks/useEmotionalMemory';
import { getStoredCheckInContext, saveCheckInContext } from '../utils/chatSession';
import { cn } from '../utils/cn';

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
            ? 'rounded-tr-sm bg-gradient-to-br from-neura-primary to-neura-secondary text-white'
            : 'rounded-tl-sm border border-neura-line bg-neura-card text-neura-muted',
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
      <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-neura-line bg-neura-card px-4 py-3 text-sm font-medium text-neura-muted shadow-sm">
        <span>A escrever</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-neura-primary"
              style={{ animationDelay: `${dot * 130}ms` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const storedContext = useMemo(() => getStoredCheckInContext(), []);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const msgsRef = useRef(null);
  const {
    summary: emotionalMemorySummary,
    summaryText,
    loading: memoryLoading,
    recordConversationSignal,
  } = useEmotionalMemory({ user, storageScope: 'chat' });

  const mood = location.state?.moodLabel ?? storedContext.moodLabel ?? location.state?.mood ?? storedContext.mood ?? '';
  const topic = location.state?.topic ?? storedContext.topic ?? '';
  const chatContext = useMemo(
    () => ({
      mood: mood || 'sem check-in registado',
      topic: topic || 'uma conversa livre sobre bem-estar emocional',
      emotionalMemorySummary: summaryText,
    }),
    [mood, summaryText, topic],
  );

  const { messages, isTyping, historyLoading, sendMessage } = useChatSession({
    user,
    context: chatContext,
    storageScope: 'chat',
    loadHistory: true,
  });

  const send = async (value = input) => {
    const sent = await sendMessage(value);

    if (sent) {
      recordConversationSignal({
        mood,
        topic,
        createdAt: new Date().toISOString(),
      });
      setInput('');
    }
  };

  useEffect(() => {
    if (location.state?.mood || location.state?.topic) {
      saveCheckInContext({
        mood: location.state.mood,
        moodLabel: location.state.moodLabel ?? location.state.mood,
        topic: location.state.topic,
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, isTyping, historyLoading]);

  return (
    <div className="flex h-screen overflow-hidden bg-neura-bg text-neura-text">
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 288, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="hidden shrink-0 overflow-hidden border-r border-neura-line bg-neura-card shadow-neura-sidebar lg:block"
          >
            <div className="flex h-full w-72 flex-col p-5">
              <div className="flex items-center justify-between">
                <BrandLogo onClick={() => navigate('/')} />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-neura-muted transition-colors hover:bg-neura-bg hover:text-neura-text"
                  aria-label="Fechar sidebar"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>

              <div className="mt-7 rounded-3xl p-5 text-white" style={{ background: BRAND.gradient }}>
                <Bot size={24} className="mb-6 text-white/85" />
                <h2 className="text-lg font-extrabold">Sessão com Neura IA</h2>
                <p className="mt-2 text-sm leading-6 text-white/85">Conversa acolhedora com contexto do teu check-in.</p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { icon: CalendarCheck, label: 'Tema', value: topic || 'Livre' },
                  { icon: ShieldCheck, label: 'Privacidade', value: 'Protegida' },
                  { icon: MessageCircle, label: 'Estado', value: mood ? 'Check-in recebido' : 'Sem check-in' },
                  {
                    icon: Brain,
                    label: 'Memória',
                    value: memoryLoading
                      ? 'A atualizar'
                      : emotionalMemorySummary.lastCheckIn
                        ? `${emotionalMemorySummary.lastCheckIn.moodLabel} · ${emotionalMemorySummary.lastCheckIn.topic}`
                        : 'Sem memória ainda',
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-neura-line bg-neura-bg p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neura-primary/10 text-neura-primary">
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-neura-muted">{label}</p>
                        <p className="text-sm font-bold text-neura-text">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/check-in')}
                className="mt-auto rounded-xl border border-neura-line bg-neura-card px-4 py-3 text-sm font-bold text-neura-text transition-all hover:border-neura-secondary hover:bg-neura-secondary/10 hover:text-neura-secondary"
              >
                Novo check-in
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="z-20 flex h-[72px] items-center justify-between border-b border-neura-line bg-neura-card/90 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neura-line bg-neura-card text-neura-muted shadow-sm transition-colors hover:border-neura-primary/40 hover:bg-neura-primary/10 hover:text-teal-700"
              aria-label="Voltar"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              onClick={() => setSidebarOpen((open) => !open)}
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-neura-line bg-neura-card text-neura-muted shadow-sm transition-colors hover:border-neura-secondary/30 hover:bg-neura-secondary/10 hover:text-neura-secondary lg:flex"
              aria-label="Alternar sidebar"
            >
              {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>
            <button
              onClick={() => setSidebarOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neura-line bg-neura-card text-neura-muted shadow-sm transition-colors hover:border-neura-secondary/30 hover:bg-neura-secondary/10 hover:text-neura-secondary lg:hidden"
              aria-label="Menu"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg shadow-teal-400/20" style={{ background: BRAND.gradient }}>
                <Bot size={19} />
              </span>
              <div>
                <p className="text-sm font-extrabold text-neura-text">Neura IA</p>
                <p className="flex items-center gap-1.5 text-sm font-medium text-neura-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-neura-success" />
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
              className="border-b border-neura-line bg-neura-card p-4 lg:hidden"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Tema', value: topic || 'Livre' },
                  { label: 'Estado', value: mood ? 'Check-in recebido' : 'Sem check-in' },
                  {
                    label: 'Memória',
                    value: memoryLoading
                      ? 'A atualizar'
                      : emotionalMemorySummary.lastCheckIn
                        ? emotionalMemorySummary.trend
                        : 'Sem memória ainda',
                  },
                  { label: 'Privacidade', value: 'Protegida' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-neura-line bg-neura-bg p-3">
                    <p className="text-sm font-semibold text-neura-muted">{item.label}</p>
                    <p className="text-sm font-bold text-neura-text">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={msgsRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-4">
            {historyLoading && (
              <div className="self-center rounded-full border border-neura-line bg-neura-card px-4 py-2 text-xs font-semibold text-neura-muted">
                A carregar histórico...
              </div>
            )}
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        </div>

        <footer className="border-t border-neura-line bg-neura-card px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => send(prompt)}
                  disabled={isTyping}
                  className="rounded-full border border-neura-line bg-neura-bg px-4 py-2 text-sm font-bold text-neura-muted transition-colors hover:border-neura-primary/40 hover:bg-neura-primary/10 hover:text-teal-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    send();
                  }
                }}
                disabled={isTyping}
                placeholder="Escreve como te sentes..."
                className="min-w-0 flex-1 rounded-2xl border border-neura-line bg-neura-bg px-4 py-3 text-sm text-neura-text outline-none transition-all placeholder:text-neura-muted focus:border-neura-primary focus:bg-white focus:shadow-sm disabled:opacity-60"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || isTyping}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-all hover:scale-105 disabled:pointer-events-none disabled:bg-slate-300 disabled:shadow-none"
                style={input.trim() && !isTyping ? { background: BRAND.gradient } : undefined}
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
