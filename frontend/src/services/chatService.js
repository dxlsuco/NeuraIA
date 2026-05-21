import apiClient from './apiClient';

export async function sendMessage(userId, message, context) {
  const response = await apiClient.post('/api/chat', {
    userId,
    message,
    context,
  });

  return response.data;
}

export async function getHistory(userId) {
  const response = await apiClient.get('/api/chat/history', {
    params: { userId },
  });

  return response.data;
}

export async function clearHistory(userId) {
  const response = await apiClient.delete('/api/chat/history', {
    params: { userId },
  });

  return response.data;
}

export const chatService = {
  sendMessage,
  getHistory,
  clearHistory,
};

export default chatService;
