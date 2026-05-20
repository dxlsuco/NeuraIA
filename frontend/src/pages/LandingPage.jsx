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
import { cn } from '../utils/cn';

const replies = [
  'Obrigado por partilhares. Vamos respirar um pouco e perceber o que mais pesa agora.',
  'Estou aqui contigo. O que aconteceu antes de te sentires assim?',
  'O que sentes faz sentido. Queres organizar isso em passos pequenos?',
  'Podemos explorar isso com calma. Onde sentes essa tensão no corpo?',
];

const features = [
  {
    icon: MessageCircle,
    title: 'IA empática 24/7',
    desc: 'Conversa imediata para nomear emoções, reduzir ruído mental e encontrar o próximo passo.',
    tone: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Users,
    title: 'Psicólogos certificados',
    desc: 'Encaminhamento para profissionais reais quando o cuidado humano é o melhor caminho.',
    tone: 'bg-violet-50 text-violet-600',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade por desenho',
    desc: 'Fluxos discretos, dados sensíveis protegidos e uma experiência sem exposição desnecessária.',
    tone: 'bg-teal-50 text-teal-600',
  },
  {
    icon: HeartHandshake,
    title: 'Apoio sem julgamento',
    desc: 'Um ambiente acolhedor para falar de ansiedade, stress, relações, rotina e autocuidado.',
    tone: 'bg-sage-50 text-sage-600',
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
            ? 'rounded-tr-sm bg-gradient-to-br from-blue-600 to-violet-600 text-white'
            : 'rounded-tl-sm border border-slate-100 bg-white text-slate-600',
        )}
      >
        {message.text}
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
      <div className="absolute -left-5 top-10 hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-neura lg:block">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <Clock3 size={19} />
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-900">Check-in diário</p>
            <p className="text-xs text-slate-400">2 min concluídos</p>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
        className="absolute -right-4 bottom-10 hidden rounded-3xl border border-violet-100 bg-white p-4 shadow-neura-premium lg:block"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <ShieldCheck size={19} />
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-900">Modo privado</p>
            <p className="text-xs text-slate-400">Sessão protegida</p>
          </div>
        </div>
      </motion.div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-neura-premium">
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
              <p className="text-sm font-bold text-slate-950">Conversa em andamento</p>
              <p className="text-xs text-slate-400">Neura IA responde com contexto</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
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
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [replyIdx, setReplyIdx] = useState(0);
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Olá. Estou aqui para te ouvir. Como te sentes hoje?' }]);
  const msgsRef = useRef(null);

  const send = () => {
    const value = input.trim();
    if (!value) return;

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: value },
      { from: 'ai', text: replies[replyIdx % replies.length] },
    ]);
    setReplyIdx((idx) => idx + 1);
    setInput('');
  };

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, chatOpen]);

  return (
    <MarketingShell>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#EEF2FF_0%,#F8FAFF_52%,#F5F3FF_100%)]">
        <div className="mx-auto grid min-h-[calc(100svh-112px)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <SectionBadge tone="violet">Apoio emocional inteligente e humano</SectionBadge>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.03] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
              Neura cuida da tua saúde mental com IA e apoio clínico.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
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
                <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-neura backdrop-blur-xl">
                  <p className="text-2xl font-extrabold text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <HeroMockup />
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <SectionBadge tone="blue" className="justify-center">
              Recursos principais
            </SectionBadge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">Tudo para começar com calma e continuidade.</h2>
            <p className="mt-4 text-base leading-7 text-slate-500">A experiência combina conversa, check-ins e suporte humano sem tornar o cuidado pesado.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc, tone }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-neura transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={cn('mb-5 flex h-11 w-11 items-center justify-center rounded-2xl', tone)}>
                  <Icon size={21} />
                </div>
                <h3 className="text-base font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFF] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <SectionBadge tone="teal">Como funciona</SectionBadge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">Do primeiro check-in ao apoio certo.</h2>
            <p className="mt-4 text-base leading-7 text-slate-500">
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
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-neura"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={21} />
                  </span>
                  <span className="text-sm font-extrabold text-slate-200">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-base font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionBadge tone="sage">Confiança</SectionBadge>
              <h2 className="mt-5 text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">Uma experiência acolhedora sem perder rigor.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Privado', 'Seguro', 'Sem julgamento'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
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
                className="rounded-3xl border border-slate-100 bg-[#F8FAFF] p-6 shadow-neura"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Quote className="text-blue-600" size={24} />
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} size={15} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-7 text-slate-600">"{item.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">
                    {item.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-950">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-12 text-center shadow-neura-premium sm:px-12" style={{ background: BRAND.gradient }}>
          <Sparkles className="mx-auto mb-5 text-white" size={28} />
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
            O primeiro passo pode ser pequeno. A Neura ajuda-te a dar esse passo hoje.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100">Começa com um check-in gratuito, sem cartão e sem compromisso.</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-blue-700 shadow-xl transition-all hover:scale-105 hover:bg-blue-50"
          >
            Começar grátis
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-105"
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
            className="fixed bottom-24 right-4 z-50 flex max-h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl sm:right-6"
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ background: BRAND.gradient }}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <Bot size={19} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Neura IA</p>
                  <p className="flex items-center gap-1.5 text-xs text-blue-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Sempre disponível
                  </p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div ref={msgsRef} className="flex min-h-64 flex-1 flex-col gap-3 overflow-y-auto bg-[#F8FAFF] p-4">
              {messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
              ))}
            </div>

            <div className="flex gap-2 border-t border-slate-100 bg-white p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && send()}
                placeholder="Escreve como te sentes..."
                className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:shadow-sm"
              />
              <button
                onClick={send}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white transition-transform hover:scale-105"
                style={{ background: BRAND.tealGradient }}
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
