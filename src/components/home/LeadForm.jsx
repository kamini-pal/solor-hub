import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LeadForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      if (db.app.options.apiKey === "YOUR_API_KEY") {
        throw new Error("Local Demo Mode: Server connection unverified.");
      }

      await addDoc(collection(db, 'leads'), {
        name: formData.name,
        phone: formData.phone,
        message: `Quote Request for City: ${formData.city}`,
        source: 'Get Quote Tool',
        createdAt: serverTimestamp(),
      });

      setStatus({ type: 'success', text: 'Quote requested! We will call you rapidly.' });
      setFormData({ name: '', phone: '', city: '' });
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Failed to request quote.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
              <h3 className="text-2xl font-bold mb-6 text-white text-center">Get a Free Quote</h3>
              
              <AnimatePresence>
                {status.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}
                  >
                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
                    <p className="text-sm font-medium">{status.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                    placeholder="Kamini Pal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                    placeholder="8853000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">City Location</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                    placeholder="Enter your city"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Request Free Quote</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
