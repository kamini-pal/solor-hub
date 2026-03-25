import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Trash2, Calendar, User, Phone, MapPin, Loader2 } from 'lucide-react';
import AdminDeleteModal from '../../components/admin/AdminDeleteModal';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    // Graceful fallback for demo setups lacking true Firebase keys
    if (db.app.options.apiKey === "YOUR_API_KEY") {
      // eslint-disable-next-line
      setLoading(false);
      return; 
    }
    
    // Create an actively polling Real-time Snapshot
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = [];
      snapshot.forEach((doc) => {
        leadsData.push({ id: doc.id, ...doc.data() });
      });
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Realtime Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await deleteDoc(doc(db, 'leads', deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const handleToggleStatus = async (lead) => {
    const newStatus = lead.status === 'Contacted' ? 'Pending' : 'Contacted';
    try {
      await updateDoc(doc(db, 'leads', lead.id), { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone?.includes(searchTerm) ||
    lead.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Lead <span className="text-glow-primary text-primary">Management</span></h1>
          <p className="text-gray-400 text-sm">Review real-time quote requests and contact inquiries traversing the network.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search leads by name, phone, keywords..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
          />
        </div>
      </div>

      <div className="glass-effect rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-32 text-primary">
            <Loader2 className="w-12 h-12 animate-spin mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
            <p className="text-gray-400 font-medium">Establishing secure real-time link to database cluster...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-24 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-lg relative z-10">
               <User className="w-10 h-10 text-gray-500" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-3 relative z-10">No Leads Found</h3>
             <p className="text-gray-400 text-center max-w-md relative z-10 leading-relaxed">
               Your database is currently empty. Incoming inquiries from the Contact and Quote forms will instantly appear here via WebSockets.
             </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="p-6 font-semibold w-[20%]">Contact Origin</th>
                  <th className="p-6 font-semibold w-[30%]">Customer Details</th>
                  <th className="p-6 font-semibold w-[40%]">Encrypted Message</th>
                  <th className="p-6 font-semibold w-[10%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-6 align-top">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-full ${lead.source === 'Contact Page' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]'}`}>
                          {lead.source || 'Direct API'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{lead.createdAt?.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) || 'Just Now'}</span>
                      </div>
                    </td>
                    <td className="p-6 align-top">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-200 text-base">{lead.name}</span>
                      </div>
                      <div className="flex flex-col gap-2 mt-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400 font-medium bg-dark/50 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{lead.phone}</span>
                        </div>
                        {lead.city && (
                          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium bg-dark/50 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span>{lead.city}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-6 align-top">
                      <p className="text-sm text-gray-300 bg-dark/40 rounded-xl p-4 border border-white/5 leading-relaxed shadow-inner">
                        {lead.message}
                      </p>
                    </td>
                    <td className="p-6 align-top">
                      <div className="flex flex-col items-end gap-3">
                        <button 
                          onClick={() => handleToggleStatus(lead)}
                          className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-full transition-all border shadow-sm flex items-center gap-1.5 whitespace-nowrap ${
                            lead.status === 'Contacted' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/30' 
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/30'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'Contacted' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
                          {lead.status === 'Contacted' ? 'Contacted' : 'Pending'}
                        </button>
                        
                        <button 
                          onClick={() => confirmDelete(lead.id)}
                          className="text-red-500/50 hover:text-white hover:bg-red-500/80 p-2.5 rounded-xl transition-all duration-300 inline-flex items-center justify-center border border-transparent hover:border-red-400/50 shadow-sm"
                          title="Irreversibly Delete Lead"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-16 text-center">
                      <p className="text-gray-500 font-medium">No leads match your exact search parameters.</p>
                      <button onClick={() => setSearchTerm('')} className="mt-4 text-primary hover:text-green-300 text-sm font-bold tracking-wider">CLEAR SEARCH</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Customer Lead"
        message="Are you sure you want to permanently destroy this customer inquiry? This cannot be undone."
      />
    </motion.div>
  );
}
