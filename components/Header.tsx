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
  const [scrolled, setScrolled] = useState(false);

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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const activeLinkClass = 'text-orange-600 dark:text-orange-400 font-bold bg-white/20 dark:bg-white/10 rounded-full px-3 py-1';
  const inactiveLinkClass = 'text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors duration-200 px-3 py-1';
  
  const MobileNavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
        to={to} 
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) => `block py-3 text-2xl text-center transition-colors duration-300 ${isActive ? 'text-orange-500 font-bold' : 'text-slate-800 dark:text-slate-100 font-medium hover:text-orange-500'}`}
    >
        {children}
    </NavLink>
  );

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out px-4 sm:px-6 ${
            scrolled 
            ? 'py-3' 
            : 'py-6'
        }`}
      >
        <div className={`mx-auto max-w-7xl rounded-full transition-all duration-500 ${
            scrolled 
             ? 'bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-lg px-6 py-2' 
             : 'bg-transparent px-2'
        }`}>
            <nav className="flex justify-between items-center">
              <NavLink to="/" onClick={handleLogoClick} className="flex items-center group pl-2">
                <Logo className="h-8 sm:h-9 w-auto transform transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"/>
              </NavLink>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-2">
                <ul className="flex items-center space-x-1 text-sm tracking-wide">
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
                      className={`${inactiveLinkClass} flex items-center focus:outline-none`}
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                    >
                      {t('nav.more')} <ChevronDownIcon className={`w-3 h-3 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute right-0 mt-6 w-48 bg-white/70 dark:bg-black/70 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden transition-all duration-200 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                        <NavLink to="/volunteer" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-slate-800 dark:text-slate-100 hover:bg-white/20 dark:hover:bg-white/10 hover:text-orange-600 transition-colors">{t('nav.volunteer')}</NavLink>
                        <NavLink to="/memorial" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-slate-800 dark:text-slate-100 hover:bg-white/20 dark:hover:bg-white/10 hover:text-orange-600 transition-colors">{t('nav.memorial')}</NavLink>
                    </div>
                  </li>
                </ul>
                
                <div className="h-6 w-px bg-slate-300 dark:bg-white/20 mx-4"></div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
                    aria-label={t('buttons.search')}
                  >
                      <SearchIcon className="w-5 h-5" />
                  </button>
                  
                  <div className="relative" ref={langDropdownRef}>
                    <button
                      onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                      className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
                      aria-label="Change language"
                    >
                      <GlobeIcon className="w-5 h-5" />
                    </button>
                    <div className={`absolute right-0 mt-6 w-32 bg-white/70 dark:bg-black/70 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden transition-all duration-200 origin-top-right ${isLangDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                        <button onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-orange-600 font-bold bg-white/30 dark:bg-white/10' : 'text-slate-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/5'}`}>English</button>
                        <button onClick={() => { setLanguage('bn'); setIsLangDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm ${language === 'bn' ? 'text-orange-600 font-bold bg-white/30 dark:bg-white/10' : 'text-slate-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/5'}`}>বাংলা</button>
                    </div>
                  </div>
                  
                  <ThemeToggle />

                  {isAuthenticated ? (
                    <li className="relative list-none ml-2" ref={userDropdownRef}>
                      <button 
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} 
                        className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 transition-all border border-white/10"
                      >
                        <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-300">
                            <UserIcon className="w-4 h-4"/>
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 pr-1">{currentUser?.name.split(' ')[0]}</span>
                        <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`absolute right-0 mt-6 w-48 bg-white/70 dark:bg-black/70 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden transition-all duration-200 origin-top-right ${isUserDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                          <Link to="/dashboard" onClick={() => setIsUserDropdownOpen(false)} className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 hover:text-orange-600 transition-colors">{t('nav.dashboard')}</Link>
                          <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 hover:text-orange-600 transition-colors">{t('nav.logout')}</button>
                      </div>
                    </li>
                  ) : (
                    <NavLink to="/login" className="ml-2 bg-orange-500 text-white font-bold py-2 px-6 rounded-full text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 transform hover:scale-105 active:scale-95">
                      {t('nav.login')}
                    </NavLink>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-2">
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-full text-slate-800 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10"
                >
                    <SearchIcon className="w-5 h-5" />
                </button>
                <ThemeToggle />
                <button 
                    onClick={() => setIsMenuOpen(true)} 
                    className="text-slate-800 dark:text-slate-200 p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10" 
                    aria-label="Open menu"
                >
                  <MenuIcon className="w-7 h-7" />
                </button>
              </div>
            </nav>
        </div>
      </header>
      
      {/* Mobile Menu Overlay - Ultra Glass */}
      <div className={`fixed inset-0 bg-white/60 dark:bg-slate-900/80 backdrop-blur-3xl z-50 transition-all duration-500 ease-in-out flex flex-col ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="container mx-auto px-4 sm:px-6 py-6 flex justify-between items-center">
           <NavLink to="/" onClick={(e) => { handleLogoClick(e); setIsMenuOpen(false); }} className="flex items-center">
            <Logo className="h-8 w-auto"/>
          </NavLink>
          <button onClick={() => setIsMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors p-2 bg-white/20 dark:bg-white/10 rounded-full">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center overflow-y-auto pb-20 px-6">
            <nav className="flex flex-col space-y-1 text-center w-full max-w-sm">
                {isAuthenticated && <MobileNavLink to="/dashboard">{t('nav.dashboard')}</MobileNavLink>}
                <MobileNavLink to="/">{t('nav.home')}</MobileNavLink>
                <MobileNavLink to="/adopt">{t('nav.adopt')}</MobileNavLink>
                <MobileNavLink to="/report">{t('nav.report')}</MobileNavLink>
                <MobileNavLink to="/community">{t('nav.community')}</MobileNavLink>
                <MobileNavLink to="/find-vet">{t('nav.findVet')}</MobileNavLink>
                <MobileNavLink to="/ai-assistant">{t('nav.aiVet')}</MobileNavLink>
                <MobileNavLink to="/volunteer">{t('nav.volunteer')}</MobileNavLink>
                <MobileNavLink to="/memorial">{t('nav.memorial')}</MobileNavLink>
                
                 <div className="mt-8 flex justify-center gap-4 bg-white/20 dark:bg-white/10 p-2 rounded-full mx-auto w-fit backdrop-blur-md">
                    <button onClick={() => { setLanguage('en'); }} className={`px-6 py-2 rounded-full transition-all ${language === 'en' ? 'bg-white/80 dark:bg-slate-700 shadow-md font-bold text-orange-600' : 'text-slate-600 dark:text-slate-400'}`}>EN</button>
                    <button onClick={() => { setLanguage('bn'); }} className={`px-6 py-2 rounded-full transition-all ${language === 'bn' ? 'bg-white/80 dark:bg-slate-700 shadow-md font-bold text-orange-600' : 'text-slate-600 dark:text-slate-400'}`}>BN</button>
                 </div>

                <div className="mt-10 w-full">
                  {isAuthenticated ? (
                     <button 
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                        className="w-full bg-white/30 dark:bg-white/10 text-slate-900 dark:text-white font-bold py-4 rounded-2xl text-lg hover:bg-red-500/20 hover:text-red-600 transition-colors border border-white/20"
                      >
                       {t('nav.logout')}
                     </button>
                  ) : (
                      <NavLink 
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full bg-orange-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-orange-500/30"
                      >
                       {t('nav.login')}
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