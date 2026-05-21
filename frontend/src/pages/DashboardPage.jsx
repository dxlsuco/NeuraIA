import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isSameDay, parseISO, subDays } from 'date-fns';
import { pt } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Bot, Brain, CalendarCheck, Flame, HeartPulse, LineChart as LineChartIcon, MessageCircle, Sparkles } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { PrimaryButton, SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';
import { BRAND } from '../components/brandTokens';
import { useAuth } from '../context/AuthContext';
import dashboardService from '../services/dashboardService';
import { getChatUserId, getStoredChatHistory } from '../utils/chatSession';
import { getLocalEmotionalMemory, summarizeEmotionalMemory } from '../utils/emotionalMemory';
import { cn } from '../utils/cn';

const moodScores = {
  'very-low': 1,
  confused: 2,
  neutral: 3,
  calm: 4,
  well: 5,
};

const scoreLabels = {
  1: 'Muito em baixo',
  2: 'Sobrecarregado/a',
  3: 'Neutro/a',
  4: 'Em paz',
  5: 'Bem',
};

function normalizeArrayPayload(payload) {
  const source = payload?.data ?? payload?.items ?? payload?.mood ?? payload;
  return Array.isArray(source) ? source : [];
}

function normalizeWeeklyMood(payload) {
  return normalizeArrayPayload(payload)
    .map((item) => ({
      date: item.date ?? item.createdAt ?? item.day,
      label: item.label,
      mood: item.mood,
      moodLabel: item.moodLabel,
      score: Number(item.score ?? item.value ?? moodScores[item.mood] ?? 0),
    }))
    .filter((item) => item.date && item.score > 0);
}

function getLocalWeeklyMood(memory) {
  const checkIns = memory.checkIns ?? [];
  const today = new Date();

  return Array.from({ length: 7 }).map((_, index) => {
    const date = subDays(today, 6 - index);
    const entries = checkIns.filter((entry) => isSameDay(parseISO(entry.createdAt), date));
    const scores = entries.map((entry) => moodScores[entry.mood]).filter(Boolean);
    const average = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : null;

    return {
      date: date.toISOString(),
      label: format(date, 'EEE', { locale: pt }),
      score: average ? Number(average.toFixed(1)) : null,
      mood: entries[0]?.mood ?? null,
      moodLabel: entries[0]?.moodLabel ?? null,
    };
  });
}

function getDominantEmotion(memory) {
  const sevenDaysAgo = subDays(new Date(), 6);
  const counts = (memory.checkIns ?? [])
    .filter((entry) => parseISO(entry.createdAt) >= sevenDaysAgo)
    .reduce((acc, entry) => {
      const label = entry.moodLabel || scoreLabels[moodScores[entry.mood]] || entry.mood;
      acc[label] = (acc[label] ?? 0) + 1;
      return acc;
    }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Sem dados suficientes';
}

function getLocalStreak(memory) {
  const checkIns = memory.checkIns ?? [];
  let streak = 0;

  for (let index = 0; index < 30; index += 1) {
    const day = subDays(new Date(), index);
    const hasCheckIn = checkIns.some((entry) => isSameDay(parseISO(entry.createdAt), day));

    if (!hasCheckIn) {
      break;
    }

    streak += 1;
  }

  return streak;
}

function normalizeInsight(payload, summary) {
  const insight = payload?.insight ?? payload?.message ?? payload?.text ?? payload?.data?.insight;

  if (insight) {
    return insight;
  }

  if (summary.totalCheckIns === 0) {
    return 'Esta semana notámos que ainda não há check-ins suficientes para identificar padrões. Começa com pequenos registos para a Neura acompanhar melhor o teu estado emocional.';
  }

  return `Esta semana notámos que ${summary.dominantTopic ? `o tema "${summary.dominantTopic}" apareceu com frequência` : 'começaste a criar continuidade emocional'}. ${summary.trend}.`;
}

function getLatestConversations(userId) {
  const history = getStoredChatHistory(userId) ?? [];
  const userMessages = history
    .map((message, index) => ({ ...message, index }))
    .filter((message) => message.from === 'user')
    .slice(-3)
    .reverse();

  return userMessages.map((message) => {
    const reply = history.slice(message.index + 1).find((item) => item.from === 'ai');

    return {
      id: `${message.index}-${message.text}`,
      title: message.text,
      reply: reply?.text ?? 'Sem resposta registada.',
    };
  });
}

function StatCard({ icon: Icon, label, value, detail, tone = 'teal' }) {
  const tones = {
    teal: 'bg-neura-primary/10 text-neura-primary',
    sky: 'bg-neura-secondary/10 text-neura-secondary',
    violet: 'bg-neura-accent/15 text-violet-500',
    peach: 'bg-neura-accent2/20 text-orange-600',
  };

  return (
    <article className="rounded-3xl border border-neura-line bg-white/85 p-6 shadow-neura backdrop-blur">
      <div className={cn('mb-5 flex h-12 w-12 items-center justify-center rounded-2xl', tones[tone])}>
        <Icon size={22} />
      </div>
      <p className="text-sm font-semibold text-neura-muted">{label}</p>
      <p className="mt-2 text-2xl font-extrabold text-neura-text">{value}</p>
      <p className="mt-2 text-sm leading-6 text-neura-muted">{detail}</p>
    </article>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = useMemo(() => getChatUserId(user, 'chat'), [user]);
  const localMemory = useMemo(() => getLocalEmotionalMemory(userId), [userId]);
  const localSummary = useMemo(() => summarizeEmotionalMemory(localMemory), [localMemory]);
  const [weeklyMood, setWeeklyMood] = useState(() => getLocalWeeklyMood(localMemory));
  const [insight, setInsight] = useState(() => normalizeInsight(null, localSummary));
  const [streak, setStreak] = useState(() => getLocalStreak(localMemory));
  const [loading, setLoading] = useState(true);

  const dominantEmotion = useMemo(() => getDominantEmotion(localMemory), [localMemory]);
  const latestConversations = useMemo(() => getLatestConversations(userId), [userId]);
  const completedDays = weeklyMood.filter((item) => item.score).length;

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(async () => {
      setLoading(true);

      const [moodResult, insightsResult, streakResult] = await Promise.allSettled([
        dashboardService.getWeeklyMood(userId),
        dashboardService.getInsights(userId),
        dashboardService.getStreak(userId),
      ]);

      if (cancelled) {
        return;
      }

      if (moodResult.status === 'fulfilled') {
        const remoteMood = normalizeWeeklyMood(moodResult.value);

        if (remoteMood.length > 0) {
          setWeeklyMood(remoteMood);
        }
      }

      if (insightsResult.status === 'fulfilled') {
        setInsight(normalizeInsight(insightsResult.value, localSummary));
      }

      if (streakResult.status === 'fulfilled') {
        setStreak(Number(streakResult.value?.streak ?? streakResult.value?.data?.streak ?? streakResult.value ?? getLocalStreak(localMemory)));
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [localMemory, localSummary, userId]);

  return (
    <MarketingShell>
      <section className="bg-neura-hero px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <SectionBadge icon={HeartPulse} tone="blue">
              Dashboard emocional
            </SectionBadge>
            <h1 className="mt-6 text-4xl font-extrabold tracking-normal text-neura-text sm:text-5xl">
              O teu percurso emocional em contexto.
            </h1>
            <p className="mt-4 text-lg leading-8 text-neura-muted">
              Acompanha check-ins, conversas e sinais recentes para perceber padrões com mais clareza.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Brain} label="Emoção dominante" value={dominantEmotion} detail="Com base nos check-ins dos últimos 7 dias." tone="violet" />
            <StatCard icon={Flame} label="Streak" value={`${streak} dia${streak === 1 ? '' : 's'}`} detail="Check-ins consecutivos registados." tone="peach" />
            <StatCard icon={CalendarCheck} label="Semana" value={`${completedDays}/7`} detail="Dias com registo emocional nesta semana." tone="teal" />
            <StatCard icon={Activity} label="Tendência" value={localSummary.trend} detail="Leitura suave da memória emocional recente." tone="sky" />
          </div>
        </div>
      </section>

      <section className="bg-neura-bg px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-3xl border border-neura-line bg-neura-card p-5 shadow-neura sm:p-7">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-neura-primary">
                  <LineChartIcon size={17} />
                  Humor da última semana
                </div>
                <h2 className="mt-2 text-2xl font-extrabold text-neura-text">Variação emocional</h2>
              </div>
              {loading && <span className="w-fit rounded-full bg-neura-primary/10 px-3 py-1.5 text-xs font-bold text-teal-700">A atualizar</span>}
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyMood} margin={{ top: 12, right: 18, left: -18, bottom: 6 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#CCFBF1" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      border: '1px solid #CCFBF1',
                      borderRadius: 18,
                      boxShadow: '0 20px 55px rgba(15,23,42,0.10)',
                    }}
                    formatter={(value) => [value ? scoreLabels[Math.round(value)] ?? value : 'Sem registo', 'Humor']}
                    labelFormatter={(label) => `Dia ${label}`}
                  />
                  <Line type="monotone" dataKey="score" connectNulls stroke="#2DD4BF" strokeWidth={4} dot={{ r: 5, fill: '#60A5FA', strokeWidth: 2, stroke: '#FFFFFF' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-3xl border border-neura-line bg-white p-6 shadow-neura">
            <div className="rounded-3xl p-6 text-white" style={{ background: BRAND.gradient }}>
              <Sparkles className="mb-8 text-white/85" size={28} />
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/80">Insight IA</p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight">Esta semana notámos que...</h2>
              <p className="mt-4 text-sm leading-7 text-white/90">{insight.replace(/^Esta semana notámos que\s*/i, '')}</p>
            </div>

            <div className="mt-5 rounded-3xl border border-neura-line bg-neura-bg p-5">
              <p className="text-sm font-bold text-neura-text">Próximo passo suave</p>
              <p className="mt-2 text-sm leading-6 text-neura-muted">
                Continua com check-ins breves para a Neura perceber melhor padrões sem transformar cuidado em pressão.
              </p>
              <PrimaryButton onClick={() => navigate('/check-in')} className="mt-5 px-5 py-3">
                Fazer check-in
              </PrimaryButton>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-neura-line bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <SectionBadge icon={Bot} tone="violet">
                Conversas recentes
              </SectionBadge>
              <h2 className="mt-4 text-2xl font-extrabold text-neura-text">Últimas 3 conversas com a IA</h2>
            </div>
            <button
              onClick={() => navigate('/chat')}
              className="hidden items-center gap-2 rounded-full border border-neura-line bg-neura-card px-5 py-3 text-sm font-bold text-neura-text transition-colors hover:border-neura-primary/40 hover:bg-neura-primary/10 hover:text-teal-700 sm:flex"
            >
              Abrir chat
              <ArrowRight size={15} />
            </button>
          </div>

          {latestConversations.length === 0 ? (
            <div className="rounded-3xl border border-neura-line bg-neura-bg p-7 text-sm leading-6 text-neura-muted">
              Ainda não há conversas guardadas para apresentar.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {latestConversations.map((conversation, index) => (
                <article key={conversation.id} className="rounded-3xl border border-neura-line bg-neura-bg p-6 shadow-neura">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-neura-primary/10 text-neura-primary">
                    <MessageCircle size={21} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-neura-muted">Conversa {index + 1}</p>
                  <h3 className="mt-3 line-clamp-2 text-base font-bold text-neura-text">{conversation.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-neura-muted">{conversation.reply}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </MarketingShell>
  );
}
