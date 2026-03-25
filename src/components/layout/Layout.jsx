import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import AutoPopup from './AutoPopup';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="relative min-h-screen bg-dark overflow-x-hidden">
      {/* Global High-Fidelity Background overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/bg.jpeg" alt="Global Texture" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-color-dodge lg:opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B14]/80 via-transparent to-[#060B14]/80 z-10" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAdmin && <Navbar />}
        <main className={`flex-grow ${!isAdmin ? 'pt-20' : ''}`}>
          {children}
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <FloatingWhatsApp />}
        {!isAdmin && <AutoPopup />}
      </div>
    </div>
  );
}
