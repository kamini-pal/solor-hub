import { Leaf, Sun, Grid2X2 } from 'lucide-react';

export default function Logo({ className = "", size = "normal" }) {
  const isSmall = size === "small";
  
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <div className={`relative flex items-center justify-center bg-dark/50 rounded-lg overflow-hidden border border-white/10 shrink-0 ${isSmall ? 'w-8 h-8' : 'w-10 h-10'}`}>
        <Sun className={`absolute -top-1 -right-1 text-accent group-hover:rotate-90 transition-transform duration-500 ${isSmall ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <Grid2X2 className={`text-white/80 transform -skew-y-12 ${isSmall ? 'w-5 h-5' : 'w-6 h-6'}`} />
        <Leaf className={`absolute -bottom-1 left-0 text-primary ${isSmall ? 'w-3 h-3' : 'w-4 h-4'}`} />
      </div>
      <span className={`font-bold tracking-wider ${isSmall ? '' : 'text-xl'}`}>
        <span className="text-primary text-glow-primary">RINKU</span>
        <span className="text-accent text-glow-accent ml-2">SOLAR HUB</span>
      </span>
    </div>
  );
}
