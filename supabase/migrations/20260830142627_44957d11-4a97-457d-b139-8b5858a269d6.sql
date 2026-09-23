-- ENUMS
CREATE TYPE public.app_role AS ENUM ('admin','priest','customer');
CREATE TYPE public.pooja_category AS ENUM ('pooja','homa','consultation');
CREATE TYPE public.service_variant AS ENUM ('pooja_only','pooja_with_items','online');
CREATE TYPE public.booking_status AS ENUM ('pending_payment','awaiting_confirmation','confirmed','completed','cancelled');
CREATE TYPE public.payment_method AS ENUM ('upi','card','netbanking');
CREATE TYPE public.payment_status AS ENUM ('pending','paid','failed','refunded');
CREATE TYPE public.payout_status AS ENUM ('pending','paid');
CREATE TYPE public.verification_status AS ENUM ('pending','approved','rejected');

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  pincode TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  mobile_verified BOOLEAN NOT NULL DEFAULT false,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "roles read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, email_verified)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name',''), NEW.email, NEW.email_confirmed_at IS NOT NULL)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.poojas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sanskrit_name TEXT,
  category public.pooja_category NOT NULL DEFAULT 'pooja',
  description TEXT NOT NULL DEFAULT '',
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  base_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  items_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.poojas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.poojas TO authenticated;
GRANT ALL ON public.poojas TO service_role;
ALTER TABLE public.poojas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "poojas public read" ON public.poojas FOR SELECT TO anon, authenticated USING (active);
CREATE POLICY "poojas admin write" ON public.poojas FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.priests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  full_name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'Vedic Priest',
  bio TEXT NOT NULL DEFAULT '',
  experience_years INTEGER NOT NULL DEFAULT 0,
  languages TEXT[] NOT NULL DEFAULT '{}',
  specialities TEXT[] NOT NULL DEFAULT '{}',
  phone TEXT,
  city TEXT NOT NULL DEFAULT '',
  latitude DOUBLE PRECISION NOT NULL DEFAULT 12.9716,
  longitude DOUBLE PRECISION NOT NULL DEFAULT 77.5946,
  service_radius_km INTEGER NOT NULL DEFAULT 15,
  photo_key TEXT,
  aadhaar_verified BOOLEAN NOT NULL DEFAULT false,
  status public.verification_status NOT NULL DEFAULT 'pending',
  rating NUMERIC(2,1) NOT NULL DEFAULT 5.0,
  reviews_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.priests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.priests TO authenticated;
GRANT ALL ON public.priests TO service_role;
ALTER TABLE public.priests ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER priests_updated BEFORE UPDATE ON public.priests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "approved priests public" ON public.priests FOR SELECT TO anon, authenticated USING (status = 'approved' OR user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "priest self enrol" ON public.priests FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "priest self update" ON public.priests FOR UPDATE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "priest admin delete" ON public.priests FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.is_priest_owner(_priest_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.priests WHERE id = _priest_id AND user_id = auth.uid());
$$;

CREATE TABLE public.priest_offerings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  priest_id UUID NOT NULL REFERENCES public.priests(id) ON DELETE CASCADE,
  pooja_id UUID NOT NULL REFERENCES public.poojas(id) ON DELETE CASCADE,
  price_pooja_only NUMERIC(10,2) NOT NULL,
  price_with_items NUMERIC(10,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE (priest_id, pooja_id)
);
GRANT SELECT ON public.priest_offerings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.priest_offerings TO authenticated;
GRANT ALL ON public.priest_offerings TO service_role;
ALTER TABLE public.priest_offerings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "offerings public read" ON public.priest_offerings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "offerings owner write" ON public.priest_offerings FOR ALL TO authenticated USING (public.is_priest_owner(priest_id) OR public.has_role(auth.uid(),'admin')) WITH CHECK (public.is_priest_owner(priest_id) OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.priest_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  priest_id UUID NOT NULL REFERENCES public.priests(id) ON DELETE CASCADE,
  available_date DATE NOT NULL,
  start_time TIME NOT NULL DEFAULT '06:00',
  end_time TIME NOT NULL DEFAULT '20:00',
  is_blocked BOOLEAN NOT NULL DEFAULT false,
  UNIQUE (priest_id, available_date, start_time)
);
GRANT SELECT ON public.priest_availability TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.priest_availability TO authenticated;
GRANT ALL ON public.priest_availability TO service_role;
ALTER TABLE public.priest_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "availability public read" ON public.priest_availability FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "availability owner write" ON public.priest_availability FOR ALL TO authenticated USING (public.is_priest_owner(priest_id) OR public.has_role(auth.uid(),'admin')) WITH CHECK (public.is_priest_owner(priest_id) OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE DEFAULT ('AEP-' || upper(substr(md5(random()::text),1,8))),
  customer_id UUID NOT NULL,
  priest_id UUID REFERENCES public.priests(id) ON DELETE SET NULL,
  pooja_id UUID REFERENCES public.poojas(id) ON DELETE SET NULL,
  variant public.service_variant NOT NULL DEFAULT 'pooja_only',
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL DEFAULT '09:00',
  muhurat_label TEXT,
  location_address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  status public.booking_status NOT NULL DEFAULT 'pending_payment',
  notes TEXT,
  cancellation_reason TEXT,
  cancellation_charge NUMERIC(10,2) NOT NULL DEFAULT 0,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER bookings_updated BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "bookings read" ON public.bookings FOR SELECT TO authenticated
  USING (customer_id = auth.uid() OR public.is_priest_owner(priest_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "bookings insert" ON public.bookings FOR INSERT TO authenticated WITH CHECK (customer_id = auth.uid());
CREATE POLICY "bookings update" ON public.bookings FOR UPDATE TO authenticated
  USING (customer_id = auth.uid() OR public.is_priest_owner(priest_id) OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (customer_id = auth.uid() OR public.is_priest_owner(priest_id) OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.owns_booking(_booking_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.bookings WHERE id = _booking_id AND customer_id = auth.uid());
$$;

CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  method public.payment_method NOT NULL,
  status public.payment_status NOT NULL DEFAULT 'pending',
  transaction_ref TEXT NOT NULL DEFAULT ('TXN' || upper(substr(md5(random()::text),1,10))),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payments read" ON public.payments FOR SELECT TO authenticated USING (public.owns_booking(booking_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "payments insert" ON public.payments FOR INSERT TO authenticated WITH CHECK (public.owns_booking(booking_id));
CREATE POLICY "payments admin update" ON public.payments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.priest_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  priest_id UUID NOT NULL REFERENCES public.priests(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  status public.payout_status NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.priest_payouts TO authenticated;
GRANT ALL ON public.priest_payouts TO service_role;
ALTER TABLE public.priest_payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payouts read" ON public.priest_payouts FOR SELECT TO authenticated USING (public.is_priest_owner(priest_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "payouts admin write" ON public.priest_payouts FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.customer_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.customer_queries TO anon;
GRANT SELECT, INSERT, UPDATE ON public.customer_queries TO authenticated;
GRANT ALL ON public.customer_queries TO service_role;
ALTER TABLE public.customer_queries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "queries anyone insert" ON public.customer_queries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "queries read" ON public.customer_queries FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "queries admin update" ON public.customer_queries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  festival_date DATE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  suggested_pooja TEXT
);
GRANT SELECT ON public.festivals TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.festivals TO authenticated;
GRANT ALL ON public.festivals TO service_role;
ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "festivals public read" ON public.festivals FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "festivals admin write" ON public.festivals FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_key TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
GRANT SELECT ON public.gallery_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gallery public read" ON public.gallery_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "gallery admin write" ON public.gallery_items FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.panchang (
  panchang_date DATE PRIMARY KEY,
  tithi TEXT NOT NULL,
  nakshatra TEXT NOT NULL,
  yoga TEXT NOT NULL,
  karana TEXT NOT NULL,
  vara TEXT NOT NULL,
  sunrise TIME NOT NULL DEFAULT '06:20',
  sunset TIME NOT NULL DEFAULT '18:35',
  rahu_kaal TEXT NOT NULL DEFAULT '10:30 – 12:00',
  abhijit_muhurat TEXT NOT NULL DEFAULT '12:14 – 12:58',
  auspicious_windows JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_auspicious BOOLEAN NOT NULL DEFAULT true
);
GRANT SELECT ON public.panchang TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.panchang TO authenticated;
GRANT ALL ON public.panchang TO service_role;
ALTER TABLE public.panchang ENABLE ROW LEVEL SECURITY;
CREATE POLICY "panchang public read" ON public.panchang FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "panchang admin write" ON public.panchang FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.platform_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.platform_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.platform_settings TO authenticated;
GRANT ALL ON public.platform_settings TO service_role;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings public read" ON public.platform_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings admin write" ON public.platform_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit admin read" ON public.audit_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "audit insert" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (actor_id = auth.uid());

INSERT INTO public.poojas (slug, name, sanskrit_name, category, description, duration_minutes, base_price, items_price) VALUES
('ganesha-pooja','Ganesha Pooja','गणेश पूजा','pooja','Invoke Vighnaharta before any new beginning — home, business or vehicle.',60,2100,900),
('satyanarayana-pooja','Satyanarayana Pooja','सत्यनारायण पूजा','pooja','The classic full-moon katha and pooja for prosperity and gratitude.',120,3100,1400),
('griha-pravesh','Griha Pravesh','गृह प्रवेश','pooja','House-warming vidhi with kalash sthapana and vastu shanti.',150,3500,1800),
('navagraha-homa','Navagraha Homa','नवग्रह होम','homa','Fire ceremony to balance the nine planetary influences in your chart.',180,6800,2600),
('ayushya-homa','Ayushya Homa','आयुष्य होम','homa','Birthday homa performed for long life, health and vitality.',120,5200,2100),
('rudrabhishekam','Rudrabhishekam','रुद्राभिषेक','pooja','Abhishekam to Lord Shiva with the Rudram chanting.',90,2800,1200),
('lakshmi-kubera','Lakshmi Kubera Pooja','लक्ष्मी कुबेर पूजा','pooja','For wealth, stability and the removal of financial obstacles.',75,2400,1000),
('online-consultation','Online Consultation','परामर्श','consultation','A 30-minute video consultation with a Vedic scholar on muhurta, remedies and rituals.',30,600,0);

INSERT INTO public.priests (id, full_name, title, bio, experience_years, languages, specialities, city, latitude, longitude, photo_key, aadhaar_verified, status, rating, reviews_count) VALUES
('11111111-1111-4111-8111-111111111111','Pandit Ravi Sharma','Vedic Priest','Trained at Kashi, Ravi ji has led over 3,000 household rituals across Bengaluru with a calm, unhurried style.',18,ARRAY['Kannada','Hindi','Sanskrit'],ARRAY['Ganesha Pooja','Satyanarayana Pooja','Griha Pravesh'],'Bengaluru',12.9784,77.6408,'p1',true,'approved',4.9,312),
('22222222-2222-4222-8222-222222222222','Acharya Suresh Gowda','Homa Specialist','A fourth-generation homa acharya known for precise agni rituals and clear explanations at every step.',24,ARRAY['Kannada','Telugu','Hindi'],ARRAY['Navagraha Homa','Ayushya Homa','Rudrabhishekam'],'Bengaluru',12.9352,77.6245,'p2',true,'approved',5.0,489),
('33333333-3333-4333-8333-333333333333','Pandita Meera Iyer','Griha Vidhi Priest','Meera ji specialises in griha pravesh and family rituals, and guides first-time hosts patiently.',11,ARRAY['Tamil','English','Sanskrit'],ARRAY['Griha Pravesh','Lakshmi Kubera Pooja','Online Consultation'],'Bengaluru',12.9141,77.6101,'p3',true,'approved',4.8,176);

INSERT INTO public.priest_offerings (priest_id, pooja_id, price_pooja_only, price_with_items)
SELECT p.id, j.id,
  ROUND(j.base_price * CASE p.photo_key WHEN 'p1' THEN 1.00 WHEN 'p2' THEN 1.22 ELSE 0.92 END),
  ROUND((j.base_price + j.items_price) * CASE p.photo_key WHEN 'p1' THEN 1.00 WHEN 'p2' THEN 1.22 ELSE 0.92 END)
FROM public.priests p CROSS JOIN public.poojas j;

INSERT INTO public.priest_availability (priest_id, available_date)
SELECT p.id, d::date FROM public.priests p CROSS JOIN generate_series(CURRENT_DATE, CURRENT_DATE + 45, '1 day') d;

INSERT INTO public.festivals (name, festival_date, description, suggested_pooja) VALUES
('Ganesh Chaturthi', CURRENT_DATE + 12, 'The arrival of Vighnaharta — install and worship the clay idol at home.', 'Ganesha Pooja'),
('Navaratri Begins', CURRENT_DATE + 34, 'Nine nights of Devi worship, kalash sthapana on day one.', 'Lakshmi Kubera Pooja'),
('Deepavali', CURRENT_DATE + 66, 'Lakshmi Pooja on Amavasya evening, lamps at every threshold.', 'Lakshmi Kubera Pooja'),
('Kartika Purnima', CURRENT_DATE + 82, 'Deep daan and Satyanarayana katha on the full moon.', 'Satyanarayana Pooja');

INSERT INTO public.gallery_items (title, image_key, sort_order) VALUES
('Rangoli yantra at dusk','g1',1),
('Row of lit diyas','g2',2),
('Sandalwood and marigold offerings','g3',3),
('Homa fire ritual','g4',4);

INSERT INTO public.panchang (panchang_date, tithi, nakshatra, yoga, karana, vara, rahu_kaal, abhijit_muhurat, auspicious_windows, is_auspicious)
SELECT d::date,
  (ARRAY['Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashti','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima'])[1 + ((d::date - CURRENT_DATE) + 304) % 15],
  (ARRAY['Rohini · रोहिणी','Mrigashira · मृगशिरा','Ardra · आर्द्रा','Punarvasu · पुनर्वसु','Pushya · पुष्य','Ashlesha · आश्लेषा','Magha · मघा','Uttara Ashadha · उत्तराषाढा','Shravana · श्रवण'])[1 + ((d::date - CURRENT_DATE) + 302) % 9],
  (ARRAY['Vyaghata','Harshana','Vajra','Siddhi','Shubha','Shukla','Brahma'])[1 + ((d::date - CURRENT_DATE) + 301) % 7],
  (ARRAY['Vishkambha','Bava','Balava','Kaulava','Taitila','Garaja'])[1 + ((d::date - CURRENT_DATE) + 301) % 6],
  trim(to_char(d,'Day')),
  (ARRAY['07:30 – 09:00','09:00 – 10:30','10:30 – 12:00','12:00 – 13:30','13:30 – 15:00','15:00 – 16:30','16:30 – 18:00'])[1 + ((d::date - CURRENT_DATE) + 301) % 7],
  '12:14 – 12:58',
  '[{"label":"Brahma Muhurat","time":"04:42 – 05:30"},{"label":"Abhijit","time":"12:14 – 12:58"},{"label":"Godhuli","time":"17:48 – 18:24"},{"label":"Amrit Kaal","time":"09:05 – 10:40"}]'::jsonb,
  (((d::date - CURRENT_DATE) + 301) % 9) <> 3
FROM generate_series(CURRENT_DATE - 2, CURRENT_DATE + 45, '1 day') d;

INSERT INTO public.platform_settings (key, value) VALUES
('discovery_radius_km','15'::jsonb),
('whatsapp_enabled','true'::jsonb),
('whatsapp_number','"919900112233"'::jsonb),
('cancellation_policy','{"free_hours":48,"charge_percent":25}'::jsonb);