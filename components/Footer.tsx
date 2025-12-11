import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, YouTubeIcon, TikTokIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { href: "https://www.facebook.com/kuttawaala/", label: "Facebook", Icon: FacebookIcon },
    { href: "https://www.instagram.com/kutta_waala/", label: "Instagram", Icon: InstagramIcon },
    { href: "https://youtube.com/@kuttawaala", label: "YouTube", Icon: YouTubeIcon },
    { href: "https://www.tiktok.com/@kuttawaala", label: "TikTok", Icon: TikTokIcon },
  ];

  return (
    <footer className="mt-auto pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-xl">
            <div className="text-center">
                <p className="text-2xl italic text-slate-600 dark:text-slate-300 mb-8 font-light font-serif">
                {t('footer.tagline')}
                </p>
                <div className="flex justify-center space-x-6 mb-8">
                {socialLinks.map(({ href, label, Icon }) => (
                    <a 
                    key={label}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={label} 
                    className="p-3 bg-white/50 dark:bg-white/5 rounded-full hover:bg-white dark:hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-sm"
                    >
                    <Icon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                    </a>
                ))}
                </div>
                <nav className="flex justify-center flex-wrap gap-x-8 gap-y-3 mb-8 text-sm uppercase tracking-wide font-bold text-slate-700 dark:text-slate-300">
                    <Link to="/adopt" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('nav.adopt')}</Link>
                    <Link to="/volunteer" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('nav.volunteer')}</Link>
                    <Link to="/memorial" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('nav.memorial')}</Link>
                    <Link to="/faq" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">FAQ</Link>
                    <a href="mailto:kuttawaala@gmail.com" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">{t('footer.contact')}</a>
                </nav>
                <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent my-8"></div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                    {t('footer.inquiries')} <a href="mailto:kuttawaala@gmail.com" className="font-semibold text-slate-800 dark:text-slate-200 hover:underline">kuttawaala@gmail.com</a>
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                {t('footer.copyright', { year: new Date().getFullYear() })}
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);