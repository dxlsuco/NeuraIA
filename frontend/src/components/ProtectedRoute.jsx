import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neura-hero px-4 text-neura-text">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-neura-line bg-white/85 px-8 py-7 text-center shadow-neura backdrop-blur">
          <span className="h-9 w-9 animate-spin rounded-full border-4 border-neura-primary/20 border-t-neura-primary" />
          <p className="text-sm font-semibold text-neura-muted">A verificar sessão...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
