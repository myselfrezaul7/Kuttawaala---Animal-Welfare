import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon, CloseIcon } from './icons';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLinkClass = 'text-orange-600 font-semibold';
  const inactiveLinkClass = 'text-slate-600 hover:text-orange-600';
  
  const MobileNavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
        to={to} 
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) => `block py-3 text-2xl text-center ${isActive ? 'text-orange-500 font-bold' : 'text-slate-700 font-medium'}`}
    >
        {children}
    </NavLink>
  );

  return (
    <>
      <header className="bg-white/80 shadow-sm sticky top-0 z-20 backdrop-blur-lg">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <Logo className="h-10 w-auto"/>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8 text-base font-medium">
              <li><NavLink to="/" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Home</NavLink></li>
              <li><NavLink to="/adopt" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Adopt</NavLink></li>
              <li><NavLink to="/report" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Report Rescue</NavLink></li>
              <li><NavLink to="/ai-assistant" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>AI Assistant</NavLink></li>
              <li><NavLink to="/faq" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>FAQ</NavLink></li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-slate-700 hover:text-orange-600">
              <MenuIcon className="w-8 h-8" />
            </button>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
           <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <Logo className="h-10 w-auto"/>
          </NavLink>
          <button onClick={() => setIsMenuOpen(false)} className="text-slate-700 hover:text-orange-600">
            <CloseIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center h-full -mt-16">
            <nav className="flex flex-col space-y-6">
                <MobileNavLink to="/">Home</MobileNavLink>
                <MobileNavLink to="/adopt">Adopt</MobileNavLink>
                <MobileNavLink to="/report">Report Rescue</MobileNavLink>
                <MobileNavLink to="/ai-assistant">AI Assistant</MobileNavLink>
                <MobileNavLink to="/faq">FAQ</MobileNavLink>
            </nav>
        </div>
      </div>
    </>
  );
};

export default Header;