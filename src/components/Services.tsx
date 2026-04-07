import React from 'react';
import { Home, Gem, PenTool, Globe, Map, ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="servizi" className="py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-lg">
            <span className="text-[#A18058] font-semibold tracking-[0.2em] text-[10px] uppercase mb-4 block">Il Metodo Tala</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[var(--text-primary)] font-serif leading-tight">
              Servizi su misura per <br />
              <span className="italic text-[var(--text-secondary)]">esigenze straordinarie.</span>
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-1 hover:border-[#A18058] hover:text-[#A18058] transition-all mt-6 md:mt-0">
            Scopri tutti i servizi
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Main Feature */}
          <div className="md:col-span-2 bg-[var(--bg-secondary)] rounded-[2rem] p-8 md:p-10 border border-[var(--border-primary)] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="absolute right-0 top-0 w-1/2 h-full">
              <img 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                alt="Valuation"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[var(--bg-secondary)]/80 to-[var(--bg-secondary)]"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between max-w-sm">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-[#A18058] mb-4">
                <Home size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic text-[var(--text-primary)] mb-3">Valutazione Premium</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                  Un'analisi dettagliata che va oltre i dati di mercato. Consideriamo il valore architettonico, il design e il potenziale unico della vostra proprietà.
                </p>
              </div>
            </div>
          </div>

          {/* Dark Card */}
          <div className="md:col-span-1 bg-[#1C1917] dark:bg-black rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-lg relative overflow-hidden group text-white flex flex-col justify-between">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div className="w-full h-full absolute top-0 right-0 bg-gradient-to-bl from-[#A18058]/20 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-[#A18058] mb-6">
                <Gem size={18} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif italic mb-2">Off-Market</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed mb-6">
                Accesso esclusivo a proprietà non pubblicate sui canali tradizionali. Riservatezza garantita.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-stone-800">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-stone-700 border-2 border-[#1C1917]"></div>
                <div className="w-8 h-8 rounded-full bg-stone-600 border-2 border-[#1C1917]"></div>
                <div className="w-8 h-8 rounded-full bg-[#A18058] text-[10px] flex items-center justify-center border-2 border-[#1C1917]">5+</div>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Nuovi arrivi</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="md:col-span-1 bg-[var(--bg-secondary)] rounded-[2rem] p-8 md:p-10 border border-[var(--border-primary)] shadow-sm flex flex-col justify-between group hover:border-[#A18058]/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-primary)] mb-4 group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300">
              <PenTool size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl font-serif text-[var(--text-primary)] mb-2">Design &amp; Staging</h3>
              <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                Collaboriamo con i migliori interior designer per presentare la vostra casa al massimo del suo splendore.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-2 bg-[var(--bg-tertiary)] rounded-[2rem] p-8 md:p-10 border border-[var(--border-primary)] shadow-sm relative overflow-hidden flex items-center">
            <div className="relative z-10 max-w-sm">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-primary)] mb-4">
                <Globe size={18} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif text-[var(--text-primary)] mb-2">Network Globale</h3>
              <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed mb-6">
                La vostra proprietà sarà visibile agli investitori internazionali attraverso la nostra rete di partner selezionati a Londra, New York e Dubai.
              </p>
              <button className="text-xs font-bold uppercase tracking-wider underline underline-offset-4 decoration-[var(--border-primary)] hover:decoration-[#A18058] transition-all">Espandi i tuoi orizzonti</button>
            </div>
            {/* Abstract Map Graphic */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 opacity-10">
                 <Map size={300} className="text-[var(--text-primary)]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;