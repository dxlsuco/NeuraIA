import apiClient from './apiClient';
import {
  appendLocalCheckIn,
  appendLocalConversationSignal,
  clearLocalEmotionalMemory,
  getLocalEmotionalMemory,
  normalizeEmotionalMemory,
  saveLocalEmotionalMemory,
} from '../utils/emotionalMemory';

const silentRequest = { skipGlobalErrorToast: true };

export async function getMemory(userId) {
  const localMemory = getLocalEmotionalMemory(userId);

  try {
    const response = await apiClient.get('/api/emotional-memory', {
      ...silentRequest,
      params: { userId },
    });
    return saveLocalEmotionalMemory(userId, normalizeEmotionalMemory(response.data, userId));
  } catch {
    return localMemory;
  }
}

export async function recordCheckIn(userId, entry) {
  const localMemory = appendLocalCheckIn(userId, entry);

  try {
    const response = await apiClient.post(
      '/api/emotional-memory/check-ins',
      {
        userId,
        checkIn: entry,
      },
      silentRequest,
    );

    return saveLocalEmotionalMemory(userId, normalizeEmotionalMemory(response.data, userId));
  } catch {
    return localMemory;
  }
}

export async function recordConversationSignal(userId, signal) {
  const localMemory = appendLocalConversationSignal(userId, signal);

  try {
    const response = await apiClient.post(
      '/api/emotional-memory/signals',
      {
        userId,
        signal,
      },
      silentRequest,
    );

    return saveLocalEmotionalMemory(userId, normalizeEmotionalMemory(response.data, userId));
  } catch {
    return localMemory;
  }
}

export async function clearMemory(userId) {
  clearLocalEmotionalMemory(userId);

  try {
    await apiClient.delete('/api/emotional-memory', {
      ...silentRequest,
      params: { userId },
    });
  } catch {
    // Local cleanup is enough when the optional remote memory API is unavailable.
  }
}

export const emotionalMemoryService = {
  getMemory,
  recordCheckIn,
  recordConversationSignal,
  clearMemory,
};

export default emotionalMemoryService;
