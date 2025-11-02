import React, { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'kuttawaala_cookie_consent';

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consentValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consentValue) {
        // No choice has been made yet, show the banner after a short delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500); // Delay to let the page load
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Could not read from localStorage", error);
      // If we can't read, default to showing the banner to be safe.
      const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (consent: 'accepted' | 'declined') => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
      setIsVisible(false);
    } catch (error) {
      console.error("Could not write to localStorage", error);
      // Still hide banner even if write fails, to not block user
      setIsVisible(false);
    }
  };


  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent Banner"
      hidden={!isVisible}
    >
      <div className="container mx-auto max-w-4xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-800 dark:text-slate-200 text-center md:text-left flex-grow">
          We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
        </p>
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => handleConsent('declined')}
            className="font-bold py-2 px-6 rounded-full text-sm bg-slate-200/70 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 hover:bg-slate-300/80 dark:hover:bg-slate-600/80 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full text-sm hover:bg-orange-600 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;