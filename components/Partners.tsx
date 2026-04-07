import React from 'react';

const LOGOS = [
  // Architectural Digest
  <svg key="1" height="24" viewBox="0 0 140 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Architectural Digest"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="18" letterSpacing="1">ARCHITECTURAL DIGEST</text></svg>,
  // Sotheby's
  <svg key="2" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Sothebys"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontSize="20">Sotheby's</text></svg>,
  // Elle Decor
  <svg key="3" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Elle Decor"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="20">ELLE DECOR</text></svg>,
  // Christie's
  <svg key="4" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Christies"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontSize="20">CHRISTIE'S</text></svg>,
  // Vogue
  <svg key="5" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Vogue"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="22">VOGUE</text></svg>,
  // Knight Frank
  <svg key="6" height="24" viewBox="0 0 120 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Knight Frank"><text x="50%" y="18" textAnchor="middle" fontFamily="sans-serif" fontWeight="600" fontSize="18" letterSpacing="-0.5">Knight Frank</text></svg>,
  // Houzz
  <svg key="7" height="24" viewBox="0 0 80 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Houzz"><text x="50%" y="18" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="-1">houzz</text></svg>,
  // Savills
  <svg key="8" height="24" viewBox="0 0 80 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Savills"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="20" letterSpacing="1">savills</text></svg>,
  // Forbes
  <svg key="9" height="24" viewBox="0 0 80 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Forbes"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="22">Forbes</text></svg>,
  // Robb Report
  <svg key="10" height="24" viewBox="0 0 120 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Robb Report"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontSize="20" fontStyle="italic">Robb Report</text></svg>,
  // NYT
  <svg key="11" height="24" viewBox="0 0 180 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="NYT"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="16">The New York Times</text></svg>,
  // Monocle
  <svg key="12" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Monocle"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="20">MONOCLE</text></svg>,
  // Wall Street Journal
  <svg key="13" height="24" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="WSJ"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontSize="22">WSJ</text></svg>,
  // Financial Times
  <svg key="14" height="24" viewBox="0 0 160 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="FT"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontSize="18">FINANCIAL TIMES</text></svg>,
  // GQ
  <svg key="15" height="24" viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="GQ"><text x="50%" y="18" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="24">GQ</text></svg>,
  // Bvlgari
  <svg key="16" height="24" viewBox="0 0 120 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Bvlgari"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="20" letterSpacing="2">BVLGARI</text></svg>,
  // Cartier
  <svg key="17" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Cartier"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="22">Cartier</text></svg>,
  // Rolex
  <svg key="18" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Rolex"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="20">ROLEX</text></svg>,
  // Bentley
  <svg key="19" height="24" viewBox="0 0 120 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Bentley"><text x="50%" y="18" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="18" letterSpacing="1">BENTLEY</text></svg>,
  // Prada
  <svg key="20" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Prada"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="20" letterSpacing="2">PRADA</text></svg>,
  // Gucci
  <svg key="21" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Gucci"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontSize="20" letterSpacing="1">GUCCI</text></svg>,
  // Louis Vuitton
  <svg key="22" height="24" viewBox="0 0 160 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Louis Vuitton"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontSize="18" letterSpacing="1">LOUIS VUITTON</text></svg>,
  // Hermes
  <svg key="23" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Hermes"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="20">HERMÈS</text></svg>,
  // Chanel
  <svg key="24" height="24" viewBox="0 0 100 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Chanel"><text x="50%" y="18" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="20" letterSpacing="1">CHANEL</text></svg>,
  // Armani Casa
  <svg key="25" height="24" viewBox="0 0 140 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Armani Casa"><text x="50%" y="18" textAnchor="middle" fontFamily="serif" fontSize="18" letterSpacing="1">ARMANI / CASA</text></svg>,
  // Fendi Casa
  <svg key="26" height="24" viewBox="0 0 120 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Fendi Casa"><text x="50%" y="18" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="18">FENDI CASA</text></svg>
];

const Partners: React.FC = () => {
  // Use 2 sets of logos to ensure smooth looping without too much repetition
  const marqueeLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="border-y border-stone-200 bg-white overflow-hidden py-10 relative group">
      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Container */}
      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] items-center">
        {marqueeLogos.map((logo, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-center mx-8 md:mx-12 min-w-[120px] text-stone-300 hover:text-[#1C1917] hover:scale-105 transition-all duration-500 cursor-pointer ease-out opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
          >
            {logo}
          </div>
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