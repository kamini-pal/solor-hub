import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, Package, Image as ImageIcon, LogOut, Home, Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

export default function AdminLayout() {
  const { logout, currentUser } = useAuth();
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/admin/leads', icon: Users },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen text-white flex relative z-20 overflow-x-hidden">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-[#0A0F1C]/90 backdrop-blur-xl border-b border-white/10 z-[40] flex items-center justify-between px-4">
        <Logo />
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/5 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors">
          <Menu className="w-6 h-6 text-primary" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay Blocker */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Responsive Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[50] w-64 h-screen flex flex-col bg-[#060B14] border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:bg-[#060B14]/80 md:backdrop-blur-xl
      `}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between md:justify-center">
          <div className="md:w-full md:flex md:justify-center">
            <Logo />
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 text-gray-400 hover:text-white bg-white/5 rounded-full border border-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-2 flex-grow">
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 mb-4 font-bold shadow-[0_0_15px_rgba(34,197,94,0.1)]"
          >
            <Home className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
          
          <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-2">Management</p>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="px-4 py-3 mb-2 rounded-xl bg-white/5 border border-white/10 break-words drop-shadow-md">
             <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider font-bold">Admin Hash</p>
             <p className="text-xs font-medium text-gray-300 truncate" title={currentUser?.email}>{currentUser?.email}</p>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors mt-2 font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow md:ml-64 p-4 md:p-8 pt-24 md:pt-8 min-h-screen w-full overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto mt-4 md:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
