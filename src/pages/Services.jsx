import { motion } from 'framer-motion';
import { Home, Building2, Battery, Wrench, ArrowRight } from 'lucide-react';
import { triggerQuotePopup } from '../components/layout/AutoPopup';

const services = [
  {
    icon: <Home className="w-8 h-8 text-primary" />,
    title: "Residential Solar",
    desc: "Complete rooftop solar installations designed for optimum efficiency in residential neighborhoods.",
    features: ["Custom System Design", "Net Metering Setup", "25-Year Warranty", "Smart Grid Integration"]
  },
  {
    icon: <Building2 className="w-8 h-8 text-primary" />,
    title: "Commercial & Industrial",
    desc: "High-yield commercial solar grids engineered for heavy-duty corporate power generation.",
    features: ["Mega-Watt Scale Projects", "Corporate Tax Benefits", "Load Analysis", "Zero Downtime Installation"]
  },
  {
    icon: <Battery className="w-8 h-8 text-primary" />,
    title: "Battery & Hybrid Storage",
    desc: "Advanced lithium-ion energy storage systems to keep you running during grid outages.",
    features: ["LiFePO4 Chemistry", "Seamless Transition", "Off-Grid Capability", "Smart Phone Monitoring"]
  },
  {
    icon: <Wrench className="w-8 h-8 text-primary" />,
    title: "Maintenance & Servicing",
    desc: "Comprehensive cleaning, diagnostics, and repairs to ensure maximum solar lifecycle.",
    features: ["Panel Cleaning", "Inverter Diagnostics", "Performance Optimization", "24/7 Priority Support"]
  }
];

export default function Services() {
  return (
    <div className="pt-24 pb-20 px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto min-h-screen">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Our Premium <span className="text-glow-primary text-primary">Services</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          From initial consultation to lifelong maintenance, we deliver end-to-end solar solutions engineered for absolute reliability and massive savings.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-effect rounded-3xl p-8 border border-white/5 hover:border-primary/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors -z-10" />
            
            <div className="bg-dark/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform">
              {service.icon}
            </div>
            
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">{service.desc}</p>
            
            <ul className="space-y-3 mb-8">
              {service.features.map((feature, fidx) => (
                <li key={fidx} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={triggerQuotePopup}
              className="text-primary hover:text-green-300 font-semibold flex items-center gap-2 group/btn"
            >
              Consult an Expert <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* CTA Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="glass-effect rounded-[2.5rem] p-12 text-center border border-primary/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Power Your Future?</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg relative z-10">Join thousands of homeowners saving heavily on electricity bills with zero-hassle grid conversion.</p>
        <button 
          onClick={triggerQuotePopup}
          className="relative z-10 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] font-bold py-4 px-10 rounded-full transition-all text-lg"
        >
          Book Free Site Survey
        </button>
      </motion.div>
    </div>
  );
}
