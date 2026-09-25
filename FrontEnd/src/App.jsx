import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ProfileProvider } from "./contexts/ProfileContext";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import ScrollToTop from "./components/Shared/ScrollToTop";

// Pages publiques
import LandingPage from "./components/Pages/Public/LandingPage";
import DomainPage from "./components/Pages/Public/DomainPage";
import ProjectsPage from "./components/Pages/Public/ProjectsPage";
import ProjectDetailPage from "./components/Pages/Public/ProjectDetailPage";
import AboutPage from "./components/Pages/Public/AboutPage";
import ContactPage from "./components/Pages/Public/ContactPage";
import NotFoundPage from "./components/Pages/Public/NotFoundPage";

// Pages support
import LegalPage from "./components/Pages/Support/LegalPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* --- Public routes --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/jeux-video" element={<DomainPage domain="game" />} />
        <Route path="/web" element={<DomainPage domain="web" />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* --- Support routes --- */}
        <Route path="/legal" element={<LegalPage />} />

        {/* --- Fallback --- */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ProfileProvider>
        <ProjectsProvider>
          <ScrollToTop />
          <AnimatedRoutes />
        </ProjectsProvider>
      </ProfileProvider>
    </Router>
  );
}
