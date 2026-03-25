import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function AdminDeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="bg-[#0A0F1C] border border-red-500/20 rounded-3xl p-6 md:p-8 w-full max-w-md relative z-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{title || "Confirm Deletion"}</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                {message || "Are you sure you want to permanently delete this item? This action cannot be undone."}
              </p>
              
              <div className="flex gap-4 w-full">
                <button 
                  onClick={onClose} 
                  className="flex-1 py-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { onConfirm(); onClose(); }} 
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
