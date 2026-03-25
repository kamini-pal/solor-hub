import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      if (db.app.options.apiKey === "YOUR_API_KEY") {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const prods = [];
        snapshot.forEach(doc => prods.push({ id: doc.id, ...doc.data() }));
        setProducts(prods);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const displayedProducts = showAll ? products : products.slice(0, 6);

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-dark">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/bg.jpeg" alt="Solar BG" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B14] via-transparent to-[#060B14] z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-glow-primary text-primary">Products</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Engineered for maximum power generation and stunning aesthetics. High-performance solar tech for every need.
            </p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-primary hover:text-green-300 transition-colors group cursor-pointer"
          >
            <span>{showAll ? 'Show Featured Only' : 'View All Products'}</span>
            <ArrowRight className={`w-5 h-5 transition-transform ${showAll ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
          </motion.button>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
             <div className="col-span-full flex flex-col items-center justify-center p-12 text-primary">
               <Loader2 className="w-8 h-8 animate-spin" />
             </div>
          ) : (
            <AnimatePresence>
              {displayedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: idx * 0.15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass-effect rounded-2xl border border-white/5 overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-transparent group-hover:bg-dark/10 transition-colors duration-500 z-10 pointer-events-none" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-dark/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-gray-300">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Power Output</p>
                    <p className="font-semibold text-gray-200">{product.power}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Efficiency</p>
                    <p className="font-semibold text-gray-200">{product.efficiency}</p>
                  </div>
                </div>
              </div>
            </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
