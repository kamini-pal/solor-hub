import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/admin/login');
    } catch {
      console.error('Failed to log out');
    }
  }

  return (
    <div className="min-h-screen text-white p-8 max-w-[1440px] mx-auto pt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-dark/50 glass-effect p-6 rounded-3xl">
        <h1 className="text-3xl font-bold text-glow-primary text-primary">Admin Control Panel</h1>
        <div className="flex items-center gap-6 border border-white/5 bg-white/5 rounded-2xl p-2 px-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Active Session</span>
            <span className="text-gray-300 font-medium text-sm">{currentUser?.email}</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <button 
            onClick={handleLogout} 
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            End Protocol
          </button>
        </div>
      </div>

      <div className="glass-effect rounded-3xl p-12 border border-primary/20 text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
         
         <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
           <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
         </div>
         
         <h2 className="text-2xl font-bold mb-4 text-white">Security Gateway Bypassed</h2>
         <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
           The Firebase Authentication cluster is successfully operating. You are now securely logged into the Protected Layout. Please declare your structural instructions to build the remaining CRUD tables (Leads, Products, Images).
         </p>
      </div>
    </div>
  );
}
