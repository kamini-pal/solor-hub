import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { triggerQuotePopup } from '../layout/AutoPopup';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-32 overflow-hidden">
      {/* Photographic Background Integration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/bg.jpeg" alt="Solar Background Space" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten" />
        <div className="absolute inset-0 bg-dark/80 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark z-20" />
      </div>

      {/* Vibrant Neon Green Arc Emulation */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22c55e]/40 rounded-full blur-[150px] z-0 pointer-events-none shadow-[0_0_150px_#22c55e]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-green-500/30 rounded-[100%] blur-[150px] z-0 pointer-events-none transform -rotate-45" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-20 w-full pt-12 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/30 text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#22c55e] animate-pulse" />
              <span className="text-sm font-medium tracking-wide">Premium Solar Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Switch to </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300 text-glow-primary tracking-tight">Solar</span>
              <br />
              <span className="text-gray-300 text-4xl md:text-6xl tracking-tight">Save Energy & Money</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              Step into the future with state-of-the-art solar technology. Beautifully designed panels, maximum efficiency, and lower bills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={triggerQuotePopup}
                className="flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 shadow-[0_0_20px_rgba(34,197,94,0.4)] font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] group"
              >
                <span>GET QUOTE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/919559201288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 glass-effect hover:bg-white/10 text-white border border-white/20 font-medium py-4 px-8 rounded-full transition-all duration-300"
              >
                <WhatsAppIcon className="w-5 h-5 text-primary" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </motion.div>

          {/* Right Content - Floating Solar Panel Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center relative perspective-[1000px] mt-12 lg:mt-0"
          >
            <motion.div
              animate={{ y: [-15, 15, -15], rotateZ: [0, -1, 1, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-square max-w-[28rem] sm:max-w-[32rem] md:max-w-[38rem] lg:max-w-none lg:w-[45rem] lg:h-[45rem] xl:w-[52rem] xl:h-[52rem] z-20 pointer-events-none flex justify-center items-center"
            >
              <img
                src="/hero.png"
                alt="Premium Standalone Array"
                className="w-full h-auto max-h-[150%] object-contain scale-125 lg:scale-110 drop-shadow-[0_40px_80px_rgba(34,197,94,0.5)]"
              />

              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -left-10 glass-effect p-6 rounded-3xl border border-primary/40 shadow-[0_15px_50px_rgba(34,197,94,0.3)] backdrop-blur-2xl z-50 pointer-events-auto"
              >
                <p className="text-gray-300 text-base mb-1 font-medium tracking-wide">Energy Generation</p>
                <div className="flex items-end gap-2 leading-none">
                  <span className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">99.9</span>
                  <span className="text-primary font-bold text-2xl mb-1">%</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Badges below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pb-10"
        >
          {[
            { title: "Save Money", desc: "Reduce your electricity bills", icon: "💰" },
            { title: "Eco-Friendly", desc: "Clean, renewable energy", icon: "🌱" },
            { title: "Backup Power", desc: "Keep the lights on always", icon: "🔋" }
          ].map((feature, idx) => (
            <div key={idx} className="glass-effect rounded-2xl p-6 flex items-center gap-4 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:border-primary/30 transition-all duration-300 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm mt-1 leading-tight group-hover:text-gray-300 transition-colors">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
