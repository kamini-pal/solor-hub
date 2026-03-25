import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';
import { triggerQuotePopup } from './AutoPopup';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = ['Home', 'Services', 'Products', 'Gallery', 'About', 'Contact'];

  const handleHashRouting = (e, itemPath, itemId) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(itemPath);
    } else {
      const target = document.getElementById(itemId);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 glass-effect backdrop-blur-md bg-[#060B14]/80 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 cursor-pointer">
            <Logo />
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isPage = item === 'Home' || item === 'Products' || item === 'Contact' || item === 'Services' || item === 'Gallery';
              const path = isPage ? (item === 'Home' ? '/' : `/${item.toLowerCase()}`) : `/#${item.toLowerCase()}`;
              
              return isPage ? (
                <Link
                  key={item}
                  to={path}
                  className="text-gray-300 hover:text-primary transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium hover:text-glow-primary"
                >
                  {item}
                </Link>
              ) : (
                <a
                  key={item}
                  href={path}
                  onClick={(e) => handleHashRouting(e, path, item.toLowerCase())}
                  className="text-gray-300 hover:text-primary transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium hover:text-glow-primary"
                >
                  {item}
                </a>
              );
            })}
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button 
              onClick={triggerQuotePopup}
              className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] font-medium py-2 px-6 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary transition-colors focus:outline-none p-2"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-white/5 bg-dark/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 pt-4 pb-6 space-y-2 flex flex-col shadow-inner">
              {navItems.map((item) => {
                const isPage = item === 'Home' || item === 'Products' || item === 'Contact' || item === 'Services' || item === 'Gallery';
                const path = isPage ? (item === 'Home' ? '/' : `/${item.toLowerCase()}`) : `/#${item.toLowerCase()}`;
                
                return isPage ? (
                  <Link
                    key={item}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:text-primary hover:bg-white/5 block px-4 py-3 rounded-xl text-base font-medium transition-all"
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    key={item}
                    href={path}
                    onClick={(e) => handleHashRouting(e, path, item.toLowerCase())}
                    className="text-gray-300 hover:text-primary hover:bg-white/5 block px-4 py-3 rounded-xl text-base font-medium transition-all"
                  >
                    {item}
                  </a>
                );
              })}
              <button 
                onClick={() => {
                  setIsOpen(false);
                  triggerQuotePopup();
                }}
                className="mt-4 w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] font-bold py-3 px-6 rounded-xl transition-all"
              >
                Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
