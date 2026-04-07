
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import MapExplorer from './components/MapExplorer';
import Listings from './components/Listings';
import RentalShowcase from './components/RentalShowcase';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import DiscoveryCTA from './components/DiscoveryCTA';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ValuationTool from './components/ValuationTool';
import BookingSystem from './components/BookingSystem';
import AboutUs from './components/AboutUs';
import Rentals from './components/Rentals';
import ReservedArea from './components/ReservedArea';
import Sales from './components/Sales';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';

type ViewState = 'home' | 'sales' | 'rentals' | 'valuation' | 'booking' | 'about' | 'reserved';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [autoScrollToContact, setAutoScrollToContact] = useState(false);
  const [selectedPropId, setSelectedPropId] = useState<number | null>(null);
  const [reservedSection, setReservedSection] = useState<string>('profile');

  const handleNavigate = (newView: string, propId?: number) => {
    setView(newView as ViewState);
    if (propId) {
      setSelectedPropId(propId);
    } else {
      setSelectedPropId(null);
    }
    setAutoScrollToContact(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContacts = () => {
    setView('about');
    setAutoScrollToContact(true);
  };

  const handleOpenReservedArea = (section: string = 'profile') => {
    setReservedSection(section);
    setView('reserved');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] transition-colors duration-500">
          <Navbar 
            currentView={view}
            onNavigate={(v) => handleNavigate(v)}
            onOpenContacts={handleOpenContacts}
          />
          
          {view === 'home' && (
            <div className="animate-in fade-in duration-500">
              <Hero 
                onOpenValuation={() => handleNavigate('valuation')} 
                onOpenSales={() => handleNavigate('sales')}
              />
              <Partners />
              <MapExplorer onOpenBooking={() => handleNavigate('booking')} />
              <Listings 
                onOpenSales={(id) => handleNavigate('sales', id)} 
              />
              <RentalShowcase 
                onOpenRentals={(id) => handleNavigate('rentals', id)}
                onOpenBooking={() => handleNavigate('booking')} 
              />
              <Testimonials />
              <CTA 
                onOpenValuation={() => handleNavigate('valuation')} 
                onOpenBooking={() => handleNavigate('booking')}
              />
              <DiscoveryCTA onOpenAbout={() => handleNavigate('about')} />
              <Footer 
                onNavigate={handleNavigate}
                onOpenReservedArea={handleOpenReservedArea}
              />
            </div>
          )}

          {view === 'valuation' && (
            <ValuationTool onClose={() => handleNavigate('home')} />
          )}

          {view === 'booking' && (
            <BookingSystem onClose={() => handleNavigate('home')} />
          )}

          {view === 'about' && (
            <AboutUs 
              onClose={() => handleNavigate('home')} 
              onOpenBooking={() => handleNavigate('booking')}
              onOpenSales={() => handleNavigate('sales')}
              initialScrollToContact={autoScrollToContact}
            />
          )}

          {view === 'rentals' && (
            <Rentals 
              onClose={() => handleNavigate('home')} 
              initialPropertyId={selectedPropId}
            />
          )}

          {view === 'reserved' && (
            <ReservedArea 
              onClose={() => handleNavigate('home')} 
              initialSection={reservedSection}
              onNavigateToValuation={() => handleNavigate('valuation')}
            />
          )}

          {view === 'sales' && (
            <Sales 
              onClose={() => handleNavigate('home')} 
              onOpenBooking={() => handleNavigate('booking')}
              onOpenValuation={() => handleNavigate('valuation')}
              initialPropertyId={selectedPropId}
            />
          )}

          <Chatbot onNavigate={handleNavigate} />
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
