import { motion } from 'framer-motion';
import { Home, SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton, SectionBadge } from '../components/Brand';
import MarketingShell from '../components/MarketingShell';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <MarketingShell>
      <section className="bg-neura-hero px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <SectionBadge icon={SearchX} tone="violet" className="justify-center">
            Página não encontrada
          </SectionBadge>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neura-text sm:text-5xl">
            Esta página não existe.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neura-muted">
            O endereço pode ter mudado ou a página pode ter sido removida. Volta ao início para continuar a navegar pela Neura.
          </p>
          <PrimaryButton showArrow={false} onClick={() => navigate('/')} className="mt-8 px-7 py-4">
            <Home size={17} />
            Voltar ao início
          </PrimaryButton>
        </motion.div>
      </section>
    </MarketingShell>
  );
}
