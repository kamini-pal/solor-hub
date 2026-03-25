import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function GalleryPreview() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="text-glow-accent text-accent">Installations</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See the beautiful integration of our premium solar panels in modern homes and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center p-24 text-accent">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="text-gray-400">Loading dynamic gallery assets...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="col-span-full text-center p-12 glass-effect rounded-2xl border border-white/5">
              <p className="text-gray-400">No installation photos uploaded yet. Coming soon!</p>
            </div>
          ) : (
            images.slice(0, 7).map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                  index % 4 === 0 || index === 5 ? 'md:col-span-2 md:row-span-2 h-64 md:h-[500px]' : 'h-48 md:h-[240px]'
                }`}
              >
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-500 z-10 pointer-events-none" />
                <img 
                  src={img.url} 
                  alt={img.title || `Installation ${index + 1}`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <div className="bg-dark/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center">
                    <span className="text-white text-sm font-bold block mb-1">{img.title || "View Details"}</span>
                    {img.description && <span className="text-xs text-gray-400 max-w-[200px] line-clamp-2 block mx-auto">{img.description}</span>}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
