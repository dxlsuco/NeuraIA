import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import CheckInPage from './pages/CheckInPage';
import ChatPage from './pages/ChatPage';
import ResourcesPage from './pages/ResourcesPage';
import PsychologistsPage from './pages/PsychologistsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entrar" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/check-in" element={<CheckInPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/recursos" element={<ResourcesPage />} />
        <Route path="/psicologos" element={<PsychologistsPage />} />
        <Route path="/como-funciona" element={<HowItWorksPage />} />
        <Route path="/precos" element={<PricingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
