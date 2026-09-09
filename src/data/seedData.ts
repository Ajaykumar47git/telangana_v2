import {
  DbUser,
  DbHeritageSite,
  DbArtifact,
  DbInscription,
  DbVirtualTour,
  DbTourStop,
  DbEvent,
  DbContribution,
  DbFavorite,
  DbArchiveVersion
} from '../types/database';

// -----------------------------------------------------------------------------
// DEMO USERS
// -----------------------------------------------------------------------------
export const SEED_USERS: DbUser[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Dr. Radhika Sharma',
    email: 'admin@sanghatelangana.org',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Sri V. Venkataswamy',
    email: 'curator@sanghatelangana.org',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'curator',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Prof. Ananda Rao',
    email: 'researcher@sanghatelangana.org',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'researcher',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z'
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Pooja Reddy',
    email: 'contributor@sanghatelangana.org',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'contributor',
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z'
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'Kiran Kumar',
    email: 'visitor@sanghatelangana.org',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    role: 'visitor',
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  }
];

// -----------------------------------------------------------------------------
// 7 HERITAGE SITES
// -----------------------------------------------------------------------------
export const SEED_HERITAGE_SITES: DbHeritageSite[] = [
  {
    id: '11111111-1111-1111-1111-111111111101',
    name: 'Phanigiri Buddhist Complex',
    slug: 'phanigiri',
    district: 'Suryapet',
    state: 'Telangana',
    latitude: 17.3821,
    longitude: 79.5492,
    period: 'Satavahana & Ikshvaku Dynasty (1st c. BCE – 4th c. CE)',
    site_type: 'Monastery & Maha Stupa Complex',
    description: 'Perched atop a snake-hood shaped granite hillock, Phanigiri represents an apex of early Buddhist art in Telangana, renowned for monumental carved Torana gateway arches, octagonal Brahmi votive pillars, and expansive vihara residential quarters.',
    historical_summary: 'Situated along the trade highway connecting coastal Andhra ports to western Deccan cities. Inscriptions discover royal donations by Ikshvaku queens, physicians, and resident acharyas.',
    archaeological_status: 'Archaeologically Verified (Protected State Monument)',
    opening_hours: '09:00 AM – 05:30 PM (Daily)',
    facilities: ['Visitor Centre', 'Signage', 'Drinking Water', 'Stone Pathway'],
    accessibility: 'Challenging (Granite rock-cut steps)',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    source_reference: 'Department of Archaeology and Museums, Government of Telangana; Annual Report of the Department of Archaeology, Hyderabad; Epigraphia Indica, Vol. XXXVII.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11111111-1111-1111-1111-111111111102',
    name: 'Dhulikatta Stupa & Fort',
    slug: 'dhulikatta',
    district: 'Peddapalli',
    state: 'Telangana',
    latitude: 18.6654,
    longitude: 79.3241,
    period: 'Pre-Satavahana & Satavahana (3rd c. BCE – 2nd c. CE)',
    site_type: 'Stupa & Fortified Settlement',
    description: 'Ancient fortified mud rampart town with one of the oldest brick-built Maha Stupas in northern Telangana, renowned for 47 carved limestone Ayaka panels and the Muchalinda Naga relief.',
    historical_summary: 'Mentioned by Megasthenes as one of the 30 fortified towns of the Andhras. Excavations yielded ivory combs, Roman coins, and Buddhist stupa drum casing slabs.',
    archaeological_status: 'Archaeologically Verified (ASI Catalogued)',
    opening_hours: '08:00 AM – 05:00 PM',
    facilities: ['Interpretive Boards', 'Local Guide Available'],
    accessibility: 'Flat terrain, easy access',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    source_reference: 'V.V. Krishna Sastry, The Proto and Early Historical Cultures of Andhra Pradesh (1983); Indian Archaeology 1975–76: A Review, pp. 2–3.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11111111-1111-1111-1111-111111111103',
    name: 'Nelakondapalli Maha Stupa',
    slug: 'nelakondapalli',
    district: 'Khammam',
    state: 'Telangana',
    latitude: 17.1528,
    longitude: 80.0522,
    period: 'Ikshvaku & Vishnukundin (3rd c. CE – 6th c. CE)',
    site_type: 'Maha Stupa & Vihara Compound',
    description: 'Massive solid brick stupa spanning 54 meters across, the largest preserved mud-and-brick Buddhist monument in Telangana. Famously yielded over 20 bronze Buddha icons and limestone votive stupas.',
    historical_summary: 'Vibrant monastic university and pilgrimage hub connecting the Krishna valley to eastern maritime trading centers along the Bay of Bengal.',
    archaeological_status: 'Archaeologically Verified (State Protected)',
    opening_hours: '09:00 AM – 05:00 PM',
    facilities: ['Museum Gallery', 'Gardens', 'Rest Area', 'Parking'],
    accessibility: 'Wheelchair ramp to main stupa periphery',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    source_reference: 'Department of Archaeology and Museums, Excavations at Nelakondapalli (1977–1985); Bulletin of the State Archaeology Museum Hyderabad.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11111111-1111-1111-1111-111111111104',
    name: 'Nagarjunakonda Island Valley',
    slug: 'nagarjunakonda',
    district: 'Nalgonda',
    state: 'Telangana & AP Border',
    latitude: 16.5256,
    longitude: 79.2389,
    period: 'Ikshvaku Dynasty Capital (2nd – 4th c. CE)',
    site_type: 'Island Relocated University & Monasteries',
    description: 'Ancient international Buddhist university and capital Vijayapuri founded by Acharya Nagarjuna. Features reconstructed Mahachaityas, apsidal chaityas, and Roman-influenced open-air theatres.',
    historical_summary: 'Salvaged stone-by-stone during the construction of the Nagarjuna Sagar Dam. Houses an island ASI museum with exquisite limestone reliefs of the Ikshvaku court.',
    archaeological_status: 'Archaeologically Verified (ASI National Monument)',
    opening_hours: '09:00 AM – 04:00 PM (Requires ferry boat)',
    facilities: ['ASI Island Museum', 'Ferry Service', 'Cafeteria', 'Restrooms'],
    accessibility: 'Paved walkways on island; ferry boarding requires assistance',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    source_reference: 'Archaeological Survey of India, Memoirs of the ASI No. 54 & 71; A.H. Longhurst, The Buddhist Antiquities of Nagarjunakonda (1938).',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11111111-1111-1111-1111-111111111105',
    name: 'Kotilingala Riverside Monastery',
    slug: 'kotilingala',
    district: 'Jagtial',
    state: 'Telangana',
    latitude: 18.9614,
    longitude: 78.9812,
    period: 'Early Satavahana (3rd c. BCE – 1st c. CE)',
    site_type: 'Riverine Port & Monastic Settlement',
    description: 'Ancient riverine port capital at the confluence of Godavari and Peddavagu, yielding the earliest punch-marked Buddhist coins of King Simuka and brick stupa vestiges.',
    historical_summary: 'The earliest confirmed seat of power of the Satavahana dynasty with extensive wharf structures facilitating river transport of monks and merchants towards Magadha.',
    archaeological_status: 'Archaeologically Verified',
    opening_hours: 'Sunrise to Sunset',
    facilities: ['River Ghats', 'Interpretive Signage'],
    accessibility: 'Gentle slope to river banks',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    source_reference: 'P.V. Parabrahma Sastry, Coins of the Satavahanas and Pre-Satavahanas from Kotilingala, Journal of the Numismatic Society of India (1981).',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11111111-1111-1111-1111-111111111106',
    name: 'Badankurthi River Island Hermitage',
    slug: 'badankurthi',
    district: 'Nirmal',
    state: 'Telangana',
    latitude: 19.0412,
    longitude: 78.5831,
    period: 'Early Historic Satavahana (2nd c. BCE – 2nd c. CE)',
    site_type: 'Island Hermitage & Meditation Retreat',
    description: 'Serene Buddhist island hermitage nestled within the Godavari river, marked by early rock-cut steps, contemplative stone platforms, and ancient brick prayer shrines.',
    historical_summary: 'Revered by wandering Buddhist monks (Bhikkhus) seeking secluded riverine hermitages along the dakshinapatha trade route toward Paithan.',
    archaeological_status: 'Under Scholarly Review',
    opening_hours: '08:00 AM – 05:00 PM (Requires local boat)',
    facilities: ['Rock-Cut Platforms'],
    accessibility: 'Requires country boat crossing',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    source_reference: 'Archaeological Reconnaissance Survey of Upper Godavari Valley (Telangana State Archaeology, 2018).',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11111111-1111-1111-1111-111111111107',
    name: 'Kondapur Archaeological Complex',
    slug: 'kondapur',
    district: 'Sangareddy',
    state: 'Telangana',
    latitude: 17.5512,
    longitude: 78.0124,
    period: 'Satavahana Period (1st c. BCE – 2nd c. CE)',
    site_type: 'Urban Manufacturing & Buddhist Center',
    description: 'Major Satavahana urban manufacturing and Buddhist monastic center renowned for Roman gold coins, terracotta Buddha figurines, and an on-site ASI museum.',
    historical_summary: 'Excavated in the 1940s by Ghulam Yazdani; revealed circular stupas, chaityas, and thousands of terracotta beads and molds testifying to Hellenistic and Indian artistic synthesis.',
    archaeological_status: 'Archaeologically Verified (ASI Museum)',
    opening_hours: '10:00 AM – 05:00 PM (Closed Fridays)',
    facilities: ['ASI Site Museum', 'Rest Area', 'Parking'],
    accessibility: 'Paved, fully accessible',
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    source_reference: 'Ghulam Yazdani, Excavations at Kondapur, Annals of the Bhandarkar Oriental Research Institute, Vol. 22 (1941), pp. 171–185.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// -----------------------------------------------------------------------------
// 20 ARTIFACTS
// -----------------------------------------------------------------------------
export const SEED_ARTIFACTS: DbArtifact[] = [
  {
    id: '22222222-2222-2222-2222-222222222201',
    site_id: '11111111-1111-1111-1111-111111111101',
    name: 'Phanigiri Torana Carved Architrave',
    slug: 'phanigiri-torana-architrave',
    type: 'Sculptures',
    period: 'Ikshvaku Dynasty (3rd c. CE)',
    material: 'Palnadu Greenish-White Limestone',
    description: 'Superbly carved architrave illustrating the Mahabhinishkramana (Great Renunciation). Siddhartha leaves the palace while celestials hold his horse Kanthaka’s hooves to prevent sound.',
    provenance: 'Northeast quadrant of Maha Stupa at Phanigiri (2001)',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-PHN-2001-084',
    dimensions: '210 cm × 45 cm × 28 cm',
    current_location: 'State Museum, Public Gardens, Hyderabad',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222202',
    site_id: '11111111-1111-1111-1111-111111111101',
    name: 'Brahmi Inscribed Ayaka Octagonal Pillar',
    slug: 'phanigiri-ayaka-pillar',
    type: 'Inscriptions',
    period: 'Satavahana / Ikshvaku (2nd–3rd c. CE)',
    material: 'Fine-grained Sandstone',
    description: 'Monolithic pillar bearing 8 lines of deeply incised Brahmi script recording a pious grant by royal physician Dharmasena for the welfare of all sentient beings.',
    provenance: 'South cardinal Ayaka projection, Phanigiri Stupa drum',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-PHN-2005-012',
    dimensions: '185 cm height, 38 cm diameter',
    current_location: 'Phanigiri Site Interpretation Centre',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222203',
    site_id: '11111111-1111-1111-1111-111111111102',
    name: 'Muchalinda Naga Protective Relief',
    slug: 'muchalinda-naga-protective-relief',
    type: 'Sculptures',
    period: 'Early Satavahana (2nd c. BCE)',
    material: 'Limestone Casing Relief',
    description: 'Dynamic relief depicting the multi-headed serpent king Muchalinda coiled beneath the empty throne, sheltering the Buddha from storm waters.',
    provenance: 'Eastern Ayaka casing, Dhulikatta Maha Stupa',
    image_url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    verification_status: 'ASI Catalogued',
    accession_number: 'ASI-DKT-1976-004',
    dimensions: '112 cm × 68 cm × 18 cm',
    current_location: 'Karimnagar Heritage Museum',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222204',
    site_id: '11111111-1111-1111-1111-111111111103',
    name: 'Standing Bronze Buddha of Nelakondapalli',
    slug: 'nelakondapalli-standing-bronze-buddha',
    type: 'Sculptures',
    period: 'Ikshvaku / Vishnukundin (4th–5th c. CE)',
    material: 'Cast Copper-Bronze Alloy (Lost-Wax)',
    description: 'Exquisitely preserved cast bronze Buddha showing Abhayamudra with clinging diaphanous drapery folds reminiscent of Amaravati metalwork traditions.',
    provenance: 'Monastic vihara cell 4, Nelakondapalli (1984)',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-NKP-1984-019',
    dimensions: '82 cm × 24 cm × 16 cm (Weight: 14.5 kg)',
    current_location: 'Telangana State Archaeology Museum, Hyderabad',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222205',
    site_id: '11111111-1111-1111-1111-111111111105',
    name: 'Satavahana King Simuka Punch-Marked Coin',
    slug: 'satavahana-king-simuka-coin',
    type: 'Coins',
    period: 'Early Satavahana (3rd c. BCE)',
    material: 'Potin (Lead-Copper Alloy)',
    description: 'Early dynasty coinage minted at Kotilingala bearing the ancient Brahmi legend "Rano Siri Chimuka Sata" and auspicious Buddhist triratna and river emblems.',
    provenance: 'Excavated river wharf deposit, Kotilingala (1979)',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'NUMIS-KTL-79-108',
    dimensions: '22 mm diameter, 3.8 grams',
    current_location: 'Cabinet of Coins, State Museum, Hyderabad',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222206',
    site_id: '11111111-1111-1111-1111-111111111104',
    name: 'Nagarjunakonda Limestone Ayaka Frieze',
    slug: 'nagarjunakonda-ayaka-frieze',
    type: 'Sculptures',
    period: 'Ikshvaku Dynasty (3rd c. CE)',
    material: 'Palnadu Marble / Limestone',
    description: 'Carved panel illustrating the Subjugation of Nalagiri elephant in Rajagriha. Dynamic crowd movement demonstrates mature Ikshvaku naturalism.',
    provenance: 'Site 9, Stupa casing, Nagarjunakonda valley (1956)',
    image_url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'ASI-NJK-56-342',
    dimensions: '142 cm × 58 cm × 22 cm',
    current_location: 'Nagarjunakonda Island Museum',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222207',
    site_id: '11111111-1111-1111-1111-111111111107',
    name: 'Kondapur Roman Aureus of Tiberius',
    slug: 'kondapur-roman-aureus',
    type: 'Coins',
    period: 'Roman Empire / Satavahana Contact (1st c. CE)',
    material: 'High-Purity Gold (24 Karat)',
    description: 'Roman gold aureus of Emperor Tiberius Caesar Augustus, slashed across the bust to demonetize it into bullion for local inland Deccan exchange.',
    provenance: 'Strata III, Chaityagriha precinct, Kondapur (1941)',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'ASI-KDP-41-002',
    dimensions: '19 mm diameter, 7.8 grams',
    current_location: 'ASI Site Museum, Kondapur',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222208',
    site_id: '11111111-1111-1111-1111-111111111101',
    name: 'Phanigiri Limestone Dharmachakra Relief',
    slug: 'phanigiri-dharmachakra-relief',
    type: 'Sculptures',
    period: 'Satavahana Period (2nd c. CE)',
    material: 'White Crystalline Limestone',
    description: 'Aniconic representation of the Wheel of Law resting on an ornamental triratna standard, flanked by flying gandharvas carrying floral garlands.',
    provenance: 'Outer pradakshinapatha floor slab, Phanigiri',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-PHN-2003-045',
    dimensions: '94 cm × 72 cm × 15 cm',
    current_location: 'State Museum, Hyderabad',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222209',
    site_id: '11111111-1111-1111-1111-111111111102',
    name: 'Dhulikatta Carved Ivory Comb',
    slug: 'dhulikatta-carved-ivory-comb',
    type: 'Manuscripts',
    period: 'Satavahana Period (1st c. BCE)',
    material: 'Carved Elephant Ivory',
    description: 'Double-sided toilet comb incised on both faces with an erotic Mithuna couple on one side and a caparisoned elephant carrying a lotus on the other.',
    provenance: 'Residential habitation trench IV, Dhulikatta fort',
    image_url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-DKT-1977-089',
    dimensions: '11 cm × 7.5 cm × 0.8 cm',
    current_location: 'Karimnagar District Heritage Museum',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222210',
    site_id: '11111111-1111-1111-1111-111111111107',
    name: 'Kondapur Double-Spouted Buddhist Terracotta Vessel',
    slug: 'kondapur-terracotta-vessel',
    type: 'Pottery',
    period: 'Satavahana Period (1st c. CE)',
    material: 'Red Slipped Terracotta',
    description: 'Ritual sprinkler vessel (Kundika) used by Buddhist monks for water purification, decorated with stamped rosette seals and braided handles.',
    provenance: 'Pottery kiln area, Kondapur',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'ASI-KDP-41-114',
    dimensions: '28 cm height, 18 cm diameter',
    current_location: 'ASI Site Museum, Kondapur',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222211',
    site_id: '11111111-1111-1111-1111-111111111103',
    name: 'Nelakondapalli Votive Stupa Casing',
    slug: 'nelakondapalli-votive-casing',
    type: 'Architecture',
    period: 'Ikshvaku Period (3rd c. CE)',
    material: 'Palnadu Limestone Slab',
    description: 'Votive relief slab depicting a multi-tiered Chaityagriha flanked by yaksha guardians and auspicious kalasha pots.',
    provenance: 'North Pradakshina, Nelakondapalli Maha Stupa',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-NKP-1985-052',
    dimensions: '120 cm × 55 cm × 14 cm',
    current_location: 'Nelakondapalli On-Site Interpretation Gallery',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222212',
    site_id: '11111111-1111-1111-1111-111111111101',
    name: 'Phanigiri Bodhisattva Avalokiteshvara Head',
    slug: 'phanigiri-bodhisattva-head',
    type: 'Sculptures',
    period: 'Ikshvaku / Post-Ikshvaku (4th c. CE)',
    material: 'Carved Limestone',
    description: 'Expressive sculpted head of Bodhisattva with ornate ushnisha, intricate jeweled crown with miniature Amitabha figure in the crest, and serene meditative eyes.',
    provenance: 'Vihara monastic courtyard, Phanigiri',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-PHN-2007-009',
    dimensions: '34 cm × 22 cm × 24 cm',
    current_location: 'Telangana State Archaeology Museum, Hyderabad',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222213',
    site_id: '11111111-1111-1111-1111-111111111105',
    name: 'Kotilingala Srivatsa Symbol Terracotta Seal',
    slug: 'kotilingala-terracotta-seal',
    type: 'Pottery',
    period: 'Early Satavahana (2nd c. BCE)',
    material: 'Baked Terracotta Impression',
    description: 'Merchant guild clay sealing displaying the auspicious Srivatsa and Nandipada emblems with a circumscribed Brahmi merchant title.',
    provenance: 'Trench III, River wharf warehouse, Kotilingala',
    image_url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-KTL-80-043',
    dimensions: '42 mm diameter, 12 mm thick',
    current_location: 'State Museum, Hyderabad',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222214',
    site_id: '11111111-1111-1111-1111-111111111104',
    name: 'Nagarjunakonda Chhamtisiri Memorial Inscription',
    slug: 'nagarjunakonda-chhamtisiri-inscription',
    type: 'Inscriptions',
    period: 'Ikshvaku Dynasty (3rd c. CE)',
    material: 'Limestone Pillar Inscription',
    description: 'Royal inscription documenting the pious donations of Queen Chhamtisiri, sister of King Santamula I, who patronized the construction of the Great Chaitya.',
    provenance: 'Maha Chaitya Site 1, Nagarjunakonda',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'ASI-NJK-58-102',
    dimensions: '165 cm height, 32 cm width',
    current_location: 'Nagarjunakonda Island Museum',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222215',
    site_id: '11111111-1111-1111-1111-111111111106',
    name: 'Badankurthi Hermitage Stone Medallion',
    slug: 'badankurthi-stone-medallion',
    type: 'Architecture',
    period: 'Satavahana (1st c. BCE)',
    material: 'Granite Relief Medallion',
    description: 'Circular granite carving with blooming lotus petals representing the purity of the Sangha in riverine hermitage isolation.',
    provenance: 'Rock shelter steps, Badankurthi Island',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Illustrative Reconstruction',
    accession_number: 'TS-EXP-BDK-2018-002',
    dimensions: '45 cm diameter',
    current_location: 'Nirmal District Archives',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222216',
    site_id: '11111111-1111-1111-1111-111111111107',
    name: 'Kondapur Terracotta Yaksha Plaque',
    slug: 'kondapur-yaksha-plaque',
    type: 'Pottery',
    period: 'Satavahana (1st c. CE)',
    material: 'Moulded Clay Terracotta',
    description: 'Charming dwarf Yaksha with pot-belly, beaded necklace, and curly hair bearing Hellenistic aesthetic touches from Kondapur workshops.',
    provenance: 'Mound 2, Kondapur',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    verification_status: 'ASI Catalogued',
    accession_number: 'ASI-KDP-42-088',
    dimensions: '18 cm × 14 cm × 4 cm',
    current_location: 'ASI Site Museum, Kondapur',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222217',
    site_id: '11111111-1111-1111-1111-111111111102',
    name: 'Dhulikatta Buddhist Relic Casket Lid',
    slug: 'dhulikatta-relic-casket-lid',
    type: 'Pottery',
    period: 'Pre-Satavahana (3rd c. BCE)',
    material: 'Turned Steatite Stone',
    description: 'Incised dome lid of a sacred stupa bone-relic casket turned on a lathe with concentric ring motifs.',
    provenance: 'Central stupa relic chamber, Dhulikatta',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'ASI-DKT-1976-021',
    dimensions: '14 cm diameter, 8 cm height',
    current_location: 'State Museum, Hyderabad',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222218',
    site_id: '11111111-1111-1111-1111-111111111101',
    name: 'Phanigiri Inscribed Footprint (Buddhapaduka) Slab',
    slug: 'phanigiri-buddhapada-slab',
    type: 'Inscriptions',
    period: 'Satavahana Period (1st–2nd c. CE)',
    material: 'Palnadu Limestone',
    description: 'Sacred stone slab carved with the two holy footprints of Buddha adorned with Dharmachakra, Triratna, Matsya (fish), and Swastika auspicious emblems.',
    provenance: 'Pradakshinapatha gateway, Phanigiri',
    image_url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-PHN-2004-018',
    dimensions: '75 cm × 62 cm × 12 cm',
    current_location: 'Phanigiri Site Interpretation Centre',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222219',
    site_id: '11111111-1111-1111-1111-111111111103',
    name: 'Nelakondapalli Terracotta Miniature Chaitya',
    slug: 'nelakondapalli-miniature-chaitya',
    type: 'Architecture',
    period: 'Vishnukundin (5th c. CE)',
    material: 'Baked Clay Terracotta',
    description: 'Votive clay model of an apsidal barrel-vaulted chaitya hall offered by visiting pilgrims at Nelakondapalli.',
    provenance: 'Monastic cell area, Nelakondapalli',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'TS-ARCH-NKP-1986-077',
    dimensions: '22 cm × 16 cm × 18 cm',
    current_location: 'Nelakondapalli Site Gallery',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222220',
    site_id: '11111111-1111-1111-1111-111111111105',
    name: 'Kotilingala Silver Punch-Marked Karshapana',
    slug: 'kotilingala-silver-karshapana',
    type: 'Coins',
    period: 'Mauryan Imperial Era (3rd c. BCE)',
    material: 'Silver Sheet',
    description: 'Imperial punch-marked silver coin with five punches including the solar symbol, six-armed symbol, and hill with crescent (Chaitya symbol).',
    provenance: 'River bank strata, Kotilingala',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    verification_status: 'Archaeologically Verified',
    accession_number: 'NUMIS-KTL-81-012',
    dimensions: '16 mm × 14 mm, 3.4 grams',
    current_location: 'State Museum, Hyderabad',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// -----------------------------------------------------------------------------
// 8 INSCRIPTIONS
// -----------------------------------------------------------------------------
export const SEED_INSCRIPTIONS: DbInscription[] = [
  {
    id: '33333333-3333-3333-3333-333333333301',
    site_id: '11111111-1111-1111-1111-111111111101',
    title: 'Phanigiri Octagonal Ayaka Pillar Inscription of Dharmasena',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    ocr_text: 'Siddham! Rano Vasishthiputrasya Siri Santamulasya samvatsare...',
    transcription: 'Siddham! Rano Vasishthiputrasya Siri Santamulasya samvatsare vijaye... Acharya Bodhikasa sishya Bhikshu Dharmasenena ayaka thabho patithapito sabba-sattanam hitasukhaya.',
    translation: 'Success! In the victorious regnal year of King Vasishthiputra Siri Santamula, the royal physician and monk Dharmasena, disciple of Acharya Bodhika, has established this Ayaka pillar for the welfare and happiness of all sentient beings.',
    language: 'Prakrit in Middle Brahmi Script',
    estimated_date: 'Circa 275 CE (Ikshvaku Dynasty)',
    confidence_score: 0.98,
    verification_status: 'Archaeologically Verified',
    reviewer_id: '00000000-0000-0000-0000-000000000002',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33333333-3333-3333-3333-333333333302',
    site_id: '11111111-1111-1111-1111-111111111101',
    title: 'Phanigiri Torana Architrave Dedicatory Label',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    ocr_text: 'Dhammakathikasa Mahagandhakarasa dayadhamma torana...',
    transcription: 'Dhammakathikasa Mahagandhakarasa dayadhamma torana patithapita...',
    translation: 'The pious gift of a decorative gateway (torana) by the venerable preacher of Dhamma and monk residing at the hill monastery.',
    language: 'Prakrit in Late Brahmi',
    estimated_date: '3rd Century CE',
    confidence_score: 0.94,
    verification_status: 'Archaeologically Verified',
    reviewer_id: '00000000-0000-0000-0000-000000000002',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33333333-3333-3333-3333-333333333303',
    site_id: '11111111-1111-1111-1111-111111111102',
    title: 'Dhulikatta Stupa Votive Casing Brahmi Inscription',
    image_url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    ocr_text: 'Gahapatino Samanasa putasa danam silapato...',
    transcription: 'Gahapatino Samanasa putasa danam silapato.',
    translation: 'The stone slab gift of the householder Samana’s son for the stupa terrace.',
    language: 'Early Prakrit in Ashokan / Early Satavahana Brahmi',
    estimated_date: '2nd Century BCE',
    confidence_score: 0.96,
    verification_status: 'ASI Catalogued',
    reviewer_id: '00000000-0000-0000-0000-000000000003',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33333333-3333-3333-3333-333333333304',
    site_id: '11111111-1111-1111-1111-111111111104',
    title: 'Nagarjunakonda Queen Bhatidevi Votive Inscription',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    ocr_text: 'Namo Bhagavato Sammambuddhassa! Mahadevya Bhatidevya...',
    transcription: 'Namo Bhagavato Sammambuddhassa! Mahadevya Bhatidevya viharo karitavya.',
    translation: 'Adoration to the Blessed One, the Perfectly Enlightened! Queen Bhatidevi, daughter-in-law of King Santamula, has caused this monastery to be built for the monks of the Bahushrutiya school.',
    language: 'Prakrit with Sanskrit influence in Ikshvaku Brahmi',
    estimated_date: 'Circa 280 CE',
    confidence_score: 0.99,
    verification_status: 'Archaeologically Verified',
    reviewer_id: '00000000-0000-0000-0000-000000000003',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33333333-3333-3333-3333-333333333305',
    site_id: '11111111-1111-1111-1111-111111111105',
    title: 'Kotilingala King Gobhada Coin Legend Inscription',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    ocr_text: 'Rano Gobhadhasa...',
    transcription: 'Rano Gobhadhasa (In early Brahmi characters over bull motif).',
    translation: 'Coin of King Gobhada (Pre-Satavahana ruler of Godavari basin).',
    language: 'Archaic Prakrit in Early Brahmi',
    estimated_date: 'Circa 220 BCE',
    confidence_score: 0.92,
    verification_status: 'Archaeologically Verified',
    reviewer_id: '00000000-0000-0000-0000-000000000002',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33333333-3333-3333-3333-333333333306',
    site_id: '11111111-1111-1111-1111-111111111103',
    title: 'Nelakondapalli Limestone Slab Donor Record',
    image_url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    ocr_text: 'Therasa Buddhavanasa upasikaya...',
    transcription: 'Therasa Buddhavanasa upasikaya Bodhisiriya danam.',
    translation: 'The gift of the laywoman Bodhisiri, devotee of the Elder Buddhavana.',
    language: 'Prakrit in Brahmi',
    estimated_date: '3rd Century CE',
    confidence_score: 0.95,
    verification_status: 'Archaeologically Verified',
    reviewer_id: '00000000-0000-0000-0000-000000000002',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33333333-3333-3333-3333-333333333307',
    site_id: '11111111-1111-1111-1111-111111111107',
    title: 'Kondapur Seal Impression with Monastic Title',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    ocr_text: 'Kondapura Mahasanghika...',
    transcription: 'Kondapura Mahasanghika bhikshu samghasa.',
    translation: 'Belonging to the congregation of monks of the Mahasanghika school at Kondapur.',
    language: 'Prakrit in Brahmi',
    estimated_date: '1st Century CE',
    confidence_score: 0.91,
    verification_status: 'ASI Catalogued',
    reviewer_id: '00000000-0000-0000-0000-000000000003',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33333333-3333-3333-3333-333333333308',
    site_id: '11111111-1111-1111-1111-111111111101',
    title: 'Phanigiri Buddhapaduka Consecration Inscription',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    ocr_text: 'Bhadanta Nanda-putasa paduka patithapita...',
    transcription: 'Bhadanta Nanda-putasa paduka patithapita lokahitaye.',
    translation: 'The holy footprints established by the son of venerable Nanda for the welfare of the world.',
    language: 'Prakrit in Brahmi',
    estimated_date: '2nd Century CE',
    confidence_score: 0.97,
    verification_status: 'Archaeologically Verified',
    reviewer_id: '00000000-0000-0000-0000-000000000002',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// -----------------------------------------------------------------------------
// 2 VIRTUAL TOURS
// -----------------------------------------------------------------------------
export const SEED_VIRTUAL_TOURS: DbVirtualTour[] = [
  {
    id: '44444444-4444-4444-4444-444444444401',
    site_id: '11111111-1111-1111-1111-111111111101',
    title: 'Phanigiri Hilltop Stupa & Monastic Complex Walkthrough',
    panorama_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=80',
    description: '360° photogrammetric walkthrough across the snake-hood hillock of Phanigiri, capturing the Maha Stupa, Torana Gateway, and Vihara cloisters.',
    duration: '25 mins',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '44444444-4444-4444-4444-444444444402',
    site_id: '11111111-1111-1111-1111-111111111102',
    title: 'Dhulikatta Ancient Fortified City & Mud Stupa Tour',
    panorama_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80',
    description: 'Explore the 3rd century BCE ramparts of Dhulikatta and examine the carved Ayaka limestone casing slabs in high-resolution spherical projection.',
    duration: '20 mins',
    created_at: '2024-01-01T00:00:00Z'
  }
];

// -----------------------------------------------------------------------------
// 8 TOUR STOPS
// -----------------------------------------------------------------------------
export const SEED_TOUR_STOPS: DbTourStop[] = [
  // Phanigiri Tour Stops (4)
  {
    id: '55555555-5555-5555-5555-555555555501',
    tour_id: '44444444-4444-4444-4444-444444444401',
    name: 'Maha Stupa Drum & Pradakshinapatha',
    description: 'Central circular drum of 18 meters diameter enclosed by carved limestone ayaka panels.',
    latitude: 17.3821,
    longitude: 79.5492,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    hotspot_position: { x: 35, y: 55 }
  },
  {
    id: '55555555-5555-5555-5555-555555555502',
    tour_id: '44444444-4444-4444-4444-444444444401',
    name: 'Monolithic Torana Gateway Arch',
    description: 'Celebrated sandstone torana architrave illustrating the Great Renunciation.',
    latitude: 17.3822,
    longitude: 79.5493,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    hotspot_position: { x: 65, y: 45 }
  },
  {
    id: '55555555-5555-5555-5555-555555555503',
    tour_id: '44444444-4444-4444-4444-444444444401',
    name: 'Apsidal Chaityagriha Prayer Sanctuary',
    description: 'Apsidal worship hall overlooking the fertile Alair river valley.',
    latitude: 17.3823,
    longitude: 79.5491,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    hotspot_position: { x: 20, y: 30 }
  },
  {
    id: '55555555-5555-5555-5555-555555555504',
    tour_id: '44444444-4444-4444-4444-444444444401',
    name: 'Monks’ Vihara Residential Quadrangle',
    description: 'Individual monastic cells, dining refectory, and ancient rainwater cistern.',
    latitude: 17.382,
    longitude: 79.549,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    hotspot_position: { x: 80, y: 70 }
  },

  // Dhulikatta Tour Stops (4)
  {
    id: '55555555-5555-5555-5555-555555555505',
    tour_id: '44444444-4444-4444-4444-444444444402',
    name: 'Fortified North Gateway & Moat',
    description: 'Ancient brick ramparts and gate guards described in Megasthenes’ records.',
    latitude: 18.6654,
    longitude: 79.3241,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    hotspot_position: { x: 30, y: 60 }
  },
  {
    id: '55555555-5555-5555-5555-555555555506',
    tour_id: '44444444-4444-4444-4444-444444444402',
    name: 'Dhulikatta Maha Stupa Drum',
    description: 'Early historic baked-brick hemispherical dome dating to Ashokan period.',
    latitude: 18.6655,
    longitude: 79.3242,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    hotspot_position: { x: 50, y: 40 }
  },
  {
    id: '55555555-5555-5555-5555-555555555507',
    tour_id: '44444444-4444-4444-4444-444444444402',
    name: 'Muchalinda Naga Ayaka Slab Spot',
    description: 'Findspot of the limestone relief depicting the seven-hooded serpent Muchalinda.',
    latitude: 18.6656,
    longitude: 79.3243,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    hotspot_position: { x: 75, y: 35 }
  },
  {
    id: '55555555-5555-5555-5555-555555555508',
    tour_id: '44444444-4444-4444-4444-444444444402',
    name: 'Ancient Granary & Residential Quarter',
    description: 'Subterranean grain storage rooms and lime-plastered floors of Satavahana city dwellers.',
    latitude: 18.6653,
    longitude: 79.324,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    hotspot_position: { x: 25, y: 80 }
  }
];

// -----------------------------------------------------------------------------
// 6 EVENTS (CULTURAL CALENDAR)
// -----------------------------------------------------------------------------
export const SEED_EVENTS: DbEvent[] = [
  {
    id: '66666666-6666-6666-6666-666666666601',
    site_id: '11111111-1111-1111-1111-111111111101',
    name: 'Buddha Purnima Global Dhamma Chanting',
    description: 'Annual full moon peace congregation with international monastic delegations, candle-lighting procession, and meditation atop the ancient Maha Stupa.',
    start_date: '2025-05-12',
    end_date: '2025-05-13',
    location: 'Phanigiri Buddhist Complex, Suryapet',
    verification_status: 'Verified',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '66666666-6666-6666-6666-666666666602',
    site_id: '11111111-1111-1111-1111-111111111102',
    name: 'National Archaeological Excavation Day & Site Walk',
    description: 'Field walk led by senior state archaeologists explaining trench strata, Ayaka platform construction, and early historic pottery identification.',
    start_date: '2025-08-20',
    end_date: '2025-08-20',
    location: 'Dhulikatta Buddhist Stupa, Peddapalli',
    verification_status: 'Verified',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '66666666-6666-6666-6666-666666666603',
    site_id: null,
    name: 'World Heritage Week: Deccan Buddhist Architecture Colloquium',
    description: 'Scholarly seminar presenting new 3D photogrammetric reconstructions of limestone toranas, Amaravati-school styles, and conservation charters.',
    start_date: '2025-11-19',
    end_date: '2025-11-25',
    location: 'State Archaeology Auditorium, Public Gardens, Hyderabad',
    verification_status: 'Verified',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '66666666-6666-6666-6666-666666666604',
    site_id: '11111111-1111-1111-1111-111111111103',
    name: 'Khammam Monastic Heritage Walking Tour',
    description: 'Guided educational walk across Nelakondapalli stupa, bronze discovery cells, and surrounding Satavahana era habitational mounds.',
    start_date: '2025-09-14',
    end_date: '2025-09-14',
    location: 'Nelakondapalli Stupa Complex, Khammam',
    verification_status: 'Verified',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '66666666-6666-6666-6666-666666666605',
    site_id: '11111111-1111-1111-1111-111111111104',
    name: 'Nagarjuna Philosophy & Madhyamaka Lecture Series',
    description: 'Distinguished lecture series exploring Acharya Nagarjuna’s philosophical treatises on Sunyata (Emptiness) and early Mahayana development.',
    start_date: '2025-10-04',
    end_date: '2025-10-06',
    location: 'Nagarjunakonda Island Auditorium, Nalgonda',
    verification_status: 'Verified',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '66666666-6666-6666-6666-666666666606',
    site_id: '11111111-1111-1111-1111-111111111105',
    name: 'Godavari Riverine Archaeology Pilgrimage & Boat Symposium',
    description: 'Historical expedition tracing the ancient water routes linking Kotilingala and Badankurthi with riverine epigraphical readings.',
    start_date: '2025-12-07',
    end_date: '2025-12-08',
    location: 'Kotilingala Wharf & Ghats, Jagtial',
    verification_status: 'Verified',
    created_at: '2024-01-01T00:00:00Z'
  }
];

// -----------------------------------------------------------------------------
// DEMO INITIAL CONTRIBUTIONS
// -----------------------------------------------------------------------------
export const SEED_CONTRIBUTIONS: DbContribution[] = [
  {
    id: '77777777-7777-7777-7777-777777777701',
    user_id: '00000000-0000-0000-0000-000000000004',
    site_id: '11111111-1111-1111-1111-111111111101',
    title: 'High-Resolution Field Macro Shots of Phanigiri Torana Medallion',
    description: 'Captured macro details of the decorative rosettes and garland bearers on the northern face during early morning diffused lighting.',
    category: 'Photos',
    file_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    source: 'Field DSLR Nikon D850 with GPS coordinates',
    status: 'approved',
    reviewer_id: '00000000-0000-0000-0000-000000000002',
    reviewer_notes: 'Excellent high-fidelity photographic documentation. Verified for archival accession.',
    created_at: '2024-02-10T14:30:00Z',
    updated_at: '2024-02-11T09:00:00Z'
  },
  {
    id: '77777777-7777-7777-7777-777777777702',
    user_id: '00000000-0000-0000-0000-000000000004',
    site_id: '11111111-1111-1111-1111-111111111102',
    title: 'Vegetation Overgrowth Notice on South-Eastern Mud Rampart',
    description: 'Noticed deep wild shrub root intrusion near the outer mud brick rampart slope which may cause structural displacement after monsoon.',
    category: 'Damage Report',
    file_url: null,
    source: 'On-site field inspection during survey walk',
    status: 'pending',
    reviewer_id: null,
    reviewer_notes: null,
    created_at: '2024-03-01T11:00:00Z',
    updated_at: '2024-03-01T11:00:00Z'
  }
];

// -----------------------------------------------------------------------------
// DEMO INITIAL FAVORITES
// -----------------------------------------------------------------------------
export const SEED_FAVORITES: DbFavorite[] = [
  {
    id: '88888888-8888-8888-8888-888888888801',
    user_id: '00000000-0000-0000-0000-000000000005',
    entity_type: 'site',
    entity_id: 'phanigiri',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '88888888-8888-8888-8888-888888888802',
    user_id: '00000000-0000-0000-0000-000000000005',
    entity_type: 'artifact',
    entity_id: '22222222-2222-2222-2222-222222222201',
    created_at: '2024-01-16T12:30:00Z'
  }
];

// -----------------------------------------------------------------------------
// ARCHIVE VERSIONS
// -----------------------------------------------------------------------------
export const SEED_ARCHIVE_VERSIONS: DbArchiveVersion[] = [
  {
    id: '99999999-9999-9999-9999-999999999901',
    entity_type: 'artifact',
    entity_id: '22222222-2222-2222-2222-222222222201',
    version_number: 1,
    previous_data: null,
    new_data: {
      name: 'Phanigiri Torana Carved Architrave',
      period: 'Ikshvaku Dynasty (3rd c. CE)',
      status: 'Archaeologically Verified'
    },
    changed_by: '00000000-0000-0000-0000-000000000002',
    change_summary: 'Initial digital cataloguing accession according to ASI excavation memoirs.',
    created_at: '2024-01-01T00:00:00Z'
  }
];
