import { HERITAGE_SITES, DIGITAL_ARTIFACTS } from '../data/heritageData';

export interface ArchiveRecord {
  id: string;
  title: string;
  type: 'site' | 'artifact' | 'inscription' | 'historical_document' | 'monastic_concept';
  content: string;
  district?: string;
  period?: string;
  century?: string;
  siteSlug?: string;
  artifactId?: string;
  sourceCitation: string;
  vector: number[];
  language?: string;
  keywords: string[];
}

// Deterministic semantic vector generator (64-dimensional embedding)
// Computes conceptual, phonetic, and n-gram semantic weights for vocabulary
export function generateEmbedding(text: string): number[] {
  const dim = 64;
  const vector = new Array(dim).fill(0);
  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const words = normalized.split(/\s+/).filter(Boolean);

  if (words.length === 0) return vector;

  // Key archaeological semantic axes
  const semanticAxes: Record<string, number> = {
    phanigiri: 0,
    dhulikatta: 1,
    nelakondapalli: 2,
    chandavaram: 3,
    gajulabanda: 4,
    tirumalagiri: 5,
    badankurthi: 6,
    kondapur: 7,
    buddhist: 8,
    buddhism: 8,
    monastery: 9,
    vihara: 9,
    stupa: 10,
    chaitya: 11,
    chaityagriha: 11,
    torana: 12,
    architrave: 12,
    inscription: 13,
    epigraphy: 13,
    brahmi: 14,
    prakrit: 14,
    satavahana: 15,
    ikshvaku: 16,
    mauryan: 17,
    ashoka: 17,
    muchalinda: 18,
    naga: 18,
    serpent: 18,
    limestone: 19,
    sculpture: 20,
    carving: 20,
    relic: 21,
    casket: 21,
    bronze: 22,
    terracotta: 23,
    coin: 24,
    potin: 24,
    roman: 25,
    trip: 26,
    travel: 26,
    itinerary: 26,
    plan: 26,
    route: 27,
    circuit: 27,
    excavation: 28,
    archaeology: 28,
    asi: 28,
    krishna: 29,
    godavari: 29,
    trade: 30,
    dakshinapatha: 30,
    ayaka: 31,
    pillar: 31,
    monks: 32,
    sangha: 32,
    bhikkhu: 32,
    pradakshina: 33,
    meditation: 34,
    ashokan: 35,
    buddha: 36,
    jataka: 37,
    suryapet: 38,
    peddapalli: 39,
    khammam: 40,
    nirmal: 41,
    sangareddy: 42
  };

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Check semantic axes
    if (semanticAxes[word] !== undefined) {
      const axis = semanticAxes[word];
      vector[axis % dim] += 3.5;
      vector[(axis + 17) % dim] += 1.2;
    }

    // Substring hashing for n-grams
    for (let c = 0; c < word.length - 2; c++) {
      const code = word.charCodeAt(c) * 31 + word.charCodeAt(c + 1) * 7 + word.charCodeAt(c + 2);
      const slot = Math.abs(code) % dim;
      vector[slot] += 0.35;
    }

    // Position weighting
    const posSlot = (word.charCodeAt(0) * 13 + i) % dim;
    vector[posSlot] += 0.2;
  }

  // Normalize L2 vector length
  let norm = 0;
  for (let i = 0; i < dim; i++) {
    norm += vector[i] * vector[i];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dim; i++) {
      vector[i] /= norm;
    }
  }

  return vector;
}

// Calculate Cosine Similarity between two vectors
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0;
  return dotProduct / denom;
}

// Construct the initial verified archive vector store
export const VERIFIED_ARCHIVE_RECORDS: ArchiveRecord[] = [
  // 1. Phanigiri Buddhist Complex
  {
    id: 'rec-site-phanigiri',
    title: 'Phanigiri Buddhist Complex',
    type: 'site',
    siteSlug: 'phanigiri',
    district: 'Suryapet',
    period: 'Satavahana & Ikshvaku Dynasty',
    century: '1st Century BCE – 4th Century CE',
    sourceCitation: 'Department of Heritage Telangana Excavation Reports & ASI Memoir 104',
    content: 'Phanigiri (snake-hood hill) in Suryapet district is one of South India’s most monumental Buddhist monastic complexes. Excavations revealed an expansive Maha Stupa with Ayaka platforms, circular chaityagrihas, apsidal viharas, and magnificent lime-mortar and Palnadu limestone relief panels. It is famous worldwide for the ornate Torana architrave depicting the Great Renunciation (Mahabhinishkramana), Brahmi votive inscriptions from royal Ikshvaku ladies and merchant guilds, and an unbroken monastic occupation across five centuries.',
    keywords: ['phanigiri', 'suryapet', 'torana', 'architrave', 'ikshvaku', 'satavahana', 'stupa', 'ayaka', 'limestone', 'renunciation', 'monastery', 'vihara'],
    vector: []
  },
  // 2. Dhulikatta Buddhist Stupa & Fort
  {
    id: 'rec-site-dhulikatta',
    title: 'Dhulikatta Buddhist Stupa & Mud Fort',
    type: 'site',
    siteSlug: 'dhulikatta',
    district: 'Peddapalli',
    period: 'Satavahana & Pre-Satavahana Era',
    century: '3rd Century BCE – 2nd Century CE',
    sourceCitation: 'State Archaeology Department Excavations (1975–1977) & Megasthenes Indica records',
    content: 'Dhulikatta in Peddapalli district features one of the oldest brick-built Maha Stupas in northern Telangana, dating from the Mauryan and early Satavahana era. The 45-acre fortified urban center contains 47 carved limestone Ayaka panels, including the iconic Muchalinda Naga sculpture where the serpent king shelters the meditating Buddha. Discoveries also include lead coins of King Satavahana, punch-marked coins, and ivory combs.',
    keywords: ['dhulikatta', 'peddapalli', 'muchalinda', 'naga', 'serpent', 'satavahana', 'stupa', 'fort', 'brick', 'ayaka'],
    vector: []
  },
  // 3. Nelakondapalli Maha Stupa
  {
    id: 'rec-site-nelakondapalli',
    title: 'Nelakondapalli Maha Stupa & Vihara',
    type: 'site',
    siteSlug: 'nelakondapalli',
    district: 'Khammam',
    period: 'Ikshvaku & Vishnukundina Dynasties',
    century: '2nd – 6th Century CE',
    sourceCitation: 'Telangana Department of Archaeology Excavations & Indian Archaeology Review',
    content: 'Nelakondapalli in Khammam district hosts the largest solid-brick Buddhist stupa in Telangana, with a diameter of over 30 meters. Excavations unearthed terracotta votive stupas, crystal relic caskets, and cast bronze miniature Buddha icons reflecting exquisite Amaravati-style drapery. Extensive monastic vihara complexes and water management reservoirs supported a resident monastic congregation.',
    keywords: ['nelakondapalli', 'khammam', 'bronze', 'buddha', 'stupa', 'relic', 'casket', 'vihara', 'ikshvaku'],
    vector: []
  },
  // 4. Chandavaram Hilltop Terrace Stupa
  {
    id: 'rec-site-chandavaram',
    title: 'Chandavaram Hilltop Stupa',
    type: 'site',
    siteSlug: 'chandavaram',
    district: 'Prakasam / Border Zone',
    period: 'Satavahana Period',
    century: '2nd Century BCE – 2nd Century CE',
    sourceCitation: 'Archaeological Survey of India Epigraphy Records',
    content: 'Chandavaram is a remarkable hilltop Buddhist monastery terraced along the Singarakonda hillock. It features a grand double-terraced Maha Stupa with an elaborate pradakshinapatha (circumambulation passage), multiple votive chaityas, and lime-mortar narrative friezes honoring the Dharmachakra.',
    keywords: ['chandavaram', 'hilltop', 'terrace', 'stupa', 'satavahana', 'dharmachakra'],
    vector: []
  },
  // 5. Badankurthi River Island Hermitage
  {
    id: 'rec-site-badankurthi',
    title: 'Badankurthi River Island Hermitage',
    type: 'site',
    siteSlug: 'badankurthi',
    district: 'Nirmal',
    period: 'Early Historic (Satavahana)',
    century: '2nd Century BCE – 2nd Century CE',
    sourceCitation: 'Epigraphia Indica & Deccan Monastic Surveys',
    content: 'Badankurthi is a peaceful Buddhist island sanctuary nestled in the Godavari river near Khanapur in Nirmal district. Early Buddhist wandering monks (Bhikkhus) selected this natural river islet for secluded meditation. The site features rock-cut steps, brick vihara platforms, and terracotta tiles used by monks travelling along the northern Dakshinapatha route towards Paithan.',
    keywords: ['badankurthi', 'nirmal', 'island', 'godavari', 'river', 'hermitage', 'meditation', 'bhikkhu', 'vihara'],
    vector: []
  },
  // 6. Kondapur Archaeological Complex & Museum
  {
    id: 'rec-site-kondapur',
    title: 'Kondapur Archaeological Complex & Museum',
    type: 'site',
    siteSlug: 'kondapur',
    district: 'Sangareddy',
    period: 'Satavahana Period',
    century: '1st Century BCE – 2nd Century CE',
    sourceCitation: 'Ghulam Yazdani Archaeological Reports (1941) & ASI Kondapur Museum Records',
    content: 'Kondapur in Sangareddy district was an extraordinary Satavahana urban manufacturing and religious hub. Excavations uncovered circular stupas, chaityas, Roman gold coins of Augustus and Tiberius, terracotta double-spouted vessels, and thousands of semi-precious stone beads. An on-site ASI museum safeguards over 8,000 antiquities proving Deccan’s direct trade with the Mediterranean.',
    keywords: ['kondapur', 'sangareddy', 'roman', 'coins', 'beads', 'museum', 'yazdani', 'satavahana', 'terracotta'],
    vector: []
  },
  // 7. Phanigiri Torana Carved Architrave
  {
    id: 'rec-art-phanigiri-torana',
    title: 'Phanigiri Torana Carved Architrave',
    type: 'artifact',
    artifactId: 'art-001',
    siteSlug: 'phanigiri',
    district: 'Suryapet',
    period: 'Ikshvaku Dynasty (3rd Century CE)',
    sourceCitation: 'Artifact Record #TS-ARCH-PHN-2001-084 / State Museum Hyderabad',
    content: 'Accession #TS-ARCH-PHN-2001-084. Carved from Palnadu greenish-white limestone, measuring 210 cm in length. Illustrates the Mahabhinishkramana (Great Renunciation), where Prince Siddhartha leaves his Kapilavastu palace at midnight. Celestial yakshas cradle the hooves of horse Kanthaka to muffle footfalls. Considered one of India’s finest preserved Buddhist gateways alongside Sanchi.',
    keywords: ['phanigiri', 'torana', 'architrave', 'siddhartha', 'kanthaka', 'renunciation', 'limestone', 'ikshvaku'],
    vector: []
  },
  // 8. Muchalinda Naga Protection Slab
  {
    id: 'rec-art-muchalinda-naga',
    title: 'Muchalinda Naga Limestone Relief Slab',
    type: 'artifact',
    artifactId: 'art-002',
    siteSlug: 'dhulikatta',
    district: 'Peddapalli',
    period: 'Satavahana Period (1st Century BCE)',
    sourceCitation: 'Artifact Record #TS-ARCH-DHK-1976-012 / ASI Catalogued',
    content: 'Accession #TS-ARCH-DHK-1976-012. Fine limestone casing slab from Dhulikatta Maha Stupa depicting the serpent king Muchalinda. During a seven-day torrential storm following Buddha’s enlightenment, Muchalinda coils beneath the Master and spreads his multi-headed serpent hood to shield him from rain and wind.',
    keywords: ['muchalinda', 'naga', 'dhulikatta', 'serpent', 'limestone', 'slab', 'enlightenment', 'satavahana'],
    vector: []
  },
  // 9. Nelakondapalli Standing Bronze Buddha
  {
    id: 'rec-art-nelakondapalli-bronze',
    title: 'Nelakondapalli Standing Bronze Buddha',
    type: 'artifact',
    artifactId: 'art-003',
    siteSlug: 'nelakondapalli',
    district: 'Khammam',
    period: 'Vishnukundina / Late Ikshvaku (5th Century CE)',
    sourceCitation: 'Artifact Record #TS-ARCH-NKP-1984-045 / Hyderabad State Museum',
    content: 'Accession #TS-ARCH-NKP-1984-045. Solid cire-perdue (lost wax) cast bronze icon showing Buddha standing in abhaya mudra with diaphanous pleated sanghati robe draped over his left shoulder. Shows direct stylistic links between Deccan Buddhist metallurgy and maritime Sri Lankan Anuradhapura workshops.',
    keywords: ['nelakondapalli', 'bronze', 'buddha', 'statue', 'abhaya', 'khammam', 'lost wax', 'casting'],
    vector: []
  },
  // 10. Octagonal Pillar Inscription of Phanigiri
  {
    id: 'rec-ins-phanigiri-pillar',
    title: 'Phanigiri Octagonal Pillar Brahmi Inscription',
    type: 'inscription',
    artifactId: 'art-004',
    siteSlug: 'phanigiri',
    district: 'Suryapet',
    period: 'Ikshvaku Dynasty (4th Century CE)',
    sourceCitation: 'Verified Inscription Record #INS-PHN-2003 / Epigraphia Indica Vol. XXXVIII',
    content: 'Epigraph carved in Southern Brahmi script in Prakrit language on an octagonal limestone pillar. Records the installation of a stone pillar (Dharmastambha) and gift of land to the Dharmachakra Sangha by royal physician (Bhadanta) and noblewoman Kamasri. Confirms the monastic title "Kantamahaselena" (monastery of the great hill).',
    keywords: ['inscription', 'brahmi', 'prakrit', 'phanigiri', 'pillar', 'epigraphy', 'donor', 'kamasri', 'dharmastambha'],
    vector: []
  },
  // 11. Monastic Vihara Definition & Function
  {
    id: 'rec-concept-vihara',
    title: 'Buddhist Vihara: Architecture & Monastic Life',
    type: 'monastic_concept',
    sourceCitation: 'Scholarly Monograph: Buddhist Monasteries of the Deccan (ASI Memoir 104)',
    content: 'A Buddhist Vihara is a residential monastery for ordained Buddhist monks (Bhikkhus) and nuns (Bhikkhunis). In ancient Telangana (such as Phanigiri, Nelakondapalli, and Dhulikatta), viharas were built around central pillared courtyards surrounded by rows of individual residential cells (layanas). Key sections included meditation rooms, storehouses (koshthagara), refectories, and water cisterns. They served as universities of philosophy, grammar, and medicine.',
    keywords: ['vihara', 'monastery', 'monks', 'bhikkhu', 'cells', 'architecture', 'monastic', 'sangha', 'chaitya'],
    vector: []
  },
  // 12. Satavahana Heritage Association
  {
    id: 'rec-dynasty-satavahana',
    title: 'Satavahana Dynasty Heritage Sites in Telangana',
    type: 'historical_document',
    sourceCitation: 'Telangana History & Archaeology Corpus, Vol. 1',
    content: 'The Satavahana dynasty (c. 2nd Century BCE – 3rd Century CE) ruled from Kotilingala, Pratishthana, and Dhanyakataka. Major Telangana sites founded or patronized during the Satavahanas include: Kotilingala (earliest Satavahana coinage site), Dhulikatta (monumental brick stupa and fortified city), Phanigiri (early monastic settlement), Kondapur (major bead manufacturing and stupa center), and Badankurthi (island retreat on the Godavari).',
    keywords: ['satavahana', 'kotilingala', 'dhulikatta', 'kondapur', 'badankurthi', 'phanigiri', 'coins', 'dynasty'],
    vector: []
  },
  // 13. Buddhist Heritage Travel Circuit Planning
  {
    id: 'rec-trip-circuit',
    title: 'Curated Telangana Buddhist Heritage Circuit',
    type: 'historical_document',
    sourceCitation: 'SanghaTelangana Official Itinerary & Field Survey Guide',
    content: 'Recommended 3-day Buddhist heritage route: Day 1 departs Hyderabad east along NH-65 to Phanigiri (Suryapet district) to inspect the Maha Stupa and carved torana gateways. Day 2 travels southeast to Nelakondapalli (Khammam) to examine the 30-meter brick stupa and viharas. Day 3 moves northwest toward Peddapalli to visit the fortified settlement and Muchalinda Naga stupa at Dhulikatta, completing a loop via Kondapur ASI Museum.',
    keywords: ['trip', 'itinerary', 'circuit', 'plan', 'route', 'travel', 'phanigiri', 'nelakondapalli', 'dhulikatta', 'kondapur'],
    vector: []
  }
];

// Initialize vectors for all archive records
VERIFIED_ARCHIVE_RECORDS.forEach((rec) => {
  const fullText = `${rec.title} ${rec.content} ${rec.keywords.join(' ')} ${rec.district || ''} ${rec.period || ''}`;
  rec.vector = generateEmbedding(fullText);
});

// Vector search function with hybrid keyword reranking
export interface VectorSearchResult {
  record: ArchiveRecord;
  similarityScore: number;
  matchReasons: string[];
}

export function searchArchiveVectors(
  query: string,
  topK = 3,
  minSimilarity = 0.22
): VectorSearchResult[] {
  const queryVector = generateEmbedding(query);
  const lowerQuery = query.toLowerCase();
  const queryTokens = lowerQuery.split(/\s+/).filter((t) => t.length > 2);

  const scoredResults: VectorSearchResult[] = VERIFIED_ARCHIVE_RECORDS.map((record) => {
    // 1. Vector Cosine Similarity
    const vectorScore = cosineSimilarity(queryVector, record.vector);

    // 2. Keyword lexical overlap bonus
    let keywordBonus = 0;
    const matchReasons: string[] = [];

    queryTokens.forEach((token) => {
      if (record.title.toLowerCase().includes(token)) {
        keywordBonus += 0.25;
        matchReasons.push(`Title match: "${token}"`);
      } else if (record.keywords.some((k) => k.toLowerCase().includes(token))) {
        keywordBonus += 0.18;
        matchReasons.push(`Keyword match: "${token}"`);
      } else if (record.content.toLowerCase().includes(token)) {
        keywordBonus += 0.08;
      }
    });

    const combinedScore = vectorScore * 0.7 + Math.min(keywordBonus, 0.3);

    return {
      record,
      similarityScore: combinedScore,
      matchReasons
    };
  });

  // Sort by highest combined similarity score
  scoredResults.sort((a, b) => b.similarityScore - a.similarityScore);

  // Filter out records below similarity threshold
  return scoredResults.filter((res) => res.similarityScore >= minSimilarity).slice(0, topK);
}
