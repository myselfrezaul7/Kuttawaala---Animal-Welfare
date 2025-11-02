import React, { lazy, Suspense, useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import CookieConsentBanner from './components/CookieConsentBanner';
import { ArrowUpIcon } from './components/icons';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const AdoptPage = lazy(() => import('./pages/AdoptPage'));
const ReportPage = lazy(() => import('./pages/ReportPage'));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));
const AnimalDetailPage = lazy(() => import('./pages/AnimalDetailPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const FindVetPage = lazy(() => import('./pages/FindVetPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const VolunteerPage = lazy(() => import('./pages/VolunteerPage'));
const MemorialPage = lazy(() => import('./pages/MemorialPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <ThemeProvider>
        <AuthProvider>
            <FavoritesProvider>
                <HashRouter>
                    <div className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100">
                    <Header />
                    <main className="flex-grow animate-fadeIn">
                      <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/adopt" element={<AdoptPage />} />
                          <Route path="/adopt/:id" element={<AnimalDetailPage />} />
                          <Route path="/report" element={<ReportPage />} />
                          <Route path="/ai-assistant" element={<AIAssistantPage />} />
                          <Route path="/find-vet" element={<FindVetPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/signup" element={<SignUpPage />} />
                          <Route path="/faq" element={<FAQPage />} />
                          <Route path="/quiz" element={<QuizPage />} />
                          <Route path="/volunteer" element={<VolunteerPage />} />
                          <Route path="/memorial" element={<MemorialPage />} />
                          <Route path="/dashboard" element={<DashboardPage />} />
                          <Route path="/community" element={<CommunityPage />} />
                        </Routes>
                      </Suspense>
                    </main>
                    <Footer />
                    <CookieConsentBanner />
                     {showScroll && (
                        <button
                          onClick={scrollTop}
                          className="fixed bottom-8 right-8 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300 z-30 animate-fadeIn"
                          aria-label="Scroll to top"
                        >
                          <ArrowUpIcon className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                </HashRouter>
            </FavoritesProvider>
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;