import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-white/5 pt-16 pb-8 mt-auto relative overflow-hidden">
      {/* Short Banner Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/bg1.jpeg" alt="Footer Background" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#060B14]/80 to-[#060B14] z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo size="small" />
            </div>
            <p className="text-gray-400 max-w-sm mb-6 mt-4">
              Empowering the future with premium solar energy solutions. Smart, sustainable, and beautifully designed for your home and business.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-glow-primary">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Services', 'Products', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-glow-accent">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                <span>Khinmini Farrukhabad</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="text-primary w-5 h-5 shrink-0" />
                <span>+91 95592 01288</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="text-primary w-5 h-5 shrink-0" />
                <span>Shakyarinku923@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Rinku Solar Hub. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
