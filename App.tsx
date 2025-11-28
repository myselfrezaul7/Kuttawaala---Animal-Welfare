import React, { lazy, Suspense, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsentBanner from './components/CookieConsentBanner';
import { ArrowUpIcon, PawIcon } from './components/icons';
import ErrorBoundary from './components/ErrorBoundary';

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
  <div className="flex flex-col justify-center items-center h-[60vh]">
    <div className="relative p-8 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-full shadow-2xl">
      <div className="w-16 h-16 border-4 border-orange-200/50 dark:border-slate-700/50 border-t-orange-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <PawIcon className="w-6 h-6 text-orange-500 animate-pulse" />
      </div>
    </div>
    <p className="mt-6 text-slate-700 dark:text-slate-300 font-bold tracking-widest uppercase text-sm animate-pulse">Loading KUTTAWAALA...</p>
  </div>
);

// ScrollToTop component handles resetting window scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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
    <CookieConsentProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
              <FavoritesProvider>
                  <HashRouter>
                      <ScrollToTop />
                      <ErrorBoundary>
                        <div className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
                        <Header />
                        <main className="flex-grow pt-24 sm:pt-28">
                          <Suspense fallback={<LoadingSpinner />}>
                            <div className="animate-fade-in">
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
                            </div>
                          </Suspense>
                        </main>
                        <Footer />
                        <CookieConsentBanner />
                        {showScroll && (
                            <button
                              onClick={scrollTop}
                              className="fixed bottom-8 right-8 bg-orange-500/90 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300 z-30 animate-pop hover:scale-110 backdrop-blur-sm"
                              aria-label="Scroll to top"
                            >
                              <ArrowUpIcon className="w-6 h-6" />
                            </button>
                          )}
                        </div>
                      </ErrorBoundary>
                  </HashRouter>
              </FavoritesProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </CookieConsentProvider>
  );
}

export default App;