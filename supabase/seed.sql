-- =============================================================================
-- SANGHATELANGANA — SUPABASE POSTGRESQL SEED DATA (STAGE 2)
-- =============================================================================

-- 1. SEED HERITAGE SITES (7 Sites)
INSERT INTO public.heritage_sites (
  id, name, slug, district, state, latitude, longitude, period, site_type,
  description, historical_summary, archaeological_status, opening_hours, facilities,
  accessibility, featured, image_url
) VALUES
(
  '11111111-1111-1111-1111-111111111101',
  'Phanigiri Buddhist Complex',
  'phanigiri',
  'Suryapet',
  'Telangana',
  17.3821,
  79.5492,
  'Satavahana & Ikshvaku Dynasty (1st c. BCE – 4th c. CE)',
  'Monastery & Maha Stupa Complex',
  'Perched atop a snake-hood shaped granite hillock, Phanigiri represents an apex of early Buddhist art in Telangana, renowned for monumental carved Torana gateway arches, octagonal Brahmi votive pillars, and expansive vihara residential quarters.',
  'Situated along the trade highway connecting coastal Andhra ports to western Deccan cities. Inscriptions discover royal donations by Ikshvaku queens, physicians, and resident acharyas.',
  'Archaeologically Verified (Protected State Monument)',
  '09:00 AM – 05:30 PM (Daily)',
  ARRAY['Visitor Centre', 'Signage', 'Drinking Water', 'Stone Pathway'],
  'Challenging (Granite rock-cut steps)',
  true,
  'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-1111-1111-1111-111111111102',
  'Dhulikatta Stupa & Fort',
  'dhulikatta',
  'Peddapalli',
  'Telangana',
  18.6654,
  79.3241,
  'Pre-Satavahana & Satavahana (3rd c. BCE – 2nd c. CE)',
  'Stupa & Fortified Settlement',
  'Ancient fortified mud rampart town with one of the oldest brick-built Maha Stupas in northern Telangana, renowned for 47 carved limestone Ayaka panels and the Muchalinda Naga relief.',
  'Mentioned by Megasthenes as one of the 30 fortified towns of the Andhras. Excavations yielded ivory combs, Roman coins, and Buddhist stupa drum casing slabs.',
  'Archaeologically Verified (ASI Catalogued)',
  '08:00 AM – 05:00 PM',
  ARRAY['Interpretive Boards', 'Local Guide Available'],
  'Flat terrain, easy access',
  true,
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-1111-1111-1111-111111111103',
  'Nelakondapalli Maha Stupa',
  'nelakondapalli',
  'Khammam',
  'Telangana',
  17.1528,
  80.0522,
  'Ikshvaku & Vishnukundin (3rd c. CE – 6th c. CE)',
  'Maha Stupa & Vihara Compound',
  'Massive solid brick stupa spanning 54 meters across, the largest preserved mud-and-brick Buddhist monument in Telangana. Famously yielded over 20 bronze Buddha icons and limestone votive stupas.',
  'Vibrant monastic university and pilgrimage hub connecting the Krishna valley to eastern maritime trading centers along the Bay of Bengal.',
  'Archaeologically Verified (State Protected)',
  '09:00 AM – 05:00 PM',
  ARRAY['Museum Gallery', 'Gardens', 'Rest Area', 'Parking'],
  'Wheelchair ramp to main stupa periphery',
  true,
  'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-1111-1111-1111-111111111104',
  'Nagarjunakonda Island Valley',
  'nagarjunakonda',
  'Nalgonda',
  'Telangana & AP Border',
  16.5256,
  79.2389,
  'Ikshvaku Dynasty Capital (2nd – 4th c. CE)',
  'Island Relocated University & Monasteries',
  'Ancient international Buddhist university and capital Vijayapuri founded by Acharya Nagarjuna. Features reconstructed Mahachaityas, apsidal chaityas, and Roman-influenced open-air theatres.',
  'Salvaged stone-by-stone during the construction of the Nagarjuna Sagar Dam. Houses an island ASI museum with exquisite limestone reliefs of the Ikshvaku court.',
  'Archaeologically Verified (ASI National Monument)',
  '09:00 AM – 04:00 PM (Requires ferry boat)',
  ARRAY['ASI Island Museum', 'Ferry Service', 'Cafeteria', 'Restrooms'],
  'Paved walkways on island; ferry boarding requires assistance',
  true,
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-1111-1111-1111-111111111105',
  'Kotilingala Riverside Monastery',
  'kotilingala',
  'Jagtial',
  'Telangana',
  18.9614,
  78.9812,
  'Early Satavahana (3rd c. BCE – 1st c. CE)',
  'Riverine Port & Monastic Settlement',
  'Ancient riverine port capital at the confluence of Godavari and Peddavagu, yielding the earliest punch-marked Buddhist coins of King Simuka and brick stupa vestiges.',
  'The earliest confirmed seat of power of the Satavahana dynasty with extensive wharf structures facilitating river transport of monks and merchants towards Magadha.',
  'Archaeologically Verified',
  'Sunrise to Sunset',
  ARRAY['River Ghats', 'Interpretive Signage'],
  'Gentle slope to river banks',
  false,
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-1111-1111-1111-111111111106',
  'Badankurthi River Island Hermitage',
  'badankurthi',
  'Nirmal',
  'Telangana',
  19.0412,
  78.5831,
  'Early Historic Satavahana (2nd c. BCE – 2nd c. CE)',
  'Island Hermitage & Meditation Retreat',
  'Serene Buddhist island hermitage nestled within the Godavari river, marked by early rock-cut steps, contemplative stone platforms, and ancient brick prayer shrines.',
  'Revered by wandering Buddhist monks (Bhikkhus) seeking secluded riverine hermitages along the dakshinapatha trade route toward Paithan.',
  'Under Scholarly Review',
  '08:00 AM – 05:00 PM (Requires local boat)',
  ARRAY['Rock-Cut Platforms'],
  'Requires country boat crossing',
  false,
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-1111-1111-1111-111111111107',
  'Kondapur Archaeological Complex',
  'kondapur',
  'Sangareddy',
  'Telangana',
  17.5512,
  78.0124,
  'Satavahana Period (1st c. BCE – 2nd c. CE)',
  'Urban Manufacturing & Buddhist Center',
  'Major Satavahana urban manufacturing and Buddhist monastic center renowned for Roman gold coins, terracotta Buddha figurines, and an on-site ASI museum.',
  'Excavated in the 1940s by Ghulam Yazdani; revealed circular stupas, chaityas, and thousands of terracotta beads and molds testifying to Hellenistic and Indian artistic synthesis.',
  'Archaeologically Verified (ASI Museum)',
  '10:00 AM – 05:00 PM (Closed Fridays)',
  ARRAY['ASI Site Museum', 'Rest Area', 'Parking'],
  'Paved, fully accessible',
  false,
  'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80'
)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED VIRTUAL TOURS (2 Tours)
INSERT INTO public.virtual_tours (id, site_id, title, panorama_url, description, duration)
VALUES
(
  '44444444-4444-4444-4444-444444444401',
  '11111111-1111-1111-1111-111111111101',
  'Phanigiri Hilltop Stupa & Monastic Complex Walkthrough',
  'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=80',
  '360° photogrammetric walkthrough across the snake-hood hillock of Phanigiri, capturing the Maha Stupa, Torana Gateway, and Vihara cloisters.',
  '25 mins'
),
(
  '44444444-4444-4444-4444-444444444402',
  '11111111-1111-1111-1111-111111111102',
  'Dhulikatta Ancient Fortified City & Mud Stupa Tour',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80',
  'Explore the 3rd century BCE ramparts of Dhulikatta and examine the carved Ayaka limestone casing slabs in high-resolution spherical projection.',
  '20 mins'
)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED TOUR STOPS (8 Stops)
INSERT INTO public.tour_stops (id, tour_id, name, description, latitude, longitude, audio_url, hotspot_position)
VALUES
('55555555-5555-5555-5555-555555555501', '44444444-4444-4444-4444-444444444401', 'Maha Stupa Drum & Pradakshinapatha', 'Central circular drum of 18 meters diameter enclosed by carved limestone ayaka panels.', 17.3821, 79.5492, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', '{"x": 35, "y": 55}'::jsonb),
('55555555-5555-5555-5555-555555555502', '44444444-4444-4444-4444-444444444401', 'Monolithic Torana Gateway Arch', 'Celebrated sandstone torana architrave illustrating the Great Renunciation.', 17.3822, 79.5493, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', '{"x": 65, "y": 45}'::jsonb),
('55555555-5555-5555-5555-555555555503', '44444444-4444-4444-4444-444444444401', 'Apsidal Chaityagriha Prayer Sanctuary', 'Apsidal worship hall overlooking the fertile Alair river valley.', 17.3823, 79.5491, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', '{"x": 20, "y": 30}'::jsonb),
('55555555-5555-5555-5555-555555555504', '44444444-4444-4444-4444-444444444401', 'Monks’ Vihara Residential Quadrangle', 'Individual monastic cells, dining refectory, and ancient rainwater cistern.', 17.3820, 79.5490, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', '{"x": 80, "y": 70}'::jsonb),
('55555555-5555-5555-5555-555555555505', '44444444-4444-4444-4444-444444444402', 'Fortified North Gateway & Moat', 'Ancient brick ramparts and gate guards described in Megasthenes’ records.', 18.6654, 79.3241, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', '{"x": 30, "y": 60}'::jsonb),
('55555555-5555-5555-5555-555555555506', '44444444-4444-4444-4444-444444444402', 'Dhulikatta Maha Stupa Drum', 'Early historic baked-brick hemispherical dome dating to Ashokan period.', 18.6655, 79.3242, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', '{"x": 50, "y": 40}'::jsonb),
('55555555-5555-5555-5555-555555555507', '44444444-4444-4444-4444-444444444402', 'Muchalinda Naga Ayaka Slab Spot', 'Findspot of the limestone relief depicting the seven-hooded serpent Muchalinda.', 18.6656, 79.3243, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', '{"x": 75, "y": 35}'::jsonb),
('55555555-5555-5555-5555-555555555508', '44444444-4444-4444-4444-444444444402', 'Ancient Granary & Residential Quarter', 'Subterranean grain storage rooms and lime-plastered floors of Satavahana city dwellers.', 18.6653, 79.3240, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', '{"x": 25, "y": 80}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED EVENTS (6 Events)
INSERT INTO public.events (id, site_id, name, description, start_date, end_date, location, verification_status)
VALUES
('66666666-6666-6666-6666-666666666601', '11111111-1111-1111-1111-111111111101', 'Buddha Purnima Global Dhamma Chanting', 'Annual full moon peace congregation with international monastic delegations, candle-lighting procession, and meditation atop the ancient Maha Stupa.', '2025-05-12', '2025-05-13', 'Phanigiri Buddhist Complex, Suryapet', 'Verified'),
('66666666-6666-6666-6666-666666666602', '11111111-1111-1111-1111-111111111102', 'National Archaeological Excavation Day & Site Walk', 'Field walk led by senior state archaeologists explaining trench strata, Ayaka platform construction, and early historic pottery identification.', '2025-08-20', '2025-08-20', 'Dhulikatta Buddhist Stupa, Peddapalli', 'Verified'),
('66666666-6666-6666-6666-666666666603', NULL, 'World Heritage Week: Deccan Buddhist Architecture Colloquium', 'Scholarly seminar presenting new 3D photogrammetric reconstructions of limestone toranas, Amaravati-school styles, and conservation charters.', '2025-11-19', '2025-11-25', 'State Archaeology Auditorium, Public Gardens, Hyderabad', 'Verified'),
('66666666-6666-6666-6666-666666666604', '11111111-1111-1111-1111-111111111103', 'Khammam Monastic Heritage Walking Tour', 'Guided educational walk across Nelakondapalli stupa, bronze discovery cells, and surrounding Satavahana era habitational mounds.', '2025-09-14', '2025-09-14', 'Nelakondapalli Stupa Complex, Khammam', 'Verified'),
('66666666-6666-6666-6666-666666666605', '11111111-1111-1111-1111-111111111104', 'Nagarjuna Philosophy & Madhyamaka Lecture Series', 'Distinguished lecture series exploring Acharya Nagarjuna’s philosophical treatises on Sunyata (Emptiness) and early Mahayana development.', '2025-10-04', '2025-10-06', 'Nagarjunakonda Island Auditorium, Nalgonda', 'Verified'),
('66666666-6666-6666-6666-666666666606', '11111111-1111-1111-1111-111111111105', 'Godavari Riverine Archaeology Pilgrimage & Boat Symposium', 'Historical expedition tracing the ancient water routes linking Kotilingala and Badankurthi with riverine epigraphical readings.', '2025-12-07', '2025-12-08', 'Kotilingala Wharf & Ghats, Jagtial', 'Verified')
ON CONFLICT (id) DO NOTHING;
