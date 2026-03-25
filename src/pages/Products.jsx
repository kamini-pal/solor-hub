import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { triggerQuotePopup } from '../components/layout/AutoPopup';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function Products() {
  const [activeTab, setActiveTab] = useState("All Products");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All Products"]);

  useEffect(() => {
    async function fetchProducts() {
      if (db.app.options.apiKey === "YOUR_API_KEY") {
        setAllProducts([]);
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const prods = [];
        const uniqueCategories = new Set();
        snapshot.forEach(doc => {
          const data = doc.data();
          prods.push({ id: doc.id, ...data });
          if (data.category) uniqueCategories.add(data.category);
        });
        setAllProducts(prods);
        setCategories(["All Products", ...Array.from(uniqueCategories)]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = activeTab === "All Products" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeTab);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      {/* Featured Product Section matching the top part of the mockup */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="glass-effect rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden group">
          {/* Subtle glow behind featured product */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 bg-dark/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-gray-300 mb-4">
                Featured Product
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Max <span className="text-glow-primary text-primary">500W</span>
              </h1>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>500 Watt High-Efficiency Output</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>Monocrystalline PERC Technology</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>Usage: Rooftop / Residential / Commercial</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={triggerQuotePopup}
                  className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.7)]"
                >
                  GET QUOTE
                </button>
                <Link to="/products/1" className="glass-effect hover:bg-white/10 text-white border border-white/20 font-medium py-3 px-8 rounded-full transition-all text-center">
                  More Details
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative perspective-[1000px] flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0], rotateY: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-md h-80 rounded-2xl overflow-hidden glass-effect border border-white/10 p-2 shadow-[0_0_50px_rgba(34,197,94,0.1)] relative"
              >
                <img src="/solor1.jpg" alt="Solar Max 500W" className="w-full h-full object-cover rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay rounded-xl z-20" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Tabs and Product Grid matching the bottom part of the mockup */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <h2 className="text-3xl font-bold">All <span className="text-glow-accent text-accent">Products</span></h2>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center bg-dark/50 p-1.5 rounded-full border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === cat 
                    ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
              {loading ? (
                <div className="col-span-full flex flex-col items-center justify-center p-24 text-primary">
                  <Loader2 className="w-12 h-12 animate-spin mb-4" />
                  <p className="text-gray-400">Loading catalog securely from Firebase...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full text-center p-24">
                  <p className="text-gray-400">No products available in this category.</p>
                </div>
              ) : filteredProducts.map((product, idx) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-effect rounded-2xl border border-white/5 overflow-hidden group hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_15px_30px_rgba(34,197,94,0.15)] transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-transparent group-hover:bg-dark/10 transition-colors duration-500 z-10 pointer-events-none" />
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.tag && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/50 rounded-full text-xs font-medium text-accent shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                        {product.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 z-20">
                    <span className="px-3 py-1 bg-dark/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-gray-200">
                      {product.power}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-6">{product.category}</p>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={triggerQuotePopup}
                      className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 text-sm font-bold py-2.5 rounded-xl transition-all shadow-[0_0_10px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                    >
                      Get Quote
                    </button>
                    <Link to={`/products/${product.id}`} className="px-4 py-2.5 glass-effect hover:bg-white/10 text-gray-300 border border-white/20 rounded-xl transition-all flex justify-center items-center">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
