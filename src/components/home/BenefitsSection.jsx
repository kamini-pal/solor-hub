import { motion } from 'framer-motion';
import { Leaf, Zap, PiggyBank } from 'lucide-react';

const benefits = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Maximum Efficiency",
    description: "Our premium solar panels convert more sunlight into usable energy than standard alternatives.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
  },
  {
    icon: <PiggyBank className="w-8 h-8 text-accent" />,
    title: "Save on Energy Bills",
    description: "Drastically reduce your monthly electricity costs and protect yourself from rising energy prices.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-400" />,
    title: "Eco-Friendly",
    description: "Lower your carbon footprint and contribute to a cleaner, more sustainable future for everyone.",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(7ade80,0.3)]"
  }
];

export default function BenefitsSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Why Choose <span className="text-glow-primary text-primary">Rinku</span> Solar Hub?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We don't just install solar panels; we upgrade your lifestyle with premium, high-performance energy solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2 }}
              className={`glass-effect rounded-2xl p-8 border border-white/5 transition-all duration-500 group ${benefit.glowColor}`}
            >
              <div className="w-16 h-16 bg-dark/50 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
