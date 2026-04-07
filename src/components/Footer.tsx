import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-primary)] pt-24 pb-12 border-t border-[var(--border-primary)] relative overflow-hidden transition-colors duration-500">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <Link 
              to="/" 
              className="flex items-center gap-3 mb-8 group"
            >
              <div className="w-8 h-8 bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center rounded-sm shadow-md transition-transform duration-300 group-hover:scale-110">
                <span className="font-serif italic text-sm pr-0.5">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] font-medium leading-none mb-0.5">Immobiliare</span>
                <span className="font-serif text-xl leading-none text-[var(--text-primary)] tracking-tight">Tala</span>
              </div>
            </Link>
            
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-8 font-light max-w-xs">
              Sede Principale<br />
              Via Monte Napoleone, 18<br />
              20121 Milano, Italia<br /><br />
              Uffici Sardegna<br />
              Viale Murta Maria, 70<br />
              07026 Olbia (SS)
            </p>
            
            <div className="flex gap-4">
              <a href="https://www.instagram.com/immobiliaretala/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[var(--border-primary)] rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[var(--bg-secondary)] transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-[var(--border-primary)] rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:text-[#0077B5] hover:border-[#0077B5] hover:bg-[var(--bg-secondary)] transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-[var(--border-primary)] rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[var(--bg-secondary)] transition-all duration-300">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 lg:col-span-2 md:col-start-6 lg:col-start-7">
            <h4 className="font-bold text-[var(--text-primary)] text-[10px] uppercase tracking-[0.2em] mb-8 relative inline-block">
              Esplora
              <span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-[#A18058]"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/vendita" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  Proprietà <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A18058]">→</span>
                </Link>
              </li>
              <li>
                <Link to="/vendita" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  Nuove Acquisizioni <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A18058]">→</span>
                </Link>
              </li>
              <li>
                <Link to="/valuta-il-tuo-immobile" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#A18058] hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  Vendi con noi <ArrowUpRight size={10} className="text-[#A18058]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-bold text-[var(--text-primary)] text-[10px] uppercase tracking-[0.2em] mb-8 relative inline-block">
              Azienda
              <span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-[#A18058]"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/chi-siamo" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-300">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo#team" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-300">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo#lavora-con-noi" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-300">
                  Lavora con noi
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo#contatti" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-300">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-primary)] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[9px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">© 2026 Immobiliare Tala S.r.l.</span>
          <div className="flex gap-8">
            <a href="#" className="text-[9px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-[9px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] font-bold uppercase tracking-widest transition-colors">Termini</a>
            <a href="#" className="text-[9px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] font-bold uppercase tracking-widest transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
