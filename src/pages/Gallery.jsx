import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Loader2, X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    async function fetchGallery() {
      if (db.app.options.apiKey === "YOUR_API_KEY") {
        setLoading(false); return;
      }
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const imgs = [];
        snapshot.forEach(doc => imgs.push({ id: doc.id, ...doc.data() }));
        setImages(imgs);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#060B14]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Installation <span className="text-glow-primary text-primary">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Explore our portfolio of cutting-edge solar installations and setups across residential and commercial properties.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             <div className="col-span-full flex flex-col items-center justify-center p-24 text-primary">
               <Loader2 className="w-10 h-10 animate-spin mb-4" />
               <p className="text-gray-400">Loading gallery assets...</p>
             </div>
          ) : images.length === 0 ? (
            <div className="col-span-full text-center p-12 glass-effect rounded-2xl border border-white/5">
              <p className="text-gray-400">No installation photos uploaded yet. Coming soon!</p>
            </div>
          ) : (
            images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="relative overflow-hidden rounded-2xl group cursor-pointer glass-effect border border-white/5 h-[300px]"
                onClick={() => setSelectedImage(img)}
              >
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors duration-500 z-10 pointer-events-none" />
                <img 
                  src={img.url} 
                  alt={img.title || "Solar installation"} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-full border border-primary/50 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-shadow">
                    <ZoomIn className="w-8 h-8" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#060B14] to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-xl drop-shadow-md truncate">{img.title}</h3>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[#060B14]/95 backdrop-blur-md" 
              onClick={() => { setSelectedImage(null); setIsZoomed(false); }} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative z-10 w-full max-w-6xl max-h-full flex flex-col items-center justify-center pointer-events-none"
            >
              <button 
                onClick={() => { setSelectedImage(null); setIsZoomed(false); }} 
                className="absolute top-4 right-4 md:-top-12 md:-right-12 text-gray-400 hover:text-white transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md pointer-events-auto hover:bg-white/20 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div 
                className={`relative group w-full flex justify-center items-center overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto bg-[#0A0F1C] ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <motion.img 
                  animate={{ scale: isZoomed ? 2.5 : 1 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="max-h-[75vh] w-auto max-w-full object-contain origin-center"
                />
              </div>
              
              {(selectedImage.title || selectedImage.description) && (
                <div className="mt-6 text-center max-w-2xl bg-[#0A0F1C]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 pointer-events-auto">
                  {selectedImage.title && <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>}
                  {selectedImage.description && (
                    <p className="text-gray-400">{selectedImage.description}</p>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
