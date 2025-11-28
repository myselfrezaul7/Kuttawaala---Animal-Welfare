import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, FacebookIcon, InstagramIcon, YouTubeIcon, TikTokIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-white/50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 py-10 mt-auto backdrop-blur-xl border-t border-white/30 dark:border-slate-700">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-6">
          {t('footer.tagline')}
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://www.facebook.com/kuttawaalaa/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            <FacebookIcon className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/kutta_waala/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a href="https://youtube.com/@kuttawaala" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            <YouTubeIcon className="w-6 h-6" />
          </a>
          <a href="https://www.tiktok.com/@kuttawaala" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            <TikTokIcon className="w-6 h-6" />
          </a>
        </div>
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8">
            <Link to="/adopt" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">{t('nav.adopt')}</Link>
            <Link to="/volunteer" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">{t('nav.volunteer')}</Link>
            <Link to="/memorial" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">{t('nav.memorial')}</Link>
            <Link to="/faq" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">FAQ</Link>
            <a href="mailto:kuttawaala@gmail.com" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">{t('footer.contact')}</a>
        </nav>
        <div className="border-t border-white/20 dark:border-slate-700 max-w-xs mx-auto my-6"></div>
         <p className="text-slate-700 dark:text-slate-300">
            {t('footer.inquiries')}<br/>
            <a href="mailto:kuttawaala@gmail.com" className="font-semibold text-orange-600 dark:text-orange-400 hover:underline">kuttawaala@gmail.com</a>
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-8">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);