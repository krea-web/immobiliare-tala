
// REPLACE WITH YOUR ACTUAL SPREADSHEET ID
// You can find this in your Google Sheet URL: https://docs.google.com/spreadsheets/d/[THIS_IS_THE_ID]/edit
const SPREADSHEET_ID = 'INSERISCI_QUI_IL_TUO_SPREADSHEET_ID';

const API_KEY = process.env.API_KEY;

export interface SheetProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  priceValue?: number;
  type: string;
  beds: number;
  baths: number;
  sqm: string;
  land?: string;
  image: string;
  tag?: string;
  description: string;
  features: string[];
  lat?: number;
  lng?: number;
  // Rental specific
  pricePerNight?: number;
  sleeps?: number;
  airportDist?: string;
  amenities?: string[];
}

const parseFeatures = (str: string) => str ? str.split(',').map(s => s.trim()) : [];

export const fetchSalesFromSheet = async (): Promise<SheetProperty[]> => {
  if (!SPREADSHEET_ID || SPREADSHEET_ID.includes('INSERISCI')) return [];

  try {
    const range = 'Vendita!A2:M'; // Assumes headers in row 1
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch sales');
    
    const data = await response.json();
    if (!data.values) return [];

    return data.values.map((row: any[], index: number) => ({
      id: index + 100, // Offset ID to avoid conflicts
      title: row[0] || 'Titolo mancante',
      location: row[1] || '',
      price: row[2] || 'Trattativa Riservata',
      priceValue: Number(row[2]?.replace(/[^0-9]/g, '')) || 0,
      type: row[3] || 'Villa',
      beds: Number(row[4]) || 0,
      baths: Number(row[5]) || 0,
      sqm: row[6] || '',
      land: row[7] || '',
      image: row[8] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      tag: row[9] || '',
      description: row[10] || '',
      features: parseFeatures(row[11]),
      lat: Number(row[12]) || 0, // Optional
      lng: Number(row[13]) || 0  // Optional
    }));
  } catch (error) {
    console.error("Error fetching sales from sheet:", error);
    return [];
  }
};

export const fetchRentalsFromSheet = async (): Promise<SheetProperty[]> => {
  if (!SPREADSHEET_ID || SPREADSHEET_ID.includes('INSERISCI')) return [];

  try {
    const range = 'Affitto!A2:N'; // Assumes headers in row 1
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`
    );

    if (!response.ok) throw new Error('Failed to fetch rentals');

    const data = await response.json();
    if (!data.values) return [];

    return data.values.map((row: any[], index: number) => ({
      id: index + 200,
      title: row[0] || 'Nome mancante', // Mapped to 'name' in component
      location: row[1] || '',
      type: row[2] || '',
      pricePerNight: Number(row[3]) || 0,
      beds: Number(row[4]) || 0,
      baths: Number(row[5]) || 0,
      sleeps: Number(row[6]) || 0,
      airportDist: row[7] || '',
      amenities: parseFeatures(row[8]),
      features: parseFeatures(row[9]),
      image: row[10] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      lat: Number(row[11]) || 40.8,
      lng: Number(row[12]) || 9.6
    }));
  } catch (error) {
    console.error("Error fetching rentals from sheet:", error);
    return [];
  }
};
    