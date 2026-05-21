import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import chatService from '../services/chatService';
import {
  buildChatContext,
  clearStoredChatHistory,
  DEFAULT_CHAT_MESSAGES,
  getChatUserId,
  getStoredChatHistory,
  normalizeChatHistory,
  saveStoredChatHistory,
} from '../utils/chatSession';
import { toast } from '../utils/toast';

function getReplyText(payload) {
  return payload?.reply ?? payload?.message ?? payload?.text ?? payload?.data?.reply;
}

function getOriginalError(error) {
  return error?.cause?.cause ?? error?.cause ?? error;
}

function shouldShowLocalToast(error) {
  const originalError = getOriginalError(error);
  const isNetworkError = Boolean(originalError?.request && !originalError?.response);
  const status = originalError?.response?.status;

  return !isNetworkError && (!status || status < 500);
}

export default function useChatSession({
  user,
  userId: explicitUserId,
  context = {},
  storageScope = 'default',
  initialMessages = DEFAULT_CHAT_MESSAGES,
  loadHistory = true,
} = {}) {
  const userId = useMemo(() => explicitUserId ?? getChatUserId(user, storageScope), [explicitUserId, storageScope, user]);
  const contextKey = JSON.stringify(context);
  const chatContext = useMemo(() => buildChatContext(JSON.parse(contextKey)), [contextKey]);
  const loadedHistoryForRef = useRef(null);

  const [messages, setMessages] = useState(() => getStoredChatHistory(userId) ?? initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(Boolean(loadHistory));

  const persistMessages = useCallback(
    (nextMessages) => {
      saveStoredChatHistory(userId, nextMessages);
      return nextMessages;
    },
    [userId],
  );

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(() => {
      if (cancelled) {
        return;
      }

      const storedMessages = getStoredChatHistory(userId);
      setMessages(storedMessages ?? initialMessages);
      loadedHistoryForRef.current = null;
    });

    return () => {
      cancelled = true;
    };
  }, [initialMessages, userId]);

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(() => {
      if (cancelled) {
        return;
      }

      if (!loadHistory || loadedHistoryForRef.current === userId) {
        setHistoryLoading(false);
        return;
      }

      loadedHistoryForRef.current = userId;
      setHistoryLoading(true);

      chatService
        .getHistory(userId)
        .then((payload) => {
          if (cancelled) {
            return;
          }

          const remoteMessages = normalizeChatHistory(payload);

          if (remoteMessages.length > 0) {
            setMessages(persistMessages(remoteMessages));
          }
        })
        .catch(() => {
          // LocalStorage remains the fallback when remote history is unavailable.
        })
        .finally(() => {
          if (!cancelled) {
            setHistoryLoading(false);
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [loadHistory, persistMessages, userId]);

  const sendMessage = useCallback(
    async (rawMessage) => {
      const text = rawMessage.trim();

      if (!text || isTyping) {
        return false;
      }

      const userMessage = { from: 'user', text };
      setMessages((currentMessages) => persistMessages([...currentMessages, userMessage]));
      setIsTyping(true);

      try {
        const response = await chatService.sendMessage(userId, text, chatContext);
        const replyText = getReplyText(response);

        if (!replyText) {
          throw new Error('A Neura não devolveu uma resposta válida.');
        }

        const aiMessage = { from: 'ai', text: replyText };
        setMessages((currentMessages) => persistMessages([...currentMessages, aiMessage]));
        return true;
      } catch (error) {
        if (shouldShowLocalToast(error)) {
          toast.error(error?.message ?? 'Não foi possível obter resposta da Neura. Tenta novamente.');
        }

        return false;
      } finally {
        setIsTyping(false);
      }
    },
    [chatContext, isTyping, persistMessages, userId],
  );

  const clearMessages = useCallback(async () => {
    clearStoredChatHistory(userId);
    setMessages(initialMessages);

    try {
      await chatService.clearHistory(userId);
    } catch (error) {
      if (shouldShowLocalToast(error)) {
        toast.error('Não foi possível limpar o histórico remoto.');
      }
    }
  }, [initialMessages, userId]);

  return {
    messages,
    isTyping,
    historyLoading,
    sendMessage,
    clearMessages,
    userId,
    context: chatContext,
  };
}
