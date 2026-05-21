export const AUTH_TOKEN_KEY = 'neura.auth.token';
export const AUTH_USER_KEY = 'neura.auth.user';
export const AUTH_SESSION_EXPIRED_EVENT = 'neura:session-expired';

function getStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

export function saveStoredSession(session) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(AUTH_TOKEN_KEY, session.token);
  storage.setItem(AUTH_USER_KEY, JSON.stringify(session.user ?? null));
}

export function clearStoredSession() {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(AUTH_TOKEN_KEY);
  storage.removeItem(AUTH_USER_KEY);
}

export function getStoredToken() {
  const storage = getStorage();

  if (!storage) {
    return null;
  }

  return storage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredSession() {
  const token = getStoredToken();

  if (!token) {
    return null;
  }

  const storage = getStorage();
  const rawUser = storage?.getItem(AUTH_USER_KEY);
  let user = null;

  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch {
      storage?.removeItem(AUTH_USER_KEY);
    }
  }

  return { token, user };
}

export function notifySessionExpired() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(AUTH_SESSION_EXPIRED_EVENT));
}
