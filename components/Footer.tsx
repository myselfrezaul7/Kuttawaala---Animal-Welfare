import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, FacebookIcon, InstagramIcon, YouTubeIcon, TikTokIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/10 dark:bg-black/20 text-slate-800 dark:text-slate-200 py-10 mt-auto backdrop-blur-lg border-t border-white/30 dark:border-white/10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-6">
          "There's a SHADE for every animals."
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
            <Link to="/adopt" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Adopt</Link>
            <Link to="/volunteer" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Volunteer</Link>
            <Link to="/memorial" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Memorial Wall</Link>
            <Link to="/faq" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">FAQ</Link>
            <a href="mailto:kuttawaala@gmail.com" className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">Contact Us</a>
        </nav>
        <div className="border-t border-white/20 dark:border-white/10 max-w-xs mx-auto my-6"></div>
         <p className="text-slate-700 dark:text-slate-300">
            For inquiries, please email us at:<br/>
            <a href="mailto:kuttawaala@gmail.com" className="font-semibold text-orange-600 dark:text-orange-400 hover:underline">kuttawaala@gmail.com</a>
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-8">
          &copy; {new Date().getFullYear()} KUTTAWAALA.
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);