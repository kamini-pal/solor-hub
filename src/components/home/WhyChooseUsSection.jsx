import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Clock8 } from 'lucide-react';

export default function WhyChooseUsSection() {
  const cards = [
    {
      title: "Quality Products",
      desc: "Tier-1 solar panels and intelligent hybrid inverters built to last.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      image: "/solor3.avif"
    },
    {
      title: "Smart Solutions",
      desc: "AI-driven monitoring systems for maximum energy yield.",
      icon: <Cpu className="w-8 h-8 text-primary" />,
      image: "/solor7.avif"
    },
    {
      title: "24/7 Support",
      desc: "Round-the-clock technical assistance for absolute peace of mind.",
      icon: <Clock8 className="w-8 h-8 text-primary" />,
      image: "/solor8.avif"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-dark">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/bg.jpeg" alt="Solar Ambience" className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-color-dodge" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B14] via-transparent to-[#060B14] z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-left mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="text-primary text-glow-primary">RINKU</span> Solar Hub?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.2 }}
              className="glass-effect rounded-3xl overflow-hidden group border border-white/5 hover:border-primary/50 transition-colors"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-dark/0 z-10 pointer-events-none group-hover:bg-dark/10 transition-colors duration-500" />
                <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 relative">
                <div className="absolute -top-10 left-8 bg-dark p-3 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-shadow z-20">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
