import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sun, Award } from 'lucide-react';
import { triggerQuotePopup } from '../layout/AutoPopup';

export default function SavingsCalculator() {
  const [bill, setBill] = useState(5000);
  
  // Advanced Math Logic for Indian Solar Utilities
  const ratePerUnit = 8; // Avg ₹8 per kWh
  const unitsPerMonth = bill / ratePerUnit;
  const solarGenPerKw = 120; // average 120 kWh per month per 1kW system
  const systemSizeKw = Math.max(1, Math.ceil(unitsPerMonth / solarGenPerKw));
  const monthlySavings = Math.round(bill * 0.9); // Conservatively saving 90%
  const yearlySavings = monthlySavings * 12;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-effect rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Banner Short Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img src="/bg1.jpeg" alt="Savings Background" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-dark/70" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full" />
          </div>

          {/* Left Content */}
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Get Electricity <span className="text-glow-primary text-primary">Savings</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Take complete control over your energy bills. Discover exactly how much you can save by switching to premium solar solutions tailored to your unique requirements.
            </p>
            <button 
              onClick={triggerQuotePopup}
              className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] flex items-center gap-2 group w-max"
            >
              <span>GET QUOTE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - Advanced Math Dashboard */}
          <div className="relative z-10 w-full lg:max-w-md bg-dark/70 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4 opacity-90">Solar ROI Dashboard</h3>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-300 font-medium text-sm">Monthly Bill (₹)</span>
              <div className="flex items-center bg-dark/80 border border-white/10 rounded-xl px-3 py-2 overflow-hidden shadow-inner w-32">
                <span className="text-gray-400 mr-2">₹</span>
                <input 
                  type="number" 
                  value={bill || ''} 
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="bg-transparent outline-none w-full text-white font-bold"
                  min="0"
                />
              </div>
            </div>
            
            <input 
              type="range" 
              min="1000" 
              max="50000" 
              step="500"
              value={bill} 
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none mb-8"
              style={{
                background: `linear-gradient(to right, #22c55e ${(bill - 1000) / (50000 - 1000) * 100}%, rgba(255,255,255,0.1) ${(bill - 1000) / (50000 - 1000) * 100}%)`
              }}
            />

            {/* Live Calculation Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col items-center justify-center">
                <Sun className="text-primary w-6 h-6 mb-2" />
                <span className="text-xs text-gray-400 mb-1">System Size</span>
                <span className="text-2xl font-black text-white">{systemSizeKw} <span className="text-sm font-medium text-gray-400">kW</span></span>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col items-center justify-center">
                <Zap className="text-accent w-6 h-6 mb-2" />
                <span className="text-xs text-gray-400 mb-1">Monthly Saving</span>
                <span className="text-2xl font-black text-white">₹{(monthlySavings/1000).toFixed(1)}k</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-5 mb-8 border border-primary/20 relative overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="text-primary font-bold text-sm">Yearly ROI Estimate</span>
                <Award className="text-primary/50 w-5 h-5 absolute right-4 top-4" />
              </div>
              <span className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">₹{yearlySavings.toLocaleString('en-IN')}</span>
              <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-wide">Calculated strictly at average ₹8/unit rate</p>
            </div>

            <button 
              onClick={triggerQuotePopup}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-green-400 text-dark font-bold tracking-wide py-4 px-4 rounded-xl transition-all shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_10px_40px_rgba(34,197,94,0.5)] group"
            >
              Book {systemSizeKw}kW System Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
