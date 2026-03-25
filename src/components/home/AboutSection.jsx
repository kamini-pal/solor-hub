import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const points = [
    "Solar panels with >22% efficiency",
    "Smart inverters with app monitoring",
    "25-year comprehensive warranty",
    "Professional installation team"
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary text-glow-primary">RINKU</span> SOLAR
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We deliver premium solar solutions designed to maximize your energy independence. Our high-efficiency panels and smart backup systems ensure you get the absolute best return on your investment while protecting the planet.
            </p>
            
            <ul className="space-y-4">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                  <span className="text-gray-300 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="relative z-10 w-full h-[400px] overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="/solor2.jpg" alt="About Rinku Solar" className="w-full h-full object-cover" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
