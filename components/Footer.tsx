import React from 'react';
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
        <div className="mb-6">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 uppercase tracking-wider text-sm">Contact Us</h3>
            <a href="mailto:kuttawaala@gmail.com" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors">
              kuttawaala@gmail.com
            </a>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center">
          &copy; {new Date().getFullYear()} KUTTAWAALA. Made with <HeartIcon className="w-4 h-4 mx-1.5 text-red-500" /> for our furry friends.
        </p>
      </div>
    </footer>
  );
};

export default Footer;