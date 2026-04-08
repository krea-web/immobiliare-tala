import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, ArrowRight, Phone, MapPin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] relative overflow-hidden transition-colors duration-500">
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-[#A18058]/10 blur-[140px] rounded-full"></div>
      <div className="absolute -bottom-40 -left-40 w-[620px] h-[620px] bg-[#A18058]/8 blur-[160px] rounded-full"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="rounded-[2.5rem] border border-[#A18058]/30 bg-[#A18058]/10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#A18058] text-white flex items-center justify-center font-serif text-xl italic">T</div>
            <p className="text-sm text-[var(--text-primary)]">Consulenza d’élite per il tuo prossimo asset in Sardegna.</p>
          </div>
          <Link to="/valuta-il-tuo-immobile" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#A18058] text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#1C1917] transition-colors">
            Valuta il Tuo Immobile <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12">
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center rounded-sm shadow-md group-hover:scale-110 transition-transform">
                <span className="font-serif italic text-lg pr-0.5">T</span>
              </div>
              <span className="font-serif text-xl leading-none text-[var(--text-primary)] tracking-tight">Immobiliare Tala</span>
            </Link>
            <div className="text-xs text-[var(--text-secondary)] space-y-2">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#A18058] mt-[2px]" />
                <span>Viale Murta Maria, 70 • 07026 Olbia (SS)</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[#A18058] mt-[2px]" />
                <span>+39 0789 123456</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#A18058] mt-[2px]" />
                <span>info@immobiliaretala.it</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <a href="https://www.instagram.com/immobiliaretala/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-tertiary)] hover:bg-[#A18058] hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-tertiary)] hover:bg-[#A18058] hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-tertiary)] hover:bg-[#A18058] hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Esplora</h4>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/vendita" className="px-4 py-3 rounded-xl border border-[var(--border-primary)] hover:border-[#A18058] hover:text-[var(--text-primary)] text-[11px] font-bold uppercase tracking-widest">Vendita</Link>
              <Link to="/affitto" className="px-4 py-3 rounded-xl border border-[var(--border-primary)] hover:border-[#A18058] text-[11px] font-bold uppercase tracking-widest">Affitto</Link>
              <Link to="/valuta-il-tuo-immobile" className="px-4 py-3 rounded-xl border border-[var(--border-primary)] hover:border-[#A18058] text-[11px] font-bold uppercase tracking-widest">Valutazione</Link>
              <Link to="/brochure-and-magazine" className="px-4 py-3 rounded-xl border border-[var(--border-primary)] hover:border-[#A18058] text-[11px] font-bold uppercase tracking-widest">Brochure</Link>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Aggiornamenti</h4>
            <div className="rounded-2xl border border-[var(--border-primary)] p-4 bg-[var(--bg-primary)]">
              <p className="text-xs text-[var(--text-secondary)] mb-3">Novità su asset e collezioni private.</p>
              <div className="flex gap-2">
                <input placeholder="Email" className="flex-1 h-11 px-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]" />
                <button className="px-5 rounded-xl bg-[#A18058] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[var(--text-primary)]">Iscriviti</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-[var(--border-primary)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">© 2026 Immobiliare Tala</p>
          <div className="flex gap-6 text-[9px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-[var(--text-primary)]">Privacy</a>
            <a href="#" className="hover:text-[var(--text-primary)]">Termini</a>
            <a href="#" className="hover:text-[var(--text-primary)]">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
