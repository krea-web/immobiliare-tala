
import React from 'react';
import { Instagram, Linkedin, Facebook, ArrowRight, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenReservedArea: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReservedArea }) => {
  return (
    <footer className="bg-[#FAFAF9] pt-24 pb-12 border-t border-stone-200 relative overflow-hidden">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="flex items-center gap-3 mb-8 group"
            >
              <div className="w-8 h-8 bg-[#1C1917] text-white flex items-center justify-center rounded-sm shadow-md transition-transform duration-300 group-hover:scale-110">
                <span className="font-serif italic text-sm pr-0.5">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-medium leading-none mb-0.5">Immobiliare</span>
                <span className="font-serif text-xl leading-none text-stone-900 tracking-tight">Tala</span>
              </div>
            </a>
            
            <p className="text-xs text-stone-500 leading-relaxed mb-8 font-light max-w-xs">
              Sede Principale<br />
              Via Monte Napoleone, 18<br />
              20121 Milano, Italia<br /><br />
              Uffici Sardegna<br />
              Viale Murta Maria, 70<br />
              07026 Olbia (SS)
            </p>
            
            <div className="flex gap-4">
              <a href="https://www.instagram.com/immobiliaretala/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-[#0077B5] hover:border-[#0077B5] hover:bg-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-white transition-all duration-300">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 lg:col-span-2 md:col-start-6 lg:col-start-7">
            <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-[0.2em] mb-8 relative inline-block">
              Esplora
              <span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-[#A18058]"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('sales')} className="text-xs font-medium text-stone-500 hover:text-[#1C1917] hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  Proprietà <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A18058]">→</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sales')} className="text-xs font-medium text-stone-500 hover:text-[#1C1917] hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  Nuove Acquisizioni <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A18058]">→</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenReservedArea('collaboration')} className="text-xs font-medium text-stone-500 hover:text-[#A18058] hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  Vendi con noi <ArrowUpRight size={10} className="text-[#A18058]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-[0.2em] mb-8 relative inline-block">
              Azienda
              <span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-[#A18058]"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('about')} className="text-xs font-medium text-stone-500 hover:text-[#1C1917] hover:translate-x-1 transition-all duration-300">
                  Chi Siamo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-xs font-medium text-stone-500 hover:text-[#1C1917] hover:translate-x-1 transition-all duration-300">
                  Team
                </button>
              </li>
              <li>
                <button onClick={() => onOpenReservedArea('collaboration')} className="text-xs font-medium text-stone-500 hover:text-[#1C1917] hover:translate-x-1 transition-all duration-300">
                  Lavora con noi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-xs font-medium text-stone-500 hover:text-[#1C1917] hover:translate-x-1 transition-all duration-300">
                  Contatti
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">© 2025 Immobiliare Tala S.r.l.</span>
          <div className="flex gap-8">
            <a href="#" className="text-[9px] text-stone-400 hover:text-[#1C1917] font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-[9px] text-stone-400 hover:text-[#1C1917] font-bold uppercase tracking-widest transition-colors">Termini</a>
            <a href="#" className="text-[9px] text-stone-400 hover:text-[#1C1917] font-bold uppercase tracking-widest transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
