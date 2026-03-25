import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Zap, Battery, Sun, Shield, Settings, Info } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { triggerQuotePopup } from '../components/layout/AutoPopup';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Static Fallback Data for 'Solar Max 500W' as requested
  const staticFallback = {
    name: "Solar Max 500W",
    category: "Monocrystalline Solar Panel",
    price: "₹15,000",
    power: "500W",
    efficiency: "22.5%",
    warranty: "25 Years Performance Warranty",
    type: "Monocrystalline PERC",
    description: "The Solar Max 500W represents the pinnacle of residential and commercial solar energy harvesting. Engineered with high-transmittance tempered glass and multi-busbar technology, it ensures exceptional power yield even in low-light/cloudy conditions. Its rugged anodized aluminum frame guarantees severe weather resistance, making it an ideal lifetime investment for your energy independence.",
    image: "/solor1.jpg"
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (db.app.options.apiKey !== "YOUR_API_KEY" && id !== "1") {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch product, falling back to static", err);
      }
      // Fallback
      setProduct(staticFallback);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen pt-32 pb-24 text-center text-primary">Loading Product Specifications...</div>;
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#060B14]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Product Imagery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-3xl overflow-hidden glass-effect border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.1)] group p-4"
          >
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img 
                src={product.image || staticFallback.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Right: Product Meta Data */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-bold text-primary mb-6 w-fit backdrop-blur-md">
              {product.category || staticFallback.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="text-3xl font-bold text-white mb-8 flex items-end gap-2">
              <span className="text-accent">{product.price || staticFallback.price}</span>
              <span className="text-sm font-medium text-gray-500 mb-1">/ unit</span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {product.description || staticFallback.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="glass-effect p-4 border border-white/5 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl"><Zap className="w-6 h-6 text-primary" /></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Output / Power</p>
                  <p className="text-white font-bold">{product.power || staticFallback.power}</p>
                </div>
              </div>
              <div className="glass-effect p-4 border border-white/5 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl"><Sun className="w-6 h-6 text-accent" /></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Efficiency</p>
                  <p className="text-white font-bold">{product.efficiency || staticFallback.efficiency}</p>
                </div>
              </div>
              <div className="glass-effect p-4 border border-white/5 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl"><Shield className="w-6 h-6 text-blue-400" /></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Warranty</p>
                  <p className="text-white font-bold">{product.warranty || staticFallback.warranty}</p>
                </div>
              </div>
              <div className="glass-effect p-4 border border-white/5 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl"><Settings className="w-6 h-6 text-purple-400" /></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Cell Type</p>
                  <p className="text-white font-bold truncate">{product.type || staticFallback.type}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={triggerQuotePopup}
                className="flex-1 bg-primary hover:bg-green-400 text-dark font-black text-lg py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] flex justify-center items-center gap-2"
              >
                REQUEST QUOTE FOR THIS PRODUCT
              </button>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
