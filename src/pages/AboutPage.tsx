import React from 'react';
import { Landmark, Shield, Database, Compass, BookOpen, Mail, Phone, ExternalLink, Cpu } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/button';
import { useHeritage } from '../context/HeritageContext';

export const AboutPage: React.FC = () => {
  const { navigate, showNotification } = useHeritage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'About the Project' }]} />

      {/* Hero Intro */}
      <div className="border-b border-[#2E333D] pb-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
          <Landmark className="w-4 h-4" />
          <span>The SanghaTelangana Digital Heritage Initiative</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#FAF8F3] max-w-4xl leading-tight">
          Preserving the Sacred Memory of the Deccan Sangha
        </h1>
        <p className="text-base sm:text-lg text-[#D5C5AE] max-w-3xl mt-4 leading-relaxed font-light">
          Telangana holds an extraordinary chapter in world Buddhist history—a cradle of early Mahayana philosophy, majestic stupa architecture, and monumental rock-cut epigraphy along the fertile banks of the Godavari and Krishna rivers.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#191B20] border border-[#2E333D] p-8 space-y-4">
          <div className="w-10 h-10 bg-[#22262E] text-[#B89255] border border-[#B89255]/40 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[#FAF8F3]">
            Our Foundational Mission
          </h2>
          <p className="text-sm text-[#D5C5AE] leading-relaxed">
            SanghaTelangana is dedicated to establishing an open, authoritative, and immersive digital commons that catalogues, interprets, and visually reconstructs the Buddhist heritage of Telangana. Through rigorous archaeology, spatial photogrammetry, and public engagement, we protect these endangered monuments for future generations.
          </p>
        </div>

        <div className="bg-[#191B20] border border-[#2E333D] p-8 space-y-4">
          <div className="w-10 h-10 bg-[#22262E] text-[#E8C868] border border-[#B89255]/40 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[#FAF8F3]">
            Technology Vision
          </h2>
          <p className="text-sm text-[#D5C5AE] leading-relaxed">
            We unite digital museum curatorship, GIS cadastral mapping, 360° virtual telepresence, and AI-grounded epigraphy models. By democratizing access to peer-reviewed historical corpora, we empower scholars, students, and global pilgrims to study Telangana’s antiquities from anywhere on Earth.
          </p>
        </div>
      </div>

      {/* Historical Significance of Buddhism in Telangana */}
      <section className="bg-[#121316] border border-[#2E333D] p-8 sm:p-12 space-y-6">
        <span className="text-xs uppercase tracking-widest text-[#B89255] font-semibold block">
          Historical Evolution
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#FAF8F3]">
          The Golden Millennia: From Satavahanas to Ikshvakus
        </h2>

        <div className="space-y-4 text-sm text-[#D5C5AE] leading-relaxed max-w-4xl">
          <p>
            During the 3rd Century BCE, following the spread of Asoka Maurya’s rock edicts and missionaries across the Dakshinapatha, Telangana became a paramount center of Buddhist monastic monasticism. Sites like Kotilingala on the Godavari served as early mints and administrative centers under the nascent Satavahana kings.
          </p>
          <p>
            Between the 1st and 3rd Centuries CE, Phanigiri emerged as one of the largest monastic university complexes in the subcontinent, producing exquisite limestone Torana architraves whose intricate carvings equal the renowned stupas of Amaravati and Sanchi. Meanwhile, Dhulikatta in Karimnagar showcased monumental stupas adorned with Ayaka projections, and Nelakondapalli in Khammam revealed massive solid brick stupas holding copper and bronze statues of the Buddha.
          </p>
          <p>
            The region served as the spiritual and intellectual highway connecting coastal ports on the Bay of Bengal with inland trade centers across western and northern India, allowing Buddhist schools such as the Chaityaka, Purvasaila, and Aparasaila to flourish.
          </p>
        </div>
      </section>

      {/* Archaeological Sources and Institutional Partners */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
          Archaeological Sources & Curatorial Authorities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#191B20] border border-[#2E333D] space-y-2">
            <span className="text-xs font-mono text-[#B89255] uppercase block">
              Primary Source 01
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#FAF8F3]">
              Archaeological Survey of India (ASI)
            </h3>
            <p className="text-xs text-[#D5C5AE] leading-relaxed">
              Hyderabad Circle reports, Epigraphia Indica volumes, and national monument protection charters.
            </p>
          </div>

          <div className="p-6 bg-[#191B20] border border-[#2E333D] space-y-2">
            <span className="text-xs font-mono text-[#B89255] uppercase block">
              Primary Source 02
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#FAF8F3]">
              Department of Heritage Telangana
            </h3>
            <p className="text-xs text-[#D5C5AE] leading-relaxed">
              Excavation field memoirs from Phanigiri, Nelakondapalli, and Kotilingala led by state archaeologists.
            </p>
          </div>

          <div className="p-6 bg-[#191B20] border border-[#2E333D] space-y-2">
            <span className="text-xs font-mono text-[#B89255] uppercase block">
              Primary Source 03
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#FAF8F3]">
              International Buddhist Epigraphy Archive
            </h3>
            <p className="text-xs text-[#D5C5AE] leading-relaxed">
              Corpus Inscriptionum Indicarum and Prakrit-Brahmi paleographical concordances.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Scholarly Inquiries */}
      <section id="contact" className="bg-[#191B20] border border-[#2E333D] p-8 sm:p-10 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
          Institutional Inquiries & Collaborative Research
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#D5C5AE]">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              We welcome partnerships with universities, research foundations, museum curators, and cultural preservation trusts worldwide.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B89255]" />
                <span className="text-[#FAF8F3]">contact@sanghatelangana.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B89255]" />
                <span className="text-[#FAF8F3]">epigraphy@sanghatelangana.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B89255]" />
                <span className="text-[#FAF8F3]">+91 (040) 2323-HERITAGE</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#121316] border border-[#2E333D] space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B89255] block">
              Digital Archival Rights
            </span>
            <p className="text-[11px] text-[#9E9689] leading-relaxed">
              All 3D models and epigraphical transcripts in SanghaTelangana are published under an Open Heritage Attribution license for non-commercial scholarly and educational research.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/contribute')}
              className="text-xs"
            >
              <span>Submit Archival Materials</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
