-- SQL script for Immobiliare Tala Supabase Schema v2026
-- Optimized for Real Estate CRM, Luxury Rentals, and Elite Marketing

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'agent')),
  membership_level TEXT DEFAULT 'base' CHECK (membership_level IN ('base', 'platinum', 'diamond')),
  preferred_style TEXT, -- Modern, Classic, Stazzo, etc.
  bio TEXT,
  lead_status TEXT DEFAULT 'new' CHECK (lead_status IN ('new', 'contacted', 'negotiating', 'loyal', 'lost')),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Properties Table (Asset Management)
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  type TEXT CHECK (type IN ('vendita', 'affitto')),
  category TEXT CHECK (category IN ('villa', 'attico', 'stazzo', 'terreno', 'appartamento')),
  price DECIMAL(15, 2), -- Sale price
  base_rate_daily DECIMAL(12, 2), -- Rental base rate
  address TEXT,
  city TEXT,
  lat_lng POINT, -- For map positioning
  sqm INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  features JSONB, -- { "pool": true, "sea_view": true, "spa": false, ... }
  tags TEXT[], -- ['Luxury', 'Privacy', 'Beachfront']
  images TEXT[], -- Array of image URLs (First is featured)
  video_url TEXT, -- Cinematic reveal link
  virtual_tour_url TEXT, -- 3D Tour
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'sold', 'rented', 'exclusive')),
  owner_id UUID REFERENCES profiles(id), -- For supplier/owner management
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Seasonal Pricing & Availability
CREATE TABLE property_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  season_name TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  daily_rate DECIMAL(12, 2) NOT NULL,
  min_stay_days INTEGER DEFAULT 7,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Favorites & Wishlists
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  notes TEXT, -- User personal notes on the property
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, property_id)
);

-- 5. Reviews & Feedback Archive
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified_stay BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Bookings & Reservations
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(15, 2),
  guest_count INTEGER DEFAULT 2,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Invoices & Financials
CREATE TABLE invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  invoice_number TEXT UNIQUE,
  amount DECIMAL(15, 2) NOT NULL,
  tax_amount DECIMAL(15, 2),
  file_url TEXT,
  status TEXT DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'overdue')),
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. CRM Leads & Valuations (Contacts)
CREATE TABLE valuations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, 
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  property_address TEXT NOT NULL,
  property_type TEXT,
  estimated_value DECIMAL(15, 2),
  notes TEXT,
  source TEXT DEFAULT 'web_form', -- web_form, phone, social, referral
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. Marketing Campaigns & Email Builder
CREATE TABLE marketing_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL, -- HTML or JSON for builder
  template_id TEXT, -- For reusability
  target_segment TEXT DEFAULT 'all' CHECK (target_segment IN ('all', 'platinum', 'owners', 'leads')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent')),
  stats JSONB DEFAULT '{"opens": 0, "clicks": 0, "bounces": 0}',
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 10. Documents Vault (Secure Storage)
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE, 
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT, -- pdf, jpg, zip, etc.
  category TEXT CHECK (category IN ('identity', 'contract', 'planimetry', 'invoice', 'report', 'other')),
  is_private BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 11. CRM Activity Log (Interaction History)
CREATE TABLE interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('call', 'email', 'meeting', 'whatsapp', 'viewing', 'note')),
  summary TEXT,
  details TEXT,
  interaction_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE valuations ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Security Policies (Basic Examples)
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Active properties are viewable by everyone." ON properties FOR SELECT USING (status != 'paused');

CREATE POLICY "Users can manage own favorites." ON favorites 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins have full access to everything." ON profiles 
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Functions & Triggers
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
