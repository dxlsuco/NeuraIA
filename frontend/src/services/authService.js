import apiClient from './apiClient';
import { clearStoredSession, getStoredSession, saveStoredSession } from './authStorage';

const DEV_AUTH_FALLBACK_ENABLED = import.meta.env.DEV && import.meta.env.VITE_ENABLE_AUTH_FALLBACK !== 'false';

function getNameFromEmail(email) {
  return email
    .split('@')[0]
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join(' ');
}

function createLocalSession(email) {
  return {
    token: `local-dev-token-${Date.now()}`,
    user: {
      id: `local-${email}`,
      email,
      name: getNameFromEmail(email) || 'Utilizador Neura',
      plan: 'free',
      preferences: {
        language: 'pt',
        notifications: true,
        theme: 'light',
      },
    },
  };
}

function normalizeSession(data) {
  const token = data?.token ?? data?.accessToken ?? data?.access_token ?? data?.jwt;
  const user = data?.user ?? data?.profile ?? data?.usuario ?? null;

  if (!token) {
    throw new Error('Resposta de autenticação inválida.');
  }

  return { token, user };
}

function getLoginError(error) {
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    return 'Credenciais inválidas. Verifica o email e a palavra-passe.';
  }

  return error?.response?.data?.message ?? error?.message ?? 'Não foi possível iniciar sessão. Tenta novamente.';
}

function canUseLocalSession(error) {
  return DEV_AUTH_FALLBACK_ENABLED && error?.response?.status === 404;
}

export async function login(email, password) {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password });
    const session = normalizeSession(response.data);
    saveStoredSession(session);

    return session;
  } catch (error) {
    if (canUseLocalSession(error)) {
      const session = createLocalSession(email);
      saveStoredSession(session);
      return session;
    }

    throw new Error(getLoginError(error), { cause: error });
  }
}

export function logout() {
  clearStoredSession();
}

export function getSession() {
  return getStoredSession();
}

export const authService = {
  login,
  logout,
  getSession,
};
