import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { MenuIcon, CloseIcon, SearchIcon, ChevronDownIcon, UserIcon, GlobeIcon } from './icons';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import SearchModal from './SearchModal';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const { currentUser, isAuthenticated, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const userDropdownRef = useRef<HTMLLIElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = useCallback(() => {
    logout();
    setIsUserDropdownOpen(false);
    navigate('/');
  }, [logout, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLinkClass = 'text-orange-600 dark:text-orange-400 font-semibold';
  const inactiveLinkClass = 'text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400';
  
  const MobileNavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
        to={to} 
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) => `block py-2 text-xl text-center ${isActive ? 'text-orange-500 font-bold' : 'text-slate-800 dark:text-slate-100 font-medium'}`}
    >
        {children}
    </NavLink>
  );

  return (
    <>
      <header className="bg-white/50 dark:bg-slate-900/60 shadow-lg sticky top-0 z-20 backdrop-blur-xl border-b border-white/30 dark:border-slate-700">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <Logo className="h-10 w-auto"/>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6 text-base font-medium">
              <li><NavLink to="/" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>{t('nav.home')}</NavLink></li>
              <li><NavLink to="/adopt" className={({ isActive }) => (isActive || location.pathname.startsWith('/adopt') || location.pathname === '/quiz' ? activeLinkClass : inactiveLinkClass)}>{t('nav.adopt')}</NavLink></li>
              <li><NavLink to="/report" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>{t('nav.report')}</NavLink></li>
              <li><NavLink to="/community" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>{t('nav.community')}</NavLink></li>
              <li><NavLink to="/find-vet" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>{t('nav.findVet')}</NavLink></li>
              <li><NavLink to="/ai-assistant" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>{t('nav.aiVet')}</NavLink></li>
              {/* More Dropdown */}
              <li className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                  className={`${inactiveLinkClass} flex items-center`}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  aria-controls="more-dropdown"
                >
                  {t('nav.more')} <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                   <div id="more-dropdown" className="absolute right-0 mt-3 w-48 bg-white/60 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/30 dark:border-slate-700 rounded-lg shadow-xl py-2 z-30">
                     <NavLink to="/volunteer" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-orange-500/20">{t('nav.volunteer')}</NavLink>
                     <NavLink to="/memorial" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-orange-500/20">{t('nav.memorial')}</NavLink>
                   </div>
                )}
              </li>
            </ul>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-slate-800 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label={t('buttons.search')}
              >
                  <SearchIcon className="w-6 h-6" />
              </button>
              
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="p-2 rounded-full text-slate-800 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  aria-haspopup="true"
                  aria-expanded={isLangDropdownOpen}
                  aria-controls="lang-dropdown"
                  aria-label="Change language"
                >
                  <GlobeIcon className="w-6 h-6" />
                </button>
                {isLangDropdownOpen && (
                  <div id="lang-dropdown" className="absolute right-0 mt-3 w-32 bg-white/60 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/30 dark:border-slate-700 rounded-lg shadow-xl py-2 z-30">
                    <button onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-orange-500/20 ${language === 'en' ? 'font-bold' : ''}`}>English</button>
                    <button onClick={() => { setLanguage('bn'); setIsLangDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-orange-500/20 ${language === 'bn' ? 'font-bold' : ''}`}>বাংলা</button>
                  </div>
                )}
              </div>
              
              <ThemeToggle />

              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
              {isAuthenticated ? (
                <li className="relative list-none" ref={userDropdownRef}>
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} 
                    className={`${inactiveLinkClass} flex items-center p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50`}
                    aria-haspopup="true"
                    aria-expanded={isUserDropdownOpen}
                    aria-controls="user-dropdown"
                  >
                    <UserIcon className="w-6 h-6 mr-2"/> {currentUser?.name.split(' ')[0]} <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isUserDropdownOpen && (
                     <div id="user-dropdown" className="absolute right-0 mt-3 w-48 bg-white/60 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/30 dark:border-slate-700 rounded-lg shadow-xl py-2 z-30">
                       <Link to="/dashboard" onClick={() => setIsUserDropdownOpen(false)} className="block px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-orange-500/20">{t('nav.dashboard')}</Link>
                       <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-orange-500/20">{t('nav.logout')}</button>
                     </div>
                  )}
                </li>
              ) : (
                <NavLink to="/login" className="bg-orange-500 text-white font-bold py-2 px-5 rounded-md text-sm hover:bg-orange-600 transition-colors">
                  {t('nav.login')}
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-slate-800 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50"
                aria-label={t('buttons.search')}
              >
                  <SearchIcon className="w-6 h-6" />
            </button>
             <ThemeToggle />
            <button onClick={() => setIsMenuOpen(true)} className="text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400" aria-label="Open menu">
              <MenuIcon className="w-8 h-8" />
            </button>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/60 dark:bg-slate-900/70 backdrop-blur-2xl z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
           <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <Logo className="h-10 w-auto"/>
          </NavLink>
          <button onClick={() => setIsMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400">
            <CloseIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center h-full -mt-16 overflow-y-auto">
            <nav className="flex flex-col space-y-4 text-center">
                {isAuthenticated && <MobileNavLink to="/dashboard">{t('nav.dashboard')}</MobileNavLink>}
                <MobileNavLink to="/">{t('nav.home')}</MobileNavLink>
                <MobileNavLink to="/adopt">{t('nav.adopt')}</MobileNavLink>
                <MobileNavLink to="/report">{t('nav.report')}</MobileNavLink>
                <MobileNavLink to="/community">{t('nav.community')}</MobileNavLink>
                <MobileNavLink to="/find-vet">{t('nav.findVet')}</MobileNavLink>
                <MobileNavLink to="/ai-assistant">{t('nav.aiVet')}</MobileNavLink>
                <MobileNavLink to="/volunteer">{t('nav.volunteer')}</MobileNavLink>
                <MobileNavLink to="/memorial">{t('nav.memorial')}</MobileNavLink>
                
                 <div className="mt-4 flex justify-center gap-4">
                    <button onClick={() => { setLanguage('en'); }} className={`px-4 py-2 rounded-full ${language === 'en' ? 'bg-orange-500 text-white' : 'bg-white/30 dark:bg-slate-800/50'}`}>English</button>
                    <button onClick={() => { setLanguage('bn'); }} className={`px-4 py-2 rounded-full ${language === 'bn' ? 'bg-orange-500 text-white' : 'bg-white/30 dark:bg-slate-800/50'}`}>বাংলা</button>
                 </div>

                <div className="mt-6">
                  {isAuthenticated ? (
                     <button 
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                        className="bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-xl"
                      >
                       {t('nav.logout')}
                     </button>
                  ) : (
                      <NavLink 
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-xl"
                      >
                       {t('nav.login')} / Sign Up
                     </NavLink>
                  )}
                </div>
            </nav>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;