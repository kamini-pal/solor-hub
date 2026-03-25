import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

export const triggerQuotePopup = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('openQuotePopup'));
  }
};

export default function AutoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show organic popup only once per session
    if (typeof window !== 'undefined' && !sessionStorage.getItem('popupShown')) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('popupShown', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openQuotePopup', handleOpen);
    
    return () => {
      window.removeEventListener('openQuotePopup', handleOpen);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-effect border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.15)] overflow-hidden"
          >
            {/* Glow decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-bold mb-2">Get Your <span className="text-glow-primary text-primary">Free Quote</span></h2>
            <p className="text-gray-400 mb-8 max-w-sm">Lock in the best solar rates today. Our engineers are ready to design your custom premium system.</p>

            <form className="space-y-4 relative z-10" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
              <input 
                type="text" 
                placeholder="Name" 
                required
                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                required
                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] group"
              >
                <span>Request Quote</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
