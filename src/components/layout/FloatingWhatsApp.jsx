import { motion } from 'framer-motion';
import WhatsAppIcon from '../ui/WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/919559201288"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-primary/20 backdrop-blur-md border border-primary/50 text-green-400 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] group"
    >
      <WhatsAppIcon className="w-8 h-8 group-hover:-rotate-12 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
      <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
    </motion.a>
  );
}
