import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import MapExplorer from '../components/MapExplorer';
import Listings from '../components/Listings';
import RentalShowcase from '../components/RentalShowcase';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import DiscoveryCTA from '../components/DiscoveryCTA';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-500">
      <SEO 
        title="Home" 
        description="Immobiliare Tala - Agenzia immobiliare di lusso specializzata in vendita e affitto di immobili esclusivi."
      />
      <Hero 
        onOpenValuation={() => navigate('/valuta-il-tuo-immobile')} 
        onOpenSales={() => navigate('/vendita')}
      />
      <Partners />
      <MapExplorer onOpenBooking={() => navigate('/prenota')} />
      <Listings 
        onOpenSales={(id) => navigate(`/vendita?id=${id}`)} 
      />
      <RentalShowcase 
        onOpenRentals={(id) => navigate(`/affitto?id=${id}`)}
        onOpenBooking={() => navigate('/prenota')} 
      />
      <Testimonials />
      <CTA 
        onOpenValuation={() => navigate('/valuta-il-tuo-immobile')} 
        onOpenBooking={() => navigate('/prenota')}
      />
      <DiscoveryCTA onOpenAbout={() => navigate('/chi-siamo')} />
    </div>
  );
};

export default Home;
