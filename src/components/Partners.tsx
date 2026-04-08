import React from 'react';
import { Link } from 'react-router-dom';

const PLACES = [
  { label: 'Olbia', path: '/localita/olbia' },
  { label: 'Porto Rotondo', path: '/localita/porto-rotondo' },
  { label: 'Budoni', path: '/localita/budoni' },
  { label: 'Porto Ottiolu', path: '/localita/porto-ottiolu' },
  { label: 'Puntaldia', path: '/localita/puntaldia' },
  { label: 'Murta Maria', path: '/localita/murta-maria' },
  { label: 'Porto San Paolo', path: '/localita/porto-san-paolo' },
  { label: 'Vaccileddi', path: '/localita/vaccileddi' },
  { label: 'Monte Contros', path: '/localita/monte-contros' },
  { label: 'Lu Impostu', path: '/spiaggia/lu-impostu' },
  { label: 'Porto Taverna', path: '/spiaggia/porto-taverna' },
];

const Partners: React.FC = () => {
  const marqueePlaces = [...PLACES, ...PLACES];

  return (
    <section className="border-y border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden py-10 relative group transition-colors duration-500">
      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-secondary)]/90 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[var(--bg-secondary)] via-[var(--bg-secondary)]/90 to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Container */}
      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] items-center">
        {marqueePlaces.map((item, idx) => (
          <Link 
            key={idx} 
            to={item.path}
            className="flex items-center justify-center mx-8 md:mx-12 min-w-[160px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:scale-105 transition-all duration-500 ease-out opacity-70 hover:opacity-100"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em]">{item.label}</span>
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 100s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Partners;
