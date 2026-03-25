import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Edit2, Trash2, X, Upload, Loader2, Image as ImageIcon, Zap, IndianRupee, Package } from 'lucide-react';
import AdminDeleteModal from '../../components/admin/AdminDeleteModal';

// Native Image Compression Bypass for Firebase Storage Rule Limitations
const compressImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Cap resolution
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/webp', 0.6)); // Compresses to ~50KB safe for Firestore
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Solar Panels',
    price: '',
    power: '',
    efficiency: '22.5%',
    warranty: '25 Years',
    type: 'Monocrystalline PERC',
    description: '',
    image: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (db.app.options.apiKey === "YOUR_API_KEY") {
      setLoading(false);
      return;
    }
    
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = [];
      snapshot.forEach(doc => prods.push({ id: doc.id, ...doc.data() }));
      setProducts(prods);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData(product);
    } else {
      setEditingId(null);
      setFormData({
        name: '', category: 'Solar Panels', price: '', power: '', 
        efficiency: '22.5%', warranty: '25 Years', type: 'Monocrystalline PERC', 
        description: '', image: ''
      });
    }
    setImageFile(null);
    setUploadProgress(0);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    let imageUrl = formData.image;

    try {
      if (imageFile) {
        // Completely bypass Firebase Storage to prevent infinite blocking loops
        imageUrl = await compressImageToBase64(imageFile);
      }

      const payload = { ...formData, image: imageUrl || '/solor2.jpg' };

      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), { ...payload, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() });
      }
      
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error bypassing upload: ", err);
      // Suppressed native Firebase alert boundary logic as requested
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await deleteDoc(doc(db, 'products', deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Product <span className="text-glow-primary text-primary">Database</span></h1>
          <p className="text-gray-400 text-sm">Manage your inventory, prices, and technical specifications globally.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 bg-primary hover:bg-green-400 text-dark font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center p-24 text-primary">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-gray-400">Loading catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full glass-effect rounded-3xl p-24 text-center border border-white/10">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Inventory Empty</h3>
            <p className="text-gray-400">Click 'Add Product' to list your first solar unit or battery.</p>
          </div>
        ) : (
          products.map(product => (
            <motion.div key={product.id} layout className="glass-effect rounded-2xl border border-white/5 overflow-hidden group">
              <div className="h-48 relative overflow-hidden bg-dark/50">
                <img src={product.image || '/solor2.jpg'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => handleOpenModal(product)} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary/50 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => confirmDelete(product.id)} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-red-400 hover:bg-red-500/50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary/20 text-primary border border-primary/30 uppercase tracking-wider backdrop-blur-md">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-white mb-2 truncate">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="font-medium text-gray-200">{product.power}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-bold">
                    <IndianRupee className="w-4 h-4" />
                    <span>{product.price || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-[#0A0F1C] border border-white/10 rounded-3xl p-8 w-full max-w-2xl relative z-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit Product' : 'Deploy New Product'}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Product Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" placeholder="e.g. Solar Max Ultra" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category *</label>
                    <div className="flex gap-2">
                      <select 
                        value={["Solar Panels", "Batteries", "Inverters"].includes(formData.category) ? formData.category : "Custom"}
                        onChange={e => setFormData({...formData, category: e.target.value === "Custom" ? "" : e.target.value})} 
                        className={`bg-[#121826] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all ${["Solar Panels", "Batteries", "Inverters"].includes(formData.category) ? "w-full" : "w-1/2"}`}
                      >
                        <option value="Solar Panels">Solar Panels</option>
                        <option value="Batteries">Batteries</option>
                        <option value="Inverters">Inverters</option>
                        <option value="Custom">Add Custom...</option>
                      </select>
                      {!["Solar Panels", "Batteries", "Inverters"].includes(formData.category) && (
                        <input 
                          type="text" 
                          required 
                          value={formData.category} 
                          onChange={e => setFormData({...formData, category: e.target.value})} 
                          className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 animate-pulse-glow"
                          placeholder="Type category..."
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Base Price (₹)</label>
                    <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" placeholder="45,000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Power / Output (Watt/kWh) *</label>
                    <input type="text" required value={formData.power} onChange={e => setFormData({...formData, power: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" placeholder="500W" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Efficiency</label>
                    <input type="text" value={formData.efficiency} onChange={e => setFormData({...formData, efficiency: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" placeholder="22.5%" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Cell Technology / Model</label>
                    <input type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" placeholder="Monocrystalline PERC" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none" placeholder="Enter full specifications..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Product Image *</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-400 font-medium">Click to upload Firebase Image</p>
                      {imageFile && <p className="text-xs text-primary mt-1 font-bold">{imageFile.name}</p>}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                  {uploadProgress > 0 && <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden"><div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} /></div>}
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 font-bold transition-all">Cancel</button>
                  <button type="submit" disabled={uploading} className="flex-1 py-4 bg-primary hover:bg-green-400 text-dark rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50 flex items-center justify-center gap-2">
                    {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
                    <span>{editingId ? 'Save Changes' : 'Publish Product'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdminDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to permanently delete this product array from operations? This cannot be undone."
      />
    </motion.div>
  );
}
