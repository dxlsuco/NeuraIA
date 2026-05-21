export const CHAT_CONTEXT_KEY = 'neura.chat.context';
export const CHAT_VISITOR_ID_KEY = 'neura.chat.visitorId';
export const CHAT_HISTORY_KEY_PREFIX = 'neura.chat.history';

export const DEFAULT_CHAT_MESSAGES = [
  { from: 'ai', text: 'Olá. Estou aqui para te ouvir. Como te sentes hoje?' },
];

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

export function buildSystemPrompt({ mood, topic, emotionalMemorySummary } = {}) {
  const safeMood = mood || 'sem check-in registado';
  const safeTopic = topic || 'uma conversa livre sobre bem-estar emocional';
  const safeMemory = emotionalMemorySummary || 'Ainda não há memória emocional anterior. Usa apenas o contexto atual do utilizador.';

  return `És um assistente de bem-estar mental empático.
O utilizador está a sentir-se ${safeMood} e quer falar sobre ${safeTopic}.
Responde em português, de forma calorosa e concisa.

Memória emocional recente:
${safeMemory}

Usa esta memória apenas para dar continuidade, reconhecer padrões suaves e fazer perguntas úteis. Não faças diagnósticos, não assumas certezas clínicas e recomenda apoio profissional ou serviços de emergência se houver risco ou crise.`;
}

export function buildChatContext(context = {}) {
  return {
    ...context,
    systemPrompt: buildSystemPrompt(context),
  };
}

export function saveCheckInContext(context) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(CHAT_CONTEXT_KEY, JSON.stringify(context));
}

export function getStoredCheckInContext() {
  const storage = getStorage();

  if (!storage) {
    return {};
  }

  const rawContext = storage.getItem(CHAT_CONTEXT_KEY);

  if (!rawContext) {
    return {};
  }

  try {
    return JSON.parse(rawContext) ?? {};
  } catch {
    storage.removeItem(CHAT_CONTEXT_KEY);
    return {};
  }
}

export function getChatUserId(user, scope = 'default') {
  const explicitId = user?.id ?? user?._id ?? user?.userId ?? user?.email;

  if (explicitId) {
    return String(explicitId);
  }

  const storage = getStorage();
  const key = `${CHAT_VISITOR_ID_KEY}.${scope}`;

  if (!storage) {
    return `visitor-${scope}`;
  }

  const currentId = storage.getItem(key);

  if (currentId) {
    return currentId;
  }

  const nextId = `visitor-${scope}-${createId()}`;
  storage.setItem(key, nextId);
  return nextId;
}

export function getChatHistoryKey(userId) {
  return `${CHAT_HISTORY_KEY_PREFIX}.${userId}`;
}

export function saveStoredChatHistory(userId, messages) {
  const storage = getStorage();

  if (!storage || !userId) {
    return;
  }

  storage.setItem(getChatHistoryKey(userId), JSON.stringify(messages));
}

export function getStoredChatHistory(userId) {
  const storage = getStorage();

  if (!storage || !userId) {
    return null;
  }

  const rawHistory = storage.getItem(getChatHistoryKey(userId));

  if (!rawHistory) {
    return null;
  }

  try {
    const messages = JSON.parse(rawHistory);
    return Array.isArray(messages) ? messages : null;
  } catch {
    storage.removeItem(getChatHistoryKey(userId));
    return null;
  }
}

export function clearStoredChatHistory(userId) {
  const storage = getStorage();

  if (!storage || !userId) {
    return;
  }

  storage.removeItem(getChatHistoryKey(userId));
}

export function normalizeChatHistory(payload) {
  const source = payload?.messages ?? payload?.history ?? payload?.data ?? payload;

  if (!Array.isArray(source)) {
    return [];
  }

  return source
    .map((message) => {
      const role = message.role ?? message.from ?? message.sender;
      const text = message.text ?? message.content ?? message.message ?? message.reply;

      if (!text) {
        return null;
      }

      return {
        from: role === 'user' ? 'user' : 'ai',
        text,
      };
    })
    .filter(Boolean);
}
