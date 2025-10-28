import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdoptPage from './pages/AdoptPage';
import ReportPage from './pages/ReportPage';
import AIAssistantPage from './pages/AIAssistantPage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import FAQPage from './pages/FAQPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import CommunityPage from './pages/CommunityPage';
import OnlineVetPage from './pages/OnlineVetPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
    <ThemeProvider>
        <AuthProvider>
            <HashRouter>
                <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                <Header />
                <main className="flex-grow">
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/adopt" element={<AdoptPage />} />
                    <Route path="/adopt/:id" element={<AnimalDetailPage />} />
                    <Route path="/report" element={<ReportPage />} />
                    <Route path="/ai-assistant" element={<AIAssistantPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/online-vet" element={<OnlineVetPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    </Routes>
                </main>
                <Footer />
                </div>
            </HashRouter>
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;