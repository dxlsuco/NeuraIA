export const EMOTIONAL_MEMORY_KEY_PREFIX = 'neura.emotionalMemory';

const MAX_CHECK_INS = 40;
const MAX_CONVERSATION_SIGNALS = 30;

const moodScores = {
  'very-low': 1,
  confused: 2,
  neutral: 3,
  calm: 4,
  well: 5,
};

function getStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getMemoryKey(userId) {
  return `${EMOTIONAL_MEMORY_KEY_PREFIX}.${userId}`;
}

function sortByDateDesc(items) {
  return [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function countBy(items, getValue) {
  return items.reduce((acc, item) => {
    const value = getValue(item);

    if (!value) {
      return acc;
    }

    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

function getTopValue(counter) {
  return Object.entries(counter).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

function getAverageScore(checkIns) {
  const scores = checkIns.map((entry) => moodScores[entry.mood]).filter(Boolean);

  if (scores.length === 0) {
    return null;
  }

  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function getTrend(recentCheckIns) {
  if (recentCheckIns.length < 4) {
    return 'dados insuficientes para tendência';
  }

  const recentAverage = getAverageScore(recentCheckIns.slice(0, 3));
  const previousAverage = getAverageScore(recentCheckIns.slice(3, 6));

  if (!recentAverage || !previousAverage) {
    return 'tendência emocional ainda pouco clara';
  }

  if (recentAverage - previousAverage >= 0.7) {
    return 'tendência recente mais leve/estável';
  }

  if (previousAverage - recentAverage >= 0.7) {
    return 'tendência recente mais pesada/sensível';
  }

  return 'tendência recente relativamente estável';
}

export function createEmptyEmotionalMemory(userId) {
  return {
    userId,
    checkIns: [],
    conversationSignals: [],
    updatedAt: null,
    source: 'local',
  };
}

export function normalizeCheckIn(entry) {
  return {
    id: entry.id ?? createId(),
    mood: entry.mood ?? '',
    moodLabel: entry.moodLabel ?? entry.mood ?? 'Estado emocional não identificado',
    topic: entry.topic ?? 'Tema livre',
    note: entry.note ?? '',
    source: entry.source ?? 'check-in',
    createdAt: entry.createdAt ?? new Date().toISOString(),
  };
}

export function normalizeEmotionalMemory(payload, userId) {
  const memory = payload?.memory ?? payload?.data ?? payload ?? {};
  const checkIns = Array.isArray(memory.checkIns) ? memory.checkIns : [];
  const conversationSignals = Array.isArray(memory.conversationSignals) ? memory.conversationSignals : [];

  return {
    userId: memory.userId ?? userId,
    checkIns: sortByDateDesc(checkIns.map(normalizeCheckIn)).slice(0, MAX_CHECK_INS),
    conversationSignals: sortByDateDesc(
      conversationSignals.map((signal) => ({
        id: signal.id ?? createId(),
        topic: signal.topic ?? '',
        mood: signal.mood ?? '',
        createdAt: signal.createdAt ?? new Date().toISOString(),
      })),
    ).slice(0, MAX_CONVERSATION_SIGNALS),
    updatedAt: memory.updatedAt ?? new Date().toISOString(),
    source: memory.source ?? 'remote',
  };
}

export function getLocalEmotionalMemory(userId) {
  const storage = getStorage();

  if (!storage || !userId) {
    return createEmptyEmotionalMemory(userId);
  }

  const rawMemory = storage.getItem(getMemoryKey(userId));

  if (!rawMemory) {
    return createEmptyEmotionalMemory(userId);
  }

  try {
    return normalizeEmotionalMemory(JSON.parse(rawMemory), userId);
  } catch {
    storage.removeItem(getMemoryKey(userId));
    return createEmptyEmotionalMemory(userId);
  }
}

export function saveLocalEmotionalMemory(userId, memory) {
  const storage = getStorage();

  if (!storage || !userId) {
    return memory;
  }

  const normalizedMemory = normalizeEmotionalMemory(
    {
      ...memory,
      updatedAt: new Date().toISOString(),
      source: memory.source ?? 'local',
    },
    userId,
  );

  storage.setItem(getMemoryKey(userId), JSON.stringify(normalizedMemory));
  return normalizedMemory;
}

export function appendLocalCheckIn(userId, entry) {
  const currentMemory = getLocalEmotionalMemory(userId);
  const nextMemory = {
    ...currentMemory,
    checkIns: sortByDateDesc([normalizeCheckIn(entry), ...currentMemory.checkIns]).slice(0, MAX_CHECK_INS),
    updatedAt: new Date().toISOString(),
    source: 'local',
  };

  return saveLocalEmotionalMemory(userId, nextMemory);
}

export function appendLocalConversationSignal(userId, signal) {
  const currentMemory = getLocalEmotionalMemory(userId);
  const nextSignal = {
    id: signal.id ?? createId(),
    mood: signal.mood ?? '',
    topic: signal.topic ?? '',
    createdAt: signal.createdAt ?? new Date().toISOString(),
  };
  const nextMemory = {
    ...currentMemory,
    conversationSignals: sortByDateDesc([nextSignal, ...currentMemory.conversationSignals]).slice(0, MAX_CONVERSATION_SIGNALS),
    updatedAt: new Date().toISOString(),
    source: 'local',
  };

  return saveLocalEmotionalMemory(userId, nextMemory);
}

export function clearLocalEmotionalMemory(userId) {
  const storage = getStorage();

  if (!storage || !userId) {
    return;
  }

  storage.removeItem(getMemoryKey(userId));
}

export function summarizeEmotionalMemory(memory) {
  const checkIns = sortByDateDesc(memory?.checkIns ?? []);
  const recentCheckIns = checkIns.slice(0, 6);
  const lastCheckIn = recentCheckIns[0] ?? null;
  const dominantMood = getTopValue(countBy(recentCheckIns, (entry) => entry.moodLabel || entry.mood));
  const dominantTopic = getTopValue(countBy(recentCheckIns, (entry) => entry.topic));
  const recentTopics = [...new Set(recentCheckIns.map((entry) => entry.topic).filter(Boolean))].slice(0, 3);
  const trend = getTrend(recentCheckIns);

  if (recentCheckIns.length === 0) {
    return {
      totalCheckIns: 0,
      lastCheckIn: null,
      dominantMood: null,
      dominantTopic: null,
      recentTopics: [],
      trend,
      prompt: 'Ainda não há memória emocional anterior. Usa apenas o contexto atual do utilizador.',
    };
  }

  const promptParts = [
    `Último check-in: ${lastCheckIn.moodLabel} sobre ${lastCheckIn.topic}.`,
    dominantMood ? `Estado mais frequente recentemente: ${dominantMood}.` : null,
    dominantTopic ? `Tema recorrente: ${dominantTopic}.` : null,
    recentTopics.length > 0 ? `Temas recentes: ${recentTopics.join(', ')}.` : null,
    `Tendência: ${trend}.`,
  ].filter(Boolean);

  return {
    totalCheckIns: checkIns.length,
    lastCheckIn,
    dominantMood,
    dominantTopic,
    recentTopics,
    trend,
    prompt: promptParts.join(' '),
  };
}
