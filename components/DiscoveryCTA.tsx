
import React from 'react';
import { ArrowRight, Sparkles, Diamond, ShieldCheck, Star, Award } from 'lucide-react';

interface DiscoveryCTAProps {
  onOpenAbout: () => void;
}

const DiscoveryCTA: React.FC<DiscoveryCTAProps> = ({ onOpenAbout }) => {
  return (
    <section className="relative py-40 md:py-60 bg-[#0C0A09] overflow-hidden group">
      {/* Background Image Layer with Cinematic Treatment */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2574&auto=format&fit=crop" 
          alt="Luxury background" 
          className="w-full h-full object-cover opacity-20 scale-110 group-hover:scale-100 transition-transform duration-[10s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A09] via-transparent to-[#0C0A09]"></div>
        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #0C0A09 100%) opacity-80"></div>
      </div>

      {/* Dynamic Light Sweeps */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#A18058]/30 to-transparent -rotate-12 blur-sm animate-[pulse_6s_infinite]"></div>
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#A18058]/30 to-transparent rotate-12 blur-sm animate-[pulse_8s_infinite]"></div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Elite Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-12 transform hover:scale-105 transition-transform duration-500 cursor-default shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
             <div className="relative">
                <Sparkles size={14} className="text-[#A18058] animate-pulse" />
                <div className="absolute inset-0 blur-md bg-[#A18058] opacity-50 animate-pulse"></div>
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-300">Porte Aperte all'Esclusività</span>
          </div>

          {/* Main Title */}
          <h2 className="text-6xl md:text-8xl lg:text-[9.5rem] font-serif text-white mb-10 leading-[0.8] tracking-tighter max-w-5xl">
            Pronto a scrivere <br />
            <span className="italic text-[#A18058] drop-shadow-[0_0_35px_rgba(161,128,88,0.4)]">la tua storia?</span>
          </h2>

          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#A18058]/60 to-transparent mb-12"></div>

          <p className="text-stone-400 text-lg md:text-2xl font-light max-w-2xl mb-20 leading-relaxed tracking-wide opacity-90">
            Il lusso non è possedere, è risuonare. <br className="hidden md:block" /> 
            Scopri la collezione privata che attende solo la tua firma.
          </p>

          {/* THE MASTER BUTTON */}
          <div className="relative group/btn mb-32">
            <div className="absolute -inset-6 bg-[#A18058] rounded-full opacity-10 blur-3xl group-hover/btn:opacity-30 group-hover/btn:blur-[4rem] transition-all duration-1000 animate-pulse"></div>
            
            <button 
                onClick={onOpenAbout}
                className="btn-super-glow btn-ray-effect relative bg-white text-[#1C1917] px-16 py-7 rounded-full text-[12px] font-bold uppercase tracking-[0.4em] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center gap-6 overflow-hidden transition-all hover:translate-y-[-5px] active:scale-95"
            >
                <div className="btn-inner-bg bg-white"></div>
                <span className="relative z-10 flex items-center gap-2">Inizia il Viaggio</span>
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#1C1917] text-white group-hover/btn:scale-125 group-hover/btn:bg-[#A18058] transition-all duration-500">
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
            </button>
          </div>

          {/* --- NEW REFINED BOTTOM SECTION --- */}
          <div className="w-full max-w-4xl pt-16 border-t border-white/5 flex flex-col items-center">
              
              {/* Founder Signature Area */}
              <div className="mb-16 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-700">
                  <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-stone-500 mb-2">Curato personalmente da</p>
                  <div className="relative">
                      <span className="font-serif italic text-3xl text-white/90 select-none">Andrea Tala</span>
                      {/* Stylized Underline */}
                      <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#A18058]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                  </div>
              </div>

              {/* Enhanced Trust Credentials Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 w-full items-center">
                  
                  {/* Item 1 */}
                  <div className="flex flex-col items-center gap-4 group/badge">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A18058] group-hover/badge:bg-[#A18058] group-hover/badge:text-white transition-all duration-500 shadow-xl backdrop-blur-md">
                          <Diamond size={24} strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-1">Rare Assets</p>
                          <p className="text-[8px] text-stone-500 uppercase tracking-widest">Collezione Off-Market</p>
                      </div>
                  </div>

                  {/* Divider md:only */}
                  <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                  {/* Item 2 */}
                  <div className="flex flex-col items-center gap-4 group/badge">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A18058] group-hover/badge:bg-[#A18058] group-hover/badge:text-white transition-all duration-500 shadow-xl backdrop-blur-md">
                          <ShieldCheck size={24} strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-1">Total Privacy</p>
                          <p className="text-[8px] text-stone-500 uppercase tracking-widest">Trattative Protette</p>
                      </div>
                  </div>

                  {/* Divider md:only */}
                  <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                  {/* Item 3 */}
                  <div className="flex flex-col items-center gap-4 group/badge">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A18058] group-hover/badge:bg-[#A18058] group-hover/badge:text-white transition-all duration-500 shadow-xl backdrop-blur-md">
                          <Award size={24} strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-1">Elite Network</p>
                          <p className="text-[8px] text-stone-500 uppercase tracking-widest">Presenza Globale</p>
                      </div>
                  </div>

              </div>
          </div>
      </div>

      {/* Aesthetic Bottom Fade and Light Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A18058]/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay pointer-events-none"></div>
    </section>
  );
};

export default DiscoveryCTA;
