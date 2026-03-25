import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function LeadForm() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-accent/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="glass-effect rounded-3xl p-8 md:p-16 border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to go <span className="text-glow-primary text-primary">Solar?</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Join the renewable energy revolution. Fill out the form and our solar experts will contact you for a personalized consultation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-glow-primary">
                    1
                  </div>
                  <span>Expert Consultation</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-glow-primary">
                    2
                  </div>
                  <span>Custom System Design</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50 text-glow-accent">
                    3
                  </div>
                  <span>Seamless Installation</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-dark/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative shadow-[0_0_30px_rgba(34,197,94,0.1)]"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                    placeholder="Kamini Pal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                    placeholder="8853000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                    placeholder="Enter your city"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] group"
                >
                  <span>Request Free Quote</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
