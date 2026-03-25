import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, ArrowLeft, Zap, Shield, Battery, Send } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();

  // Mock product data based on ID or fallback
  const product = {
    id: id,
    name: "Solar Max",
    power: "500W",
    efficiency: "22.5%",
    warranty: "25 Years",
    type: "Monocrystalline PERC",
    image: "/solor2.jpg",
    description: "The Rinku Solar Max is our flagship premium solar panel. Engineered with next-generation PERC technology, it provides industry-leading efficiency even in low-light conditions. Built to withstand extreme weather and designed with an all-black sleek aesthetic that looks stunning on any roof."
  };

  return (
    <div className="pt-24 pb-24 min-h-[calc(100vh-80px)] relative overflow-hidden flex items-center">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-full h-full bg-dark/80 mix-blend-multiply -z-10" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </Link>
        
        <div className="glass-effect rounded-3xl p-8 lg:p-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Product Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[400px] lg:h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl md:rounded-3xl z-10 mix-blend-overlay" />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.15)] border border-white/10 p-2 glass-effect"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                />
              </motion.div>
            </motion.div>

            {/* Right: Product Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col h-full justify-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {product.name} <span className="text-glow-primary text-primary">{product.power}</span>
              </h1>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-dark/50 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Efficiency</p>
                    <p className="font-bold text-gray-200">{product.efficiency}</p>
                  </div>
                </div>
                <div className="bg-dark/50 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Warranty</p>
                    <p className="font-bold text-gray-200">{product.warranty}</p>
                  </div>
                </div>
                <div className="bg-dark/50 border border-white/5 rounded-xl p-4 flex items-center gap-4 col-span-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Battery className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Cell Technology</p>
                    <p className="font-bold text-gray-200">{product.type}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]">
                  <Send className="w-5 h-5" />
                  Request Quote
                </button>
                <div className="flex gap-4 flex-1">
                  <button className="flex-1 flex items-center justify-center gap-2 glass-effect hover:bg-green-500/20 text-green-400 border border-green-500/30 font-medium py-4 rounded-xl transition-all">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </button>
                  <button className="flex-[0.5] flex items-center justify-center gap-2 glass-effect hover:bg-white/10 text-white border border-white/20 font-medium py-4 rounded-xl transition-all">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
