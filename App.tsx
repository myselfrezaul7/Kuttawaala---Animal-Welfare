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

function App() {
  return (
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/adopt" element={<AdoptPage />} />
              <Route path="/adopt/:id" element={<AnimalDetailPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
  );
}

export default App;