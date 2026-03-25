import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../firebase';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ leads: 0, products: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTelemetry() {
      if (db.app.options.apiKey === "YOUR_API_KEY") {
        setLoading(false); return;
      }
      try {
        const [leadsSnap, productsSnap, gallerySnap] = await Promise.all([
          getCountFromServer(collection(db, 'leads')),
          getCountFromServer(collection(db, 'products')),
          getCountFromServer(collection(db, 'gallery'))
        ]);
        
        setCounts({
          leads: leadsSnap.data().count,
          products: productsSnap.data().count,
          gallery: gallerySnap.data().count
        });
      } catch (err) {
        console.error("Error fetching telemetry:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTelemetry();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Overview <span className="text-glow-primary text-primary">Dashboard</span></h1>
          <p className="text-gray-400">High-level telemetry and pipeline statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-3xl p-6 border border-white/10 shadow-lg"
        >
          <h3 className="text-gray-400 font-medium mb-3 uppercase tracking-wider text-xs">Total Leads</h3>
          <p className="text-5xl font-bold text-white">{loading ? <Loader2 className="w-8 h-8 animate-spin" /> : counts.leads}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-3xl p-6 border border-white/10 shadow-lg"
        >
          <h3 className="text-gray-400 font-medium mb-3 uppercase tracking-wider text-xs">Total Products</h3>
          <p className="text-5xl font-bold text-white">{loading ? <Loader2 className="w-8 h-8 animate-spin" /> : counts.products}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-3xl p-6 border border-white/10 shadow-lg relative overflow-hidden"
        >
          <h3 className="text-gray-400 font-medium mb-3 uppercase tracking-wider text-xs relative z-10">Total Installations</h3>
          <p className="text-5xl font-bold text-white relative z-10">{loading ? <Loader2 className="w-8 h-8 animate-spin" /> : counts.gallery}</p>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-[30px]" />
        </motion.div>
      </div>

      <div className="glass-effect rounded-3xl p-12 border border-primary/20 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">System Secure</h2>
        <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
          Welcome to the secure administrative portal. Please use the sidebar to navigate between operational modules to construct CRUD tables.
        </p>
      </div>
    </motion.div>
  );
}
