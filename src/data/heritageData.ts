import { HeritageSite, Artifact, VirtualTour, AudioStory, CulturalEvent, ItineraryPlan } from '../types/heritage';

export const HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'phanigiri',
    slug: 'phanigiri',
    name: 'Phanigiri Buddhist Complex',
    nameTelugu: 'ఫణిగిరి బౌద్ధ క్షేత్రం',
    district: 'Suryapet',
    period: 'Satavahana & Ikshvaku Dynasty',
    century: '1st Century BCE – 4th Century CE',
    shortDescription: 'One of the most remarkable Buddhist monastic sites in South India, renowned for monumental Torana gateway arches and intricately carved lime-mortar relief panels.',
    overview: 'Perched atop a snake-hood shaped granite hillock in Suryapet, Phanigiri represents an apex of early Buddhist art in Telangana. Excavations by the Department of Archaeology and Museums have revealed an expansive Maha Stupa, circular chaityagrihas, rectangular viharas, and magnificent limestone carvings exhibiting Jataka scenes.',
    historicalInformation: 'Phanigiri was situated along the prime inland trade route connecting coastal Andhra to western Deccan. Inscriptions discovered here record donations by royal ladies of the Ikshvaku dynasty, monastic acharyas, and visiting merchants. Recent discoveries include the unique Torana with relief carvings of Siddhartha\'s renunciation and octagonal pillar bases engraved with Brahmi script.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: {
      lat: 17.3821,
      lng: 79.5492,
      xPercent: 62,
      yPercent: 64
    },
    keyStructures: [
      { name: 'Maha Stupa with Ayaka Pillars', description: 'Central drum measuring 18 meters in diameter, encased in carved limestone slabs depicting floral medallions and dharma symbols.', type: 'Stupa' },
      { name: 'Monolithic Torana Gateway', description: 'Superbly preserved sandstone carved architrave illustrating the life events of Gautama Buddha.', type: 'Gateway' },
      { name: 'Apsidal Chaityagriha', description: 'Votive prayer hall with stone benches for monks, overlooking the scenic Alair river valley.', type: 'Sanctuary' },
      { name: 'Monastic Cells & Vihara Complex', description: 'Residential quadrangles with individual monks’ chambers, refectory, and centralized stone rain cisterns.', type: 'Monastery' }
    ],
    timeline: [
      { era: '1st Century BCE', event: 'Early Monastic Settlement', details: 'Theravada Buddhist mendicants establish rock shelters and stupas along the Godavari-Krishna trade arteries.' },
      { era: '2nd Century CE', event: 'Satavahana Flowering', details: 'Royal patronages expand the Maha Stupa; creation of decorated Brahmi votive slabs and octagonal pillars.' },
      { era: '3rd–4th Century CE', event: 'Ikshvaku Golden Age', details: 'Construction of the world-famous carved torana architraves and multi-tiered monastic cloisters.' },
      { era: '2001–2019 CE', event: 'Modern Archaeological Excavation', details: 'Telangana State Archaeology Department uncovers lead coins, Roman pottery shards, and limestone masterworks.' }
    ],
    artifactsCount: 142,
    featured: true,
    elevation: '480 m MSL',
    nearestTown: 'Nagaram / Jangaon',
    visitingHours: '09:00 AM – 05:30 PM (Daily)',
    entryFee: '₹25 (Indian Nationals) / ₹300 (Foreign Nationals)'
  },
  {
    id: 'dhulikatta',
    slug: 'dhulikatta',
    name: 'Dhulikatta Buddhist Stupa & Mud Fort',
    nameTelugu: 'ధూళికట్ట బౌద్ధ స్తూపం మరియు మట్టి కోట',
    district: 'Peddapalli',
    period: 'Satavahana & Pre-Satavahana Era',
    century: '3rd Century BCE – 2nd Century CE',
    shortDescription: 'Ancient fortified settlement boasting one of the oldest brick-built Maha Stupas in northern Telangana, famous for the Muchalinda Naga sculpture.',
    overview: 'Dhulikatta (meaning "mud rampart" in Telugu) encompasses an ancient fortified city spanning 45 acres along the Hussainimiya Vagu stream. The stupa, constructed of baked bricks and dressed with 47 carved limestone Ayaka panels, dates back to the Ashokan Mauryan period.',
    historicalInformation: 'Excavations in the 1970s revealed a flourishing urban center mentioned in Megasthenes’ accounts of 30 walled towns of the Andhras. Noteworthy finds include a limestone slab depicting the serpent king Muchalinda sheltering Buddha with his multi-headed hood, ivory combs, and lead coins of King Satavahana.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: {
      lat: 18.6653,
      lng: 79.2831,
      xPercent: 54,
      yPercent: 32
    },
    keyStructures: [
      { name: 'Brick Maha Stupa', description: 'Massive circular drum measuring 30m diameter with 4 projecting Ayaka platforms oriented toward cardinal directions.', type: 'Stupa' },
      { name: '47 Carved Casing Slabs', description: 'Palnadu limestone reliefs showing triratna, stupas, dharmachakra, and the protective Naga Muchalinda.', type: 'Relief Wall' },
      { name: 'Fortified Mud Citadel', description: 'Defensive earthen walls and bastions from the 3rd century BCE protecting the urban manufacturing hub.', type: 'Citadel' }
    ],
    timeline: [
      { era: '3rd Century BCE', event: 'Ashokan Missionaries', details: 'Mauryan influence reaches Godavari basin; initial foundation of the brick stupa.' },
      { era: '1st Century BCE', event: 'Satavahana Urban Fortification', details: 'Construction of mud walls, pottery kilns, and palace complexes.' },
      { era: '1975–1977 CE', event: 'State Archaeological Excavation', details: 'Discovery of Roman amphorae fragments, ivory relics, and punch-marked coins.' }
    ],
    artifactsCount: 98,
    featured: true,
    elevation: '175 m MSL',
    nearestTown: 'Peddapalli / Karimnagar',
    visitingHours: '09:30 AM – 05:00 PM',
    entryFee: 'Free entry (Protected ASI Site)'
  },
  {
    id: 'nelakondapalli',
    slug: 'nelakondapalli',
    name: 'Nelakondapalli Maha Stupa',
    nameTelugu: 'నేలకొండపల్లి మహా స్తూపం',
    district: 'Khammam',
    period: 'Late Satavahana to Vishnukundin',
    century: '2nd Century CE – 6th Century CE',
    shortDescription: 'One of the colossal solid brick stupas of South India, standing over 50 feet tall, with extensive monastic cisterns and bronze Buddha icons.',
    overview: 'Nelakondapalli holds an awe-inspiring place in Telangana’s Buddhist chronology. Known locally as Byragula Gutta, this stupa was built using solid red terracotta bricks laid in wheel-spoke patterns, symbolizing the turning of the Wheel of Law (Dharmachakrapravartana).',
    historicalInformation: 'Surrounding the monumental mound are foundations of a large vihara with multiple cells, subterranean water management cisterns, and lime plastered prayer platforms. Notable finds include bronze figurines of Buddha in abhaya mudra, limestone votive stupas, and Satavahana terracotta beads.',
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: {
      lat: 17.1472,
      lng: 80.0531,
      xPercent: 78,
      yPercent: 72
    },
    keyStructures: [
      { name: 'Virabhadra Gutta Stupa Drum', description: 'Massive circular brick dome reaching a circumference of 150 meters, with an internal spoke architecture.', type: 'Stupa' },
      { name: 'Monastic Cisterns & Wells', description: 'Hydraulic stone-lined reservoir ensuring drinking and ceremonial water for hundred of resident monks.', type: 'Infrastructure' },
      { name: 'Bronze Atelier Workshop', description: 'Evidence of copper and bronze casting facilities producing sacred icons for pilgrims traveling along coastal waterways.', type: 'Workshop' }
    ],
    timeline: [
      { era: '2nd Century CE', event: 'Establishment of Maha Stupa', details: 'Brick masonry construction begins under later Satavahana governors.' },
      { era: '4th–5th Century CE', event: 'Bronze Casting Center', details: 'Nelakondapalli emerges as a major transit hub linking Amaravati with central Deccan.' },
      { era: '1977 CE', event: 'Modern Discovery', details: 'ASI and state department uncover the monumental stupa base beneath vegetative mounds.' }
    ],
    artifactsCount: 115,
    featured: true,
    elevation: '130 m MSL',
    nearestTown: 'Khammam (21 km)',
    visitingHours: '09:00 AM – 05:00 PM',
    entryFee: '₹20 (Indian Nationals) / ₹250 (Foreign)'
  },
  {
    id: 'nagarjuna-konda',
    slug: 'nagarjuna-konda',
    name: 'Nagarjunakonda (Krishna Valley Sanctuary)',
    nameTelugu: 'నాగార్జునకొండ బౌద్ధ క్షేత్రం',
    district: 'Nalgonda border',
    period: 'Ikshvaku Dynasty (Vijayapuri)',
    century: '2nd – 3rd Century CE',
    shortDescription: 'World-renowned island museum and valley sanctuary named after master philosopher Acharya Nagarjuna, housing reconstructed viharas and chaityas.',
    overview: 'Nestled on an island within the expansive waters of the Nagarjuna Sagar reservoir, Nagarjunakonda (ancient Vijayapuri) was the flourishing capital of the Southern Ikshvaku dynasty. It was a cosmopolitan university center hosting monks from Sri Lanka, China, Gandhara, and Kashmir.',
    historicalInformation: 'Before the submergence of the valley in 1960 during dam construction, a historic salvage archaeology operation meticulously excavated and transplanted over 30 monumental complexes to higher ground and an island museum. Discoveries include relic caskets with genuine bone fragments of Buddha, Roman coins, and inscriptions commemorating Mahisaka and Aparamahavinaseliya sects.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: {
      lat: 16.5233,
      lng: 79.2486,
      xPercent: 55,
      yPercent: 88
    },
    keyStructures: [
      { name: 'Maha Chaitya Site 1', description: 'Principal stupa containing the sacred corporeal relics of Gautama Buddha enclosed in gold and silver caskets.', type: 'Maha Chaitya' },
      { name: 'Simhala Vihara', description: 'Monastery specifically endowed for visiting monks from Sri Lanka (Tambapanni), with Bodhi tree shrine.', type: 'International Vihara' },
      { name: 'Island Archaeological Museum', description: 'India’s premier island museum exhibiting exquisite green limestone sculptures and Brahmi inscriptions.', type: 'Museum' },
      { name: 'Ashvamedha & Open-Air Amphitheatre', description: 'Roman acoustic design-inspired stone amphitheatre accommodating over 1,000 spectators.', type: 'Public Architecture' }
    ],
    timeline: [
      { era: '2nd Century CE', event: 'Acharya Nagarjuna arrives', details: 'The great Madhyamaka Buddhist philosopher teaches and writes in the secluded Sri Parvata hills.' },
      { era: '225–325 CE', event: 'Ikshvaku Capital Vijayapuri', details: 'Queens Chamti Sri and Bhatidevi fund monumental chaityas, universities, and river wharves.' },
      { era: '1954–1960 CE', event: 'Historic Relocation Effort', details: 'Dr. R. Subrahmanyam directs salvage excavations, rebuilding monuments stone-by-stone atop Nagarjuna Hill.' }
    ],
    artifactsCount: 380,
    featured: true,
    elevation: '168 m MSL',
    nearestTown: 'Macherla / Miryalaguda',
    visitingHours: '09:00 AM – 04:00 PM (Ferry boat access from Sagar launch)',
    entryFee: '₹50 + ₹150 Ferry ride'
  },
  {
    id: 'kotilingala',
    slug: 'kotilingala',
    name: 'Kotilingala Riverside Monastery',
    nameTelugu: 'కోటిలింగాల బౌద్ధ కేంద్రం',
    district: 'Jagtial',
    period: 'Early Satavahana & Pre-Satavahana',
    century: '3rd Century BCE – 1st Century CE',
    shortDescription: 'Ancient riverine port capital at the confluence of Godavari and Peddavagu, yielding early punch-marked Buddhist coins and brick stupa vestiges.',
    overview: 'Kotilingala was the earliest seat of power of the Satavahana dynasty (Simuka and Siri Satavahana). Located directly on the sacred waters of Godavari, it served as an inland trade mart and monastic haven for monks traveling between Magadha and the Deccan.',
    historicalInformation: 'Excavations yielded circular brick stupas, rectangular monastic quarters, and unique coins stamped with the srivatsa, triratna, and swastika symbols. The proximity to river transport enabled swift propagation of Dhamma across central India.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: {
      lat: 18.9614,
      lng: 78.9812,
      xPercent: 46,
      yPercent: 22
    },
    keyStructures: [
      { name: 'River Wharf & Ghats', description: 'Stone-paved embarkation ghats facilitating river transport for pilgrims and commercial cargoes.', type: 'Harbor' },
      { name: 'Early Satavahana Brick Stupa', description: 'Hemispherical brick stupa with lime plastering, dating back to 250 BCE.', type: 'Stupa' }
    ],
    timeline: [
      { era: '3rd Century BCE', event: 'Pre-Satavahana Trading Port', details: 'Local chieftains like Gobhada and Samagopa mint early coins and patronize monks.' },
      { era: '2nd Century BCE', event: 'King Simuka’s Capital', details: 'First Satavahana emperor consolidates power and builds royal monastic compounds.' }
    ],
    artifactsCount: 64,
    featured: false,
    elevation: '142 m MSL',
    nearestTown: 'Velgatoor / Jagtial',
    visitingHours: 'Sunrise to Sunset',
    entryFee: 'Free'
  },
  {
    id: 'badankurthi',
    slug: 'badankurthi',
    name: 'Badankurthi River Island Hermitage',
    nameTelugu: 'బదన్‌కుర్తి బౌద్ధ ద్వీప ఆశ్రమం',
    district: 'Nirmal',
    period: 'Early Historic (Satavahana)',
    century: '2nd Century BCE – 2nd Century CE',
    shortDescription: 'Peaceful Buddhist island hermitage situated in the Godavari river, marked by early rock-cut steps and monastic contemplation platforms.',
    overview: 'Isolated inside the gentle current of Godavari river near Khanapur, Badankurthi was revered by Buddhist wandering monks (Bhikkhus) seeking seclusion for meditation. Terracotta tiles, brick walls, and early historic sherds dot this picturesque islet.',
    historicalInformation: 'Folkloric and epigraphic references indicate this island sanctuary was visited by travelling Sangha members navigating the northern trade routes towards Paithan (Pratishthana).',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: {
      lat: 19.0412,
      lng: 78.5831,
      xPercent: 36,
      yPercent: 18
    },
    keyStructures: [
      { name: 'Island Meditative Vihara', description: 'Secluded chambers built on granite bedrock with natural ventilation from the Godavari breezes.', type: 'Hermitage' }
    ],
    timeline: [
      { era: '2nd Century BCE', event: 'Monastic Hermitage Founded', details: 'Ascetics carve initial stone steps and meditation terraces on the river islet.' }
    ],
    artifactsCount: 32,
    featured: false,
    elevation: '210 m MSL',
    nearestTown: 'Khanapur / Nirmal',
    visitingHours: '08:00 AM – 05:00 PM (Requires local country boat)',
    entryFee: 'Free'
  },
  {
    id: 'kondapur',
    slug: 'kondapur',
    name: 'Kondapur Archaeological Complex',
    nameTelugu: 'కొండపూర్ పురావస్తు కేంద్రం',
    district: 'Sangareddy',
    period: 'Satavahana Period',
    century: '1st Century BCE – 2nd Century CE',
    shortDescription: 'Major Satavahana urban manufacturing and Buddhist center renowned for Roman gold coins, terracotta figurines, and on-site ASI museum.',
    overview: 'Excavated in the 1940s by the Archaeological Department of Hyderabad under Ghulam Yazdani, Kondapur revealed circular stupas, chaityas, and an incredible trove of terracotta double-spouted vessels, beads, and Roman coins testifying to vibrant Mediterranean trade.',
    historicalInformation: 'The site features an ASI site museum housing thousands of artifacts, beads, coins, and Buddhist terracotta figures with Hellenistic and Indian stylistic synthesis.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: {
      lat: 17.5512,
      lng: 78.0211,
      xPercent: 24,
      yPercent: 60
    },
    keyStructures: [
      { name: 'ASI Kondapur Site Museum', description: 'Houses over 8,000 antiquities including Roman gold coins, beads, and clay seals.', type: 'Museum' },
      { name: 'Chaityagriha Foundations', description: 'Votive apsidal structure where monks assembled for chanting and discussion.', type: 'Chaitya' }
    ],
    timeline: [
      { era: '1st Century BCE', event: 'Bead & Terracotta Center', details: 'Emerges as one of the largest bead manufacturing and Buddhist pilgrimage outposts in Deccan.' },
      { era: '1940–1942 CE', event: 'Yazdani Excavations', details: 'Systematic scientific unearthing reveals terracotta heads with Greco-Buddhist features.' }
    ],
    artifactsCount: 160,
    featured: false,
    elevation: '512 m MSL',
    nearestTown: 'Sangareddy / Hyderabad (65 km)',
    visitingHours: '10:00 AM – 05:00 PM (Closed Fridays)',
    entryFee: '₹15'
  }
];

export const DIGITAL_ARTIFACTS: Artifact[] = [
  {
    id: 'art-001',
    name: 'Phanigiri Torana Carved Architrave',
    nameTelugu: 'ఫణిగిరి తోరణం చెక్కడపు శిలాఫలకం',
    siteId: 'phanigiri',
    siteName: 'Phanigiri Buddhist Complex',
    district: 'Suryapet',
    category: 'Sculptures',
    period: 'Ikshvaku Dynasty (3rd Century CE)',
    material: 'Palnadu Greenish-White Limestone',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    dimensions: '210 cm × 45 cm × 28 cm',
    provenance: 'Excavated from Northeast quadrant of Maha Stupa at Phanigiri (2001)',
    accessionNumber: 'TS-ARCH-PHN-2001-084',
    verificationStatus: 'Archaeologically Verified',
    isIllustrative: false,
    description: 'This masterwork limestone architrave features narrative scenes from the Mahabhinishkramana (Great Renunciation). Siddhartha Gautama is depicted leaving his palace at midnight while celestial beings hold up the hooves of his horse Kanthaka to muffle the sound.',
    historicalContext: 'Carved with exquisite plasticity characteristic of the Amaravati-Ikshvaku school. The high relief depth and rhythmic draping of garments demonstrate the mature classical idiom of Telangana\'s Buddhist workshops.',
    sources: [
      'Archaeological Survey of India Memoir No. 104',
      'Department of Heritage Telangana Excavation Reports (2001–2007)',
      'Epigraphia Indica, Vol. XXXVIII, pp. 112–119'
    ],
    currentLocation: 'State Museum, Public Gardens, Hyderabad',
    languageOrScript: 'Iconographic Narrative (Aniconic & Iconic transition)'
  },
  {
    id: 'art-002',
    name: 'Brahmi Inscribed Ayaka Octagonal Pillar',
    nameTelugu: 'బ్రాహ్మీ శాసన ఆయక అష్టభుజి స్తంభం',
    siteId: 'phanigiri',
    siteName: 'Phanigiri Buddhist Complex',
    district: 'Suryapet',
    category: 'Inscriptions',
    period: 'Satavahana / Ikshvaku (2nd–3rd Century CE)',
    material: 'Fine-grained Sandstone',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    dimensions: '185 cm height, 38 cm diameter',
    provenance: 'South cardinal Ayaka projection, Phanigiri Stupa drum',
    accessionNumber: 'TS-ARCH-PHN-2005-012',
    verificationStatus: 'Archaeologically Verified',
    isIllustrative: false,
    description: 'A monolithic pillar bearing 8 lines of deeply incised Brahmi script in Prakrit language. It records a pious grant by royal physician Dharmasena and mentions the resident monk Acharya Bodhika for the welfare of all sentient beings (Sabba-sattanam hitasukhaya).',
    historicalContext: 'Epigraphically invaluable as it confirms the monastic lineages linking Phanigiri with Dhanyakataka and Nagarjunakonda, recording names of specific Buddhist sects like the Dhammottariyas.',
    sources: [
      'Epigraphia Andhrica Vol. VI',
      'Dr. P.R.K. Prasad, "Epigraphical Treasures of Telangana", 2012'
    ],
    currentLocation: 'Phanigiri Site Interpretation Centre',
    languageOrScript: 'Early Brahmi Script / Prakrit'
  },
  {
    id: 'art-003',
    name: 'Muchalinda Naga Protective Slab',
    nameTelugu: 'ముచిలింద నాగ రక్షణ శిల్పం',
    siteId: 'dhulikatta',
    siteName: 'Dhulikatta Stupa',
    district: 'Peddapalli',
    category: 'Sculptures',
    period: 'Early Satavahana (2nd Century BCE)',
    material: 'Limestone Casing Relief',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    dimensions: '112 cm × 68 cm × 18 cm',
    provenance: 'Eastern Ayaka casing, Dhulikatta Maha Stupa',
    accessionNumber: 'ASI-DKT-1976-004',
    verificationStatus: 'ASI Catalogued',
    isIllustrative: false,
    description: 'A striking dynamic relief sculpture depicting the multi-headed serpent king Muchalinda coiled in multiple coils beneath the empty throne (aniconic representation of Buddha) with the flared serpent hood sheltering the sanctuary from torrential rains.',
    historicalContext: 'One of the earliest representations of the Muchalinda legend found anywhere in the Deccan. Reflects how indigenous serpent (Naga) veneration was harmoniously absorbed into early Buddhist philosophy.',
    sources: [
      'V.V. Krishna Sastry, "The Proto and Early Historic Cultures of Andhra Pradesh"',
      'ASI Archaeological Records (Peddapalli Circle)'
    ],
    currentLocation: 'Karimnagar Heritage Museum',
    languageOrScript: 'Sculptural Symbolic'
  },
  {
    id: 'art-004',
    name: 'Satavahana Lead & Potin Coinage Cache',
    nameTelugu: 'శాతవాహన సీసము మరియు పోటిన్ నాణేల నిధి',
    siteId: 'kotilingala',
    siteName: 'Kotilingala Riverside Monastery',
    district: 'Jagtial',
    category: 'Coins',
    period: 'Pre-Satavahana to Gautamiputra Satakarni (2nd BCE – 1st CE)',
    material: 'Lead, Potin & Copper Alloy',
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=900&q=80',
    dimensions: 'Diameter: 18mm to 24mm',
    provenance: 'Mound II river embankment, Kotilingala',
    accessionNumber: 'TS-NUM-KTL-1981-220',
    verificationStatus: 'Archaeologically Verified',
    isIllustrative: false,
    description: 'A hoarded cache of 42 round and square punch-marked coins carrying the legendary royal legend "Rano Siri Satavahanasa" and symbols including the Ujjain symbol, tree-in-railing, elephant with raised trunk, and river fishes.',
    historicalContext: 'Proves conclusively that Kotilingala was a major early dynastic mint and maritime trade depot long before the royal court moved to Paithan.',
    sources: [
      'Dr. P.L. Gupta, "Coinage of the Satavahanas", 1982',
      'Numismatic Society of India Journal Vol. XLIV'
    ],
    currentLocation: 'State Numismatic Gallery, Hyderabad',
    languageOrScript: 'Brahmi legends / Imperial mintmarks'
  },
  {
    id: 'art-005',
    name: 'Standing Buddha Colossal Bronze Icon',
    nameTelugu: 'నిలబడిన బుద్ధుని కాంస్య విగ్రహం',
    siteId: 'nelakondapalli',
    siteName: 'Nelakondapalli Maha Stupa',
    district: 'Khammam',
    category: 'Sculptures',
    period: 'Late Ikshvaku / Vishnukundin (4th–5th Century CE)',
    material: 'Cast Bronze (Lost Wax Technique)',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80',
    dimensions: 'Height: 84 cm, Weight: 26.5 kg',
    provenance: 'Found in subterranean brick chamber east of Nelakondapalli Stupa',
    accessionNumber: 'TS-ARCH-NKP-1983-001',
    verificationStatus: 'Archaeologically Verified',
    isIllustrative: false,
    description: 'A sublime bronze sculpture of the Blessed One standing in graceful tribhanga posture. The right hand displays Abhaya Mudra (protection) while the left hand holds the hem of the sanghati monk robe in rippling folds.',
    historicalContext: 'Highlights the metallurgical sophistication of early Telangana. The iconographic style shares affinities with Amaravati bronzes and was likely exported as far as Southeast Asia via Krishna delta ports.',
    sources: [
      'Marg Magazine: "Buddhist Heritage of Andhra and Telangana"',
      'National Museum Bulletin No. 19'
    ],
    currentLocation: 'Warangal Heritage Museum',
    languageOrScript: 'Metropolitan Deccan Sculpture'
  },
  {
    id: 'art-006',
    name: 'Rouletted Ceramic & Roman Amphora Sherds',
    nameTelugu: 'రూలెట్టెడ్ మృణ్మయ పాత్రలు మరియు రోమన్ ఆంఫోరా శకలాలు',
    siteId: 'kondapur',
    siteName: 'Kondapur Archaeological Complex',
    district: 'Sangareddy',
    category: 'Pottery',
    period: 'Early Historic (1st Century BCE – 1st Century CE)',
    material: 'Fine Terracotta & Imported Mediterranean Clay',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    dimensions: 'Fragment sizes: 8 cm to 22 cm',
    provenance: 'Kiln and residential trench IV, Kondapur',
    accessionNumber: 'ASI-KDP-1941-789',
    verificationStatus: 'ASI Catalogued',
    isIllustrative: false,
    description: 'Black-and-red ware rims along with grey rouletted dish fragments featuring concentric rouletting impressions, alongside Mediterranean wine-amphora handles bearing Latin potter stamps.',
    historicalContext: 'Irrefutable physical evidence that Telangana\'s inland Buddhist monasteries participated directly in trans-oceanic spice, textile, and wine commerce with the Augustan Roman Empire.',
    sources: [
      'Ghulam Yazdani, "Excavations at Kondapur", 1941',
      'Archaeological Journal of the Hyderabad Archaeological Society'
    ],
    currentLocation: 'ASI Site Museum, Kondapur',
    languageOrScript: 'Potters marks and Roman workshop stamps'
  },
  {
    id: 'art-007',
    name: 'Siddhartha Renunciation Torana Medallion',
    nameTelugu: 'సిద్ధార్థుని మహా నిష్క్రమణ తోరణ చక్రం',
    siteId: 'phanigiri',
    siteName: 'Phanigiri Buddhist Complex',
    district: 'Suryapet',
    category: 'Sculptures',
    period: 'Satavahana (1st Century CE)',
    material: 'Carved Limestone',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
    dimensions: 'Diameter: 48 cm, Thickness: 12 cm',
    provenance: 'Phanigiri Monastic Vihara II',
    accessionNumber: 'TS-ARCH-PHN-2015-098',
    verificationStatus: 'Archaeologically Verified',
    isIllustrative: false,
    description: 'Circular central medallion with a lotus petal border framing the scene where Prince Siddhartha cuts off his royal hair turban (Chuda-Maha), while Devas joyfully catch the locks in golden urns.',
    historicalContext: 'Exemplifies the exquisite detailing of royal jewelry, turbans, and celestial beings in the 1st century CE Deccan craftsmanship.',
    sources: [
      'Telangana Archaeology Journal Vol. 3 (2018)',
      'Harvard University Art Bulletin: Buddhist Andhra'
    ],
    currentLocation: 'Telangana State Museum, Hyderabad',
    languageOrScript: 'Jataka Narrative Art'
  },
  {
    id: 'art-008',
    name: 'Palm-Leaf Prajnaparamita Manuscript Fragment',
    nameTelugu: 'తాళపత్ర ప్రజ్ఞాపారమిత సూత్ర శకలం',
    siteId: 'nagarjuna-konda',
    siteName: 'Nagarjunakonda (Krishna Valley Sanctuary)',
    district: 'Nalgonda border',
    category: 'Manuscripts',
    period: 'Reconstructed Archive Reference (Mahayana Text)',
    material: 'Preserved Palm-leaf (Talapatra) & Iron Stylus Ink',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    dimensions: '28 cm × 4.5 cm',
    provenance: 'Scholarly archival reconstruction based on Buddhist Sanskrit recensions originating at Sri Parvata',
    accessionNumber: 'REC-ST-MS-008',
    verificationStatus: 'Illustrative Reconstruction',
    isIllustrative: true,
    description: 'An illustrative scholarly reconstruction of how Acharya Nagarjuna’s fundamental verses on the Middle Way (Mulamadhyamakakarika) and Prajnaparamita were inscribed on treated talapatra leaves for recitation by monastic scholars.',
    historicalContext: 'Sri Parvata (Nagarjunakonda) served as the spiritual cradle of Mahayana and Madhyamaka philosophy, influencing Tibetan, Chinese, and East Asian Buddhist logic.',
    sources: [
      'Nalinaksha Dutt, "Buddhist Sects in India"',
      'Acharya Nagarjuna Commemorative Volumes (ASI 1975)'
    ],
    currentLocation: 'Digital Heritage Research Repository',
    languageOrScript: 'Buddhist Hybrid Sanskrit in Southern Brahmi'
  }
];

export const VIRTUAL_TOURS: VirtualTour[] = [
  {
    id: 'tour-phanigiri',
    siteId: 'phanigiri',
    siteSlug: 'phanigiri',
    siteName: 'Phanigiri Hilltop Monastic Citadel',
    title: 'Phanigiri 360° Hilltop Monastic Sanctuary',
    district: 'Suryapet',
    period: '1st Century BCE – 4th Century CE',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    duration: '18 mins walkthrough',
    hotspotsCount: 14,
    featured: true,
    description: 'Immerse yourself atop the sacred snake-hood granite hillock. Stand before the reconstructed Torana gate, inspect Brahmi inscriptions on votive pillars, and explore the monks’ living quarters overlooking the river plains.',
    highlights: ['Torana Gateway Architraves', 'Maha Stupa Drum & Ayaka Slabs', 'Monk Cells & Refectory', 'Panoramics of the Suryapet River Valley'],
    status: 'Available'
  },
  {
    id: 'tour-dhulikatta',
    siteId: 'dhulikatta',
    siteSlug: 'dhulikatta',
    siteName: 'Dhulikatta Stupa & Fort',
    title: 'Dhulikatta Mud Ramparts & Ancient Stupa 360°',
    district: 'Peddapalli',
    period: '3rd Century BCE – 2nd Century CE',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    duration: '14 mins walkthrough',
    hotspotsCount: 9,
    featured: true,
    description: 'Traverse the 45-acre Satavahana fortified city, examine the Muchalinda Naga relief panel in its original spatial orientation, and walk the ancient brick pathway.',
    highlights: ['Muchalinda Naga Ayaka Slab', 'Brick Ringwells & Drainage System', 'Mauryan-era Baked Brick Drum', 'Fortified Mud Citadel Wall'],
    status: 'Available'
  },
  {
    id: 'tour-nelakondapalli',
    siteId: 'nelakondapalli',
    siteSlug: 'nelakondapalli',
    siteName: 'Nelakondapalli Stupa',
    title: 'Nelakondapalli Colossal Brick Stupa Aerial & Walk',
    district: 'Khammam',
    period: '2nd Century CE – 6th Century CE',
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1000&q=80',
    duration: '12 mins walkthrough',
    hotspotsCount: 11,
    featured: true,
    description: 'Witness South India\'s largest solid brick stupa from ground and aerial perspectives. Inspect the subterranean monastic cisterns and bronze atelier relic pit.',
    highlights: ['Spoke-Wheel Stupa Core Architecture', 'Vihara Brick Foundations', 'Subterranean Cistern Network', 'Bronze Sculpture Discovery Trench'],
    status: '360° Experience Coming Soon'
  },
  {
    id: 'tour-nagarjunakonda',
    siteId: 'nagarjuna-konda',
    siteSlug: 'nagarjuna-konda',
    siteName: 'Nagarjunakonda Island Sanctuary',
    title: 'Nagarjunakonda Island Museum & Salvaged Chaityas',
    district: 'Nalgonda border',
    period: '2nd – 3rd Century CE',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80',
    duration: '22 mins walkthrough',
    hotspotsCount: 18,
    featured: true,
    description: 'A boat-to-island digital journey exploring the transplanted Ikshvaku monastic universities, the Mahachaitya with Buddha relics, and the ancient acoustic amphitheater.',
    highlights: ['Mahachaitya Relic Chamber', 'Simhala International Vihara', 'Acoustic Open-Air Amphitheater', 'Island Museum Green Limestone Gallery'],
    status: 'Available'
  }
];

export const AUDIO_STORIES: AudioStory[] = [
  {
    id: 'audio-01',
    title: 'The Whispering Stones of Phanigiri',
    siteName: 'Phanigiri Buddhist Complex',
    duration: '7m 45s',
    narrator: 'Dr. Anuradha Reddy (Heritage Historian)',
    languages: ['English', 'Telugu'],
    description: 'Listen to the discovery of the royal Torana and how Ikshvaku queens patronized stone carvers who brought the Jataka legends alive in sparkling limestone.',
    audioMockUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'audio-02',
    title: 'Naga Muchalinda and the Dhulikatta Monsoon',
    siteName: 'Dhulikatta Stupa',
    duration: '6m 12s',
    narrator: 'Prof. K. Satyanarayana (Epigraphist)',
    languages: ['English', 'Telugu', 'Hindi'],
    description: 'The ancient tale of the serpent king sheltering the Buddha during a 7-day storm, and how this motif became the emblem of Northern Telangana\'s Satavahana monks.',
    audioMockUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'audio-03',
    title: 'Acharya Nagarjuna’s Island of Middle Philosophy',
    siteName: 'Nagarjunakonda',
    duration: '9m 30s',
    narrator: 'Tenzin Chokyi (Scholar of Buddhist Studies)',
    languages: ['English', 'Hindi'],
    description: 'Explore how Sri Parvata became the Harvard of the 3rd century, attracting maritime scholars from Rome, China, and Ceylon to discuss the emptiness of intrinsic existence.',
    audioMockUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80'
  }
];

export const CULTURAL_EVENTS: CulturalEvent[] = [
  {
    id: 'evt-01',
    title: 'State Symposium on Satavahana Epigraphy & Numismatics',
    siteName: 'Phanigiri Interpretation Centre',
    siteSlug: 'phanigiri',
    district: 'Suryapet',
    date: '2026-10-18',
    time: '10:00 AM – 04:30 PM IST',
    category: 'Archaeological Symposium',
    description: 'Leading epigraphists present newly decrypted Brahmi inscriptions from recent excavations in Phanigiri and Dhulikatta, focusing on trade routes along the Alair river.',
    speakers: 'Dr. E. Sivanagi Reddy, Prof. Shrinivas V. Rao',
    location: 'Archaeology Auditorium, Suryapet & Live Stream',
    isRegistered: false
  },
  {
    id: 'evt-02',
    title: 'Buddha Purnima Full Moon Heritage Vigil & Meditation Walk',
    siteName: 'Nelakondapalli Maha Stupa',
    siteSlug: 'nelakondapalli',
    district: 'Khammam',
    date: '2026-11-04',
    time: '05:30 PM – 09:00 PM IST',
    category: 'Buddha Purnima',
    description: 'Experience an evening circumambulation (Pradakshina) around the solid brick stupa under the full moon, accompanied by traditional acoustic chanting and a guided architectural walk.',
    speakers: 'Venerable Bhikkhu Ananda, Heritage Telangana Guides',
    location: 'Virabhadra Gutta Monastic Grounds, Nelakondapalli',
    isRegistered: false
  },
  {
    id: 'evt-03',
    title: 'Dhulikatta Fortified Heritage Trek & Ancient Kiln Exploration',
    siteName: 'Dhulikatta Buddhist Stupa & Mud Fort',
    siteSlug: 'dhulikatta',
    district: 'Peddapalli',
    date: '2026-11-22',
    time: '07:30 AM – 01:00 PM IST',
    category: 'Heritage Walk',
    description: 'An interactive walking tour across the 45-acre earthen ramparts, examining 2,200-year-old terracotta ring wells, iron slag kilns, and Ayaka platform stone slabs.',
    speakers: 'ASI Field Archaeologist Team',
    location: 'Dhulikatta Site Gateway, Peddapalli',
    isRegistered: false
  },
  {
    id: 'evt-04',
    title: 'Nagarjunakonda Island Scholarly Workshop: Digital 3D Conservation',
    siteName: 'Nagarjunakonda (Krishna Valley Sanctuary)',
    siteSlug: 'nagarjuna-konda',
    district: 'Nalgonda / Guntur Border',
    date: '2026-12-05',
    time: '09:30 AM – 05:00 PM IST',
    category: 'Scholarly Workshop',
    description: 'A special hands-on workshop demonstrating LiDAR photogrammetry and digital twins of submerged Buddhist monuments from the 1960 salvage excavations.',
    speakers: 'International Council on Monuments and Sites (ICOMOS) Experts',
    location: 'Nagarjunakonda Island Museum Conference Hall',
    isRegistered: false
  }
];

export const DEMO_ITINERARIES: ItineraryPlan[] = [
  {
    id: 'plan-3day-classic',
    title: 'The Satavahana Golden Arc (3 Days)',
    days: 3,
    interests: ['Archaeology', 'Buddhism', 'Architecture'],
    travelStyle: 'Balanced Cultural Exploration',
    startingLocation: 'Hyderabad',
    overview: 'A balanced weekend expedition through Telangana\'s most celebrated Buddhist monuments, connecting the rock hillocks of Phanigiri with the monumental brick stupa of Nelakondapalli and ending at Nagarjunakonda.',
    recommendedSeason: 'October to February (Pleasant winter mornings)',
    transportAdvice: 'Private AC vehicle or heritage chartered bus; paved national and state highways throughout.',
    stops: [
      {
        day: 1,
        siteName: 'Phanigiri Buddhist Complex',
        siteSlug: 'phanigiri',
        district: 'Suryapet',
        activity: 'Hilltop ascent, Torana analysis, Brahmi pillar inspection',
        highlight: 'Sunset view over the Alair river valley from the Apsidal Chaityagriha',
        timeEstimate: '4 hours on site',
        travelNote: 'Depart Hyderabad at 07:00 AM; 110 km drive along NH 65.'
      },
      {
        day: 2,
        siteName: 'Nelakondapalli Maha Stupa',
        siteSlug: 'nelakondapalli',
        district: 'Khammam',
        activity: 'Circumambulate the colossal brick stupa drum and visit the local museum',
        highlight: 'Discovering the brick spoke-wheel engineering and ancient bronze caches',
        timeEstimate: '3.5 hours on site',
        travelNote: '95 km drive from Suryapet via Khammam state highway.'
      },
      {
        day: 3,
        siteName: 'Nagarjunakonda Island Sanctuary',
        siteSlug: 'nagarjuna-konda',
        district: 'Nalgonda border',
        activity: 'Scenic ferry across the Krishna reservoir, visiting the Island Museum and reconstructed Mahachaitya',
        highlight: 'Standing in the Roman-inspired stone amphitheatre and the Sri Lankan Simhala Vihara',
        timeEstimate: '5.5 hours including ferry transit',
        travelNote: 'Early morning ferry departure at 09:30 AM from Vijayapuri launch.'
      }
    ]
  },
  {
    id: 'plan-5day-comprehensive',
    title: 'The Great Telangana Sangha Pilgrimage (5 Days)',
    days: 5,
    interests: ['Archaeology', 'Buddhism', 'Photography', 'Spirituality', 'Architecture'],
    travelStyle: 'Deep In-depth Archaeological Odyssey',
    startingLocation: 'Hyderabad',
    overview: 'The definitive journey spanning the northern Godavari riverine sites down to the Krishna valley sanctuaries, exploring all seven excavated stupas and ancient urban mud ramparts.',
    recommendedSeason: 'November to January',
    transportAdvice: 'SUV or comfortable touring car suitable for rural road detours near Godavari banks.',
    stops: [
      {
        day: 1,
        siteName: 'Kondapur Archaeological Complex',
        siteSlug: 'kondapur',
        district: 'Sangareddy',
        activity: 'Explore the ASI Site Museum, bead workshops, and chaitya foundations',
        highlight: 'Roman coin collections and Satavahana terracotta art',
        timeEstimate: '3 hours',
        travelNote: '65 km west of Hyderabad; return or proceed north towards Nizamabad.'
      },
      {
        day: 2,
        siteName: 'Kotilingala & Badankurthi Island',
        siteSlug: 'kotilingala',
        district: 'Jagtial & Nirmal',
        activity: 'Boat to Badankurthi island hermitage and visit Kotilingala early Satavahana brick stupas',
        highlight: 'Meditating on the Godavari riverbanks where Buddhism first entered the Deccan',
        timeEstimate: '6 hours',
        travelNote: 'Scenic drive through north Telangana agricultural heartland.'
      },
      {
        day: 3,
        siteName: 'Dhulikatta Stupa & Fortified Township',
        siteSlug: 'dhulikatta',
        district: 'Peddapalli',
        activity: 'Inspect the Muchalinda Naga relief panel and ancient pottery kilns',
        highlight: 'Walking the 45-acre 2,200-year-old mud ramparts',
        timeEstimate: '4 hours',
        travelNote: 'Short drive from Karimnagar.'
      },
      {
        day: 4,
        siteName: 'Phanigiri Monastic Hill',
        siteSlug: 'phanigiri',
        district: 'Suryapet',
        activity: 'Detailed study of the monumental carved limestone torana and octagonal Brahmi pillars',
        highlight: 'Experiencing the tranquility of the ancient meditation cells',
        timeEstimate: '4.5 hours',
        travelNote: 'Scenic drive south towards Suryapet.'
      },
      {
        day: 5,
        siteName: 'Nelakondapalli & Nagarjunakonda',
        siteSlug: 'nagarjuna-konda',
        district: 'Khammam & Nalgonda',
        activity: 'Conclude with the two colossal stupa sites and the world-famous island museum',
        highlight: 'Viewing genuine corporeal Buddha relic caskets at Nagarjunakonda',
        timeEstimate: 'Full day itinerary',
        travelNote: 'Return to Hyderabad in the evening via Sagar-Hyderabad highway (150 km).'
      }
    ]
  }
];

export const MOCK_AI_RESPONSES: Record<string, { text: string; sources?: { title: string; siteSlug?: string; type: 'Site' | 'Artifact' | 'Scholar Paper' | 'ASI Inscription' }[]; suggestions?: string[] }> = {
  'what is phanigiri famous for?': {
    text: 'Phanigiri, situated in Suryapet district, is world-renowned for its exceptionally preserved 3rd-century CE limestone Torana (ornate gateway architrave), octagonal Ayaka pillars inscribed in Brahmi, and an extensive Maha Stupa complex overlooking the Alair river. Excavations have uncovered some of the finest narrative Buddhist sculptures depicting Jataka tales, rivaling the artistic grandeur of Amaravati and Sanchi.',
    sources: [
      { title: 'Phanigiri Buddhist Complex', siteSlug: 'phanigiri', type: 'Site' },
      { title: 'Phanigiri Torana Carved Architrave', type: 'Artifact' },
      { title: 'Telangana State Department of Archaeology Excavation Memoirs', type: 'Scholar Paper' }
    ],
    suggestions: [
      'Show inscriptions from Phanigiri',
      'Which sites belong to the Satavahana period?',
      'What was a Buddhist vihara?'
    ]
  },
  'what was a buddhist vihara?': {
    text: 'A Buddhist Vihara (విహారం) was a residential monastic complex designed for Buddhist mendicants (Bhikkhus and Bhikkhunis), particularly during the monsoon retreat (Vassa). In Telangana sites like Phanigiri, Nelakondapalli, and Nagarjunakonda, viharas typically consisted of a central open courtyard surrounded by individual monk cells, a shared refectory (dining hall), prayer shrines (Chaityas), and sophisticated rain-water harvesting cisterns.',
    sources: [
      { title: 'Monastic Architecture of the Deccan', type: 'Scholar Paper' },
      { title: 'Nagarjunakonda Simhala Vihara', siteSlug: 'nagarjuna-konda', type: 'Site' }
    ],
    suggestions: [
      'What is the difference between a Stupa and a Chaitya?',
      'What is Phanigiri famous for?',
      'Plan a Buddhist heritage trip'
    ]
  },
  'which sites belong to the satavahana period?': {
    text: 'The principal Buddhist sites in Telangana associated with the Satavahana dynasty (circa 2nd Century BCE – 2nd Century CE) include:\n\n1. **Kotilingala** (Jagtial) — The earliest mint and riverine capital of King Simuka Satavahana.\n2. **Dhulikatta** (Peddapalli) — A 45-acre fortified city and brick stupa featuring 47 limestone Ayaka reliefs including the Muchalinda Naga.\n3. **Phanigiri** (Suryapet) — Began in the late Satavahana period and expanded under the Ikshvakus.\n4. **Kondapur** (Sangareddy) — Famous for terracotta workshops, stupa foundations, and Roman coin commerce.\n5. **Badankurthi** (Nirmal) — An island hermitage on the Godavari river.',
    sources: [
      { title: 'Kotilingala Riverside Monastery', siteSlug: 'kotilingala', type: 'Site' },
      { title: 'Dhulikatta Stupa & Fort', siteSlug: 'dhulikatta', type: 'Site' },
      { title: 'Satavahana Coins Cache', type: 'Artifact' }
    ],
    suggestions: [
      'Show inscriptions from Phanigiri',
      'Tell me about Muchalinda Naga at Dhulikatta',
      'Plan a 3-day Buddhist heritage trip'
    ]
  },
  'show inscriptions from phanigiri': {
    text: 'Phanigiri has yielded over 30 critical epigraphs inscribed in early Southern Brahmi script in Prakrit and early Sanskrit. Notable inscriptions include:\n\n• **Dharmasena Pillar Inscription**: Documents donations by royal physician Dharmasena from the court of Ikshvaku King Rudrapurushadatta.\n• **Votive Footprint Slab (Buddhapaduka)**: Records offerings by female lay devotees (Upasikas) for universal liberation.\n• **Gokarna Vihara Donation**: Details grants of grain and land for the maintenance of wandering monks of the Dhammottariya school.',
    sources: [
      { title: 'Brahmi Inscribed Ayaka Octagonal Pillar', type: 'Artifact' },
      { title: 'Phanigiri Buddhist Complex', siteSlug: 'phanigiri', type: 'Site' },
      { title: 'Epigraphia Indica, Vol. XXXVIII', type: 'ASI Inscription' }
    ],
    suggestions: [
      'What is Phanigiri famous for?',
      'Plan a Buddhist heritage trip',
      'Which sites belong to the Satavahana period?'
    ]
  },
  'plan a buddhist heritage trip': {
    text: 'I recommend our curated **"Satavahana Golden Arc" (3-Day Route)**:\n\n• **Day 1**: Hyderabad to **Phanigiri** (Suryapet) — Hilltop stupa, carved torana, and sunset view (110 km).\n• **Day 2**: Phanigiri to **Nelakondapalli** (Khammam) — Colossal brick stupa and ancient bronze workshop site (95 km).\n• **Day 3**: **Nagarjunakonda** (Nalgonda border) — Scenic Krishna reservoir ferry, island museum, and the reconstructed Mahachaitya.\n\nYou can customize your days, travel style, and interests in our Trip Planner page!',
    sources: [
      { title: 'Plan Your Journey Module', type: 'Scholar Paper' },
      { title: 'Phanigiri Complex', siteSlug: 'phanigiri', type: 'Site' },
      { title: 'Nelakondapalli Stupa', siteSlug: 'nelakondapalli', type: 'Site' }
    ],
    suggestions: [
      'What is the best season to visit?',
      'Are guides available at Phanigiri?',
      'What is Phanigiri famous for?'
    ]
  }
};
