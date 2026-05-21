import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  MessageCircle,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import MarketingShell from '../components/MarketingShell';
import { PrimaryButton, SecondaryButton, SectionBadge } from '../components/Brand';
import { BRAND } from '../components/brandTokens';
import { useAuth } from '../context/AuthContext';
import useChatSession from '../hooks/useChatSession';
import useEmotionalMemory from '../hooks/useEmotionalMemory';
import { cn } from '../utils/cn';

const features = [
  {
    icon: MessageCircle,
    title: 'IA empática 24/7',
    desc: 'Conversa imediata para nomear emoções, reduzir ruído mental e encontrar o próximo passo.',
    tone: 'bg-neura-primary/10 text-neura-primary',
  },
  {
    icon: Users,
    title: 'Psicólogos certificados',
    desc: 'Encaminhamento para profissionais reais quando o cuidado humano é o melhor caminho.',
    tone: 'bg-neura-secondary/10 text-neura-secondary',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade por desenho',
    desc: 'Fluxos discretos, dados sensíveis protegidos e uma experiência sem exposição desnecessária.',
    tone: 'bg-neura-accent/15 text-violet-500',
  },
  {
    icon: HeartHandshake,
    title: 'Apoio sem julgamento',
    desc: 'Um ambiente acolhedor para falar de ansiedade, stress, relações, rotina e autocuidado.',
    tone: 'bg-neura-accent2/20 text-orange-600',
  },
];

const stats = [
  { value: '24/7', label: 'apoio imediato' },
  { value: '+12k', label: 'check-ins guiados' },
  { value: '98%', label: 'sentem mais clareza' },
];

const steps = [
  { icon: CalendarCheck, title: 'Faz um check-in', text: 'Escolhe como estás e o tema que precisa de atenção.' },
  { icon: Bot, title: 'Conversa com a Neura', text: 'Recebe perguntas calmas e sugestões práticas para organizar o momento.' },
  { icon: Users, title: 'Avança com apoio humano', text: 'Quando necessário, agenda uma sessão com um psicólogo certificado.' },
];

const testimonials = [
  {
    name: 'Ana Martins',
    role: 'Professora',
    text: 'A Neura ajudou-me a perceber padrões de stress antes de chegar ao limite.',
  },
  {
    name: 'Ricardo Silva',
    role: 'Estudante',
    text: 'O chat é simples e acolhedor. Senti que podia começar sem explicar tudo de uma vez.',
  },
  {
    name: 'Mariana Costa',
    role: 'Engenheira',
    text: 'A ponte para falar com uma psicóloga tornou a decisão menos pesada.',
  },
];

const heroMessages = [
  { from: 'ai', text: 'Olá, sou a Neura. Como está o teu nível de ansiedade agora?' },
  { from: 'user', text: 'Está alto, sinto pressão no peito.' },
  { from: 'ai', text: 'Vamos começar por uma pausa curta. Inspira por 4 segundos e expira por 6.' },
];

function ChatBubble({ message }) {
  const isUser = message.from === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
          isUser
            ? 'rounded-tr-sm bg-gradient-to-br from-neura-primary to-neura-secondary text-white'
            : 'rounded-tl-sm border border-neura-line bg-neura-card text-neura-muted',
        )}
      >
        {message.text}
      </div>
    </div>
  );
}

function FloatingTypingIndicator() {
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

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="relative"
    >
      <div className="absolute -left-5 top-10 hidden rounded-3xl border border-neura-line bg-neura-card p-4 shadow-neura lg:block">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neura-accent/15 text-violet-500">
            <Clock3 size={19} />
          </span>
          <div>
            <p className="text-sm font-semibold text-neura-text">Check-in diário</p>
            <p className="text-sm text-neura-muted">2 min concluídos</p>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
        className="absolute -right-4 bottom-10 hidden rounded-3xl border border-neura-secondary/25 bg-neura-card p-4 shadow-neura-premium lg:block"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neura-secondary/10 text-neura-secondary">
            <ShieldCheck size={19} />
          </span>
          <div>
            <p className="text-sm font-semibold text-neura-text">Modo privado</p>
            <p className="text-sm text-neura-muted">Sessão protegida</p>
          </div>
        </div>
      </motion.div>

      <div className="overflow-hidden rounded-3xl border border-neura-line bg-neura-card shadow-neura-premium">
        <div className="h-52 overflow-hidden sm:h-64">
          <img
            src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=85"
            alt="Profissional de saúde mental em sessão online"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-neura-text">Conversa em andamento</p>
              <p className="text-sm text-neura-muted">Neura IA responde com contexto</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-neura-success/10 px-3 py-1.5 text-sm font-semibold text-green-600">
              <span className="h-2 w-2 rounded-full bg-neura-success" />
              Ativo
            </span>
          </div>
          <div className="space-y-3">
            {heroMessages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const msgsRef = useRef(null);
  const { summaryText, recordConversationSignal } = useEmotionalMemory({ user, storageScope: 'landing' });
  const { messages, isTyping, sendMessage } = useChatSession({
    user,
    storageScope: 'landing',
    context: {
      mood: 'curioso/a',
      topic: 'bem-estar mental e primeiros passos na Neura',
      emotionalMemorySummary: summaryText,
    },
    loadHistory: chatOpen,
  });

  const send = async () => {
    const value = input.trim();

    if (!value || isTyping) return;

    const sent = await sendMessage(value);

    if (sent) {
      recordConversationSignal({
        mood: 'curioso/a',
        topic: 'bem-estar mental e primeiros passos na Neura',
        createdAt: new Date().toISOString(),
      });
      setInput('');
    }
  };

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, chatOpen, isTyping]);

  return (
    <MarketingShell>
      <section className="relative overflow-hidden bg-neura-hero">
        <div className="mx-auto grid min-h-[calc(100svh-112px)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <SectionBadge tone="violet">Apoio emocional inteligente e humano</SectionBadge>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.03] tracking-normal text-neura-text sm:text-6xl lg:text-7xl">
              Neura cuida da tua saúde mental com IA e apoio clínico.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neura-muted">
              Um espaço seguro para desabafar, entender padrões emocionais e encontrar psicólogos certificados quando precisares de acompanhamento.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton onClick={() => navigate('/onboarding')} className="px-7 py-4">
                Começar agora
              </PrimaryButton>
              <SecondaryButton onClick={() => navigate('/check-in')} className="px-7 py-4">
                <MessageCircle size={17} />
                Experimentar a IA
              </SecondaryButton>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-neura-line bg-neura-card/80 p-4 shadow-neura backdrop-blur-xl">
                  <p className="text-2xl font-extrabold text-neura-text">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-neura-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <HeroMockup />
        </div>
      </section>

      <section className="border-y border-neura-line bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <SectionBadge tone="blue" className="justify-center">
              Recursos principais
            </SectionBadge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-normal text-neura-text sm:text-4xl">Tudo para começar com calma e continuidade.</h2>
            <p className="mt-4 text-base leading-7 text-neura-muted">A experiência combina conversa, check-ins e suporte humano sem tornar o cuidado pesado.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc, tone }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-neura-line bg-neura-card p-6 shadow-neura transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={cn('mb-5 flex h-11 w-11 items-center justify-center rounded-2xl', tone)}>
                  <Icon size={21} />
                </div>
                <h3 className="text-base font-bold text-neura-text">{title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-neura-muted">{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neura-section py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <SectionBadge tone="teal">Como funciona</SectionBadge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-normal text-neura-text sm:text-4xl">Do primeiro check-in ao apoio certo.</h2>
            <p className="mt-4 text-base leading-7 text-neura-muted">
              A Neura foi desenhada para criar clareza em poucos minutos e abrir caminho para acompanhamento profissional quando fizer sentido.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-neura-line bg-neura-card p-6 shadow-neura"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neura-primary/10 text-neura-primary">
                    <Icon size={21} />
                  </span>
                  <span className="text-sm font-extrabold text-neura-text">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-base font-bold text-neura-text">{title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-neura-muted">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neura-line bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionBadge tone="sage">Confiança</SectionBadge>
              <h2 className="mt-5 text-3xl font-extrabold tracking-normal text-neura-text sm:text-4xl">Uma experiência acolhedora sem perder rigor.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Privado', 'Seguro', 'Sem julgamento'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-neura-primary/10 px-4 py-2 text-sm font-semibold text-teal-700">
                  <CheckCircle2 size={15} />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-neura-line bg-neura-bg p-6 shadow-neura"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Quote className="text-neura-primary" size={24} />
                  <div className="flex gap-1 text-neura-accent2">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} size={15} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-7 text-neura-muted">"{item.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neura-primary to-neura-secondary text-sm font-bold text-white">
                    {item.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-neura-text">{item.name}</p>
                    <p className="text-sm text-neura-muted">{item.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neura-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-12 text-center shadow-neura-premium sm:px-12" style={{ background: BRAND.ctaGradient }}>
          <Sparkles className="mx-auto mb-5 text-white" size={28} />
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
            O primeiro passo pode ser pequeno. A Neura ajuda-te a dar esse passo hoje.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/85">Começa com um check-in gratuito, sem cartão e sem compromisso.</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-teal-700 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-teal-50"
          >
            Começar grátis
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xl shadow-teal-400/30 transition-all hover:scale-105"
        style={{ background: BRAND.gradient }}
        aria-label={chatOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {chatOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 flex max-h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-neura-line bg-neura-card shadow-2xl sm:right-6"
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ background: BRAND.gradient }}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <Bot size={19} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Neura IA</p>
                  <p className="flex items-center gap-1.5 text-sm text-white/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-neura-success" />
                    Sempre disponível
                  </p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div ref={msgsRef} className="flex min-h-64 flex-1 flex-col gap-3 overflow-y-auto bg-neura-bg p-4">
              {messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
              ))}
              {isTyping && <FloatingTypingIndicator />}
            </div>

            <div className="flex gap-2 border-t border-neura-line bg-neura-card p-3">
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
                onClick={send}
                disabled={!input.trim() || isTyping}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white transition-transform hover:scale-105 disabled:pointer-events-none disabled:bg-slate-300"
                style={input.trim() && !isTyping ? { background: BRAND.gradient } : undefined}
                aria-label="Enviar mensagem"
              >
                <Send size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MarketingShell>
  );
}
