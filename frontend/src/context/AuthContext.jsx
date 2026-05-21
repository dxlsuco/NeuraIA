/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { authService } from '../services/authService';
import { AUTH_SESSION_EXPIRED_EVENT } from '../services/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());
  const loading = false;

  useEffect(() => {
    const handleSessionExpired = () => {
      setSession(null);
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);

    return () => {
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, []);

  const handleLogin = useCallback(async (email, password) => {
    const nextSession = await authService.login(email, password);
    setSession(nextSession);
    return nextSession;
  }, []);

  const handleLogout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.token),
      login: handleLogin,
      logout: handleLogout,
      loading,
    }),
    [handleLogin, handleLogout, loading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
