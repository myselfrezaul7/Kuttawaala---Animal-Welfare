import React from 'react';
import { HeartIcon, FacebookIcon, InstagramIcon, YouTubeIcon, TikTokIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-100 text-slate-700 py-10 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg italic text-slate-600 mb-6">
          "There's a SHADE for every animals."
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://www.facebook.com/kuttawaalaa/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-pink-700 hover:text-pink-900 transition-colors">
            <FacebookIcon className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/kutta_waala/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-700 hover:text-pink-900 transition-colors">
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a href="https://youtube.com/@kuttawaala" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-pink-700 hover:text-pink-900 transition-colors">
            <YouTubeIcon className="w-6 h-6" />
          </a>
          <a href="https://www.tiktok.com/@kuttawaala" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-pink-700 hover:text-pink-900 transition-colors">
            <TikTokIcon className="w-6 h-6" />
          </a>
        </div>
        <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-2 uppercase tracking-wider text-sm">Contact Us</h3>
            <a href="mailto:kuttawaala@gmail.com" className="text-pink-600 hover:text-pink-800 font-medium transition-colors">
              kuttawaala@gmail.com
            </a>
        </div>
        <p className="text-sm text-slate-500 flex items-center justify-center">
          &copy; {new Date().getFullYear()} KUTTAWAALA. Made with <HeartIcon className="w-4 h-4 mx-1.5 text-red-500" /> for our furry friends.
        </p>
      </div>
    </footer>
  );
};

export default Footer;