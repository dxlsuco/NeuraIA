import { useCallback, useEffect, useMemo, useState } from 'react';

import emotionalMemoryService from '../services/emotionalMemoryService';
import { getChatUserId } from '../utils/chatSession';
import { getLocalEmotionalMemory, summarizeEmotionalMemory } from '../utils/emotionalMemory';

export default function useEmotionalMemory({ user, userId: explicitUserId, storageScope = 'chat' } = {}) {
  const userId = useMemo(() => explicitUserId ?? getChatUserId(user, storageScope), [explicitUserId, storageScope, user]);
  const [memory, setMemory] = useState(() => getLocalEmotionalMemory(userId));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(() => {
      if (cancelled) {
        return;
      }

      setLoading(true);
      emotionalMemoryService
        .getMemory(userId)
        .then((nextMemory) => {
          if (!cancelled) {
            setMemory(nextMemory);
          }
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false);
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const recordCheckIn = useCallback(
    async (entry) => {
      const nextMemory = await emotionalMemoryService.recordCheckIn(userId, entry);
      setMemory(nextMemory);
      return nextMemory;
    },
    [userId],
  );

  const recordConversationSignal = useCallback(
    async (signal) => {
      const nextMemory = await emotionalMemoryService.recordConversationSignal(userId, signal);
      setMemory(nextMemory);
      return nextMemory;
    },
    [userId],
  );

  const clearMemory = useCallback(async () => {
    await emotionalMemoryService.clearMemory(userId);
    setMemory(getLocalEmotionalMemory(userId));
  }, [userId]);

  const summary = useMemo(() => summarizeEmotionalMemory(memory), [memory]);

  return {
    userId,
    memory,
    summary,
    summaryText: summary.prompt,
    loading,
    recordCheckIn,
    recordConversationSignal,
    clearMemory,
  };
}
