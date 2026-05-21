import apiClient from './apiClient';

export async function getProfile(userId) {
  const response = await apiClient.get('/api/profile', {
    params: { userId },
  });

  return response.data;
}

export async function updateProfile(userId, data) {
  const response = await apiClient.put('/api/profile', {
    userId,
    ...data,
  });

  return response.data;
}

export async function uploadAvatar(userId, file) {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('avatar', file);

  const response = await apiClient.post('/api/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function deleteAccount(userId) {
  const response = await apiClient.delete('/api/profile', {
    params: { userId },
  });

  return response.data;
}

export const profileService = {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAccount,
};

export default profileService;
