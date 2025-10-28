import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MenuIcon, CloseIcon } from './icons';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const activeLinkClass = 'text-orange-600 dark:text-orange-400 font-semibold';
  const inactiveLinkClass = 'text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400';
  
  const MobileNavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
        to={to} 
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) => `block py-3 text-2xl text-center ${isActive ? 'text-orange-500 font-bold' : 'text-slate-700 dark:text-slate-200 font-medium'}`}
    >
        {children}
    </NavLink>
  );

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-900/80 shadow-sm sticky top-0 z-20 backdrop-blur-lg">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <Logo className="h-10 w-auto"/>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6 text-base font-medium">
              <li><NavLink to="/" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Home</NavLink></li>
              <li><NavLink to="/adopt" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Adopt</NavLink></li>
              <li><NavLink to="/report" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Report Rescue</NavLink></li>
              <li><NavLink to="/community" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Community</NavLink></li>
              <li><NavLink to="/online-vet" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Online Vet</NavLink></li>
              <li><NavLink to="/ai-assistant" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>AI Assistant</NavLink></li>
            </ul>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-orange-600 transition-colors">
                  Logout
                </button>
              ) : (
                <NavLink to="/login" className="bg-orange-500 text-white font-bold py-2 px-5 rounded-md text-sm hover:bg-orange-600 transition-colors">
                  Login
                </NavLink>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
             <ThemeToggle />
            <button onClick={() => setIsMenuOpen(true)} className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400">
              <MenuIcon className="w-8 h-8" />
            </button>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white dark:bg-slate-900 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
           <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <Logo className="h-10 w-auto"/>
          </NavLink>
          <button onClick={() => setIsMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400">
            <CloseIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center h-full -mt-16">
            <nav className="flex flex-col space-y-6 text-center">
                <MobileNavLink to="/">Home</MobileNavLink>
                <MobileNavLink to="/adopt">Adopt</MobileNavLink>
                <MobileNavLink to="/report">Report Rescue</MobileNavLink>
                <MobileNavLink to="/community">Community</MobileNavLink>
                <MobileNavLink to="/online-vet">Online Vet</MobileNavLink>
                <MobileNavLink to="/ai-assistant">AI Assistant</MobileNavLink>
                <div className="mt-8">
                  {isAuthenticated ? (
                     <button 
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                        className="bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-xl"
                      >
                       Logout
                     </button>
                  ) : (
                      <NavLink 
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-xl"
                      >
                       Login / Sign Up
                     </NavLink>
                  )}
                </div>
            </nav>
        </div>
      </div>
    </>
  );
};

export default Header;