import apiClient from './apiClient';

const silentRequest = { skipGlobalErrorToast: true };

export async function getWeeklyMood(userId) {
  const response = await apiClient.get('/api/dashboard/mood', {
    ...silentRequest,
    params: { userId },
  });

  return response.data;
}

export async function getInsights(userId) {
  const response = await apiClient.get('/api/dashboard/insights', {
    ...silentRequest,
    params: { userId },
  });

  return response.data;
}

export async function getStreak(userId) {
  const response = await apiClient.get('/api/dashboard/streak', {
    ...silentRequest,
    params: { userId },
  });

  return response.data;
}

export const dashboardService = {
  getWeeklyMood,
  getInsights,
  getStreak,
};

export default dashboardService;
