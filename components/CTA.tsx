import React from 'react';

interface CTAProps {
  onOpenValuation?: () => void;
  onOpenBooking?: () => void;
}

const CTA: React.FC<CTAProps> = ({ onOpenValuation, onOpenBooking }) => {
  return (
    <section id="chisiamo" className="bg-[#1C1917] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A18058] rounded-full blur-[180px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl text-[#FAFAF9] font-serif italic mb-6">Affida a noi la tua visione.</h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-10 max-w-md font-light">
            Che tu stia cercando la casa dei sogni o voglia valorizzare il tuo immobile, il team Tala ti guida con competenza, discrezione e stile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenValuation}
              className="btn-super-glow bg-[#FAFAF9] text-[#1C1917] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              Valuta il tuo immobile
            </button>
            <button 
              onClick={onOpenBooking}
              className="btn-super-glow bg-[#1C1917] border border-stone-700 text-[#FAFAF9] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#FAFAF9]"
            >
              Prenota ora una visita dei nostri immobili
            </button>
          </div>
        </div>
        
        {/* Image grid visual */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop" 
            className="w-full h-48 object-cover rounded-2xl opacity-60 hover:opacity-100 transition-opacity duration-500 translate-y-8" 
            alt="Interior"
          />
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop" 
            className="w-full h-48 object-cover rounded-2xl opacity-90 hover:opacity-100 transition-opacity duration-500" 
            alt="Exterior"
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;