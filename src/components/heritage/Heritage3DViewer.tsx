import React, { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sun,
  Sunset,
  Moon,
  Lightbulb,
  Sparkles,
  Info,
  Layers,
  Box,
  Sliders,
  X,
  Compass,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/button';
import { useHeritage } from '../../context/HeritageContext';

// Hotspot Information Type
export interface Hotspot3DInfo {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  description: string;
  historicalContext: string;
  archaeologicalNotes: string;
  associatedArtifact?: {
    name: string;
    id: string;
    image: string;
  };
}

const DEFAULT_3D_HOTSPOTS: Hotspot3DInfo[] = [
  {
    id: 'hs-mahastupa',
    name: 'Mahastupa',
    category: 'Sacred Relic Reliquary',
    position: [0, 4.2, 0],
    description:
      'Solid baked-brick and limestone drum encasing the sacred Buddha relic chamber. Decorated with Ayaka projections and carved bas-relief narrative panels illustrating the Jatakas.',
    historicalContext:
      'Patronized by queens and royal physicians of the Satavahana and Ikshvaku dynasties, confirmed by Brahmi epigraphs around the drum casing.',
    archaeologicalNotes:
      'Excavation confirmed wheel-spoke structural brick radiating walls designed to stabilize the massive hemispherical anda against seismic subsidence.',
    associatedArtifact: {
      id: 'art-001',
      name: 'Phanigiri Torana Carved Architrave',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'hs-vihara',
    name: 'Vihara',
    category: 'Monastic Cloister & Cells',
    position: [-8, 1.2, 3],
    description:
      'Residential quadrangle comprising individual monk dormitories (parivena), a communal refectory, stone water storage cisterns, and covered meditation walkways.',
    historicalContext:
      'Housed resident bhikkus belonging to the Dhammottariya and Mahasanghika traditions during the rainy retreat season (Vassa).',
    archaeologicalNotes:
      'Lime-plastered floor levels and terracotta ring wells demonstrate sophisticated rainwater harvesting and drainage engineering.',
    associatedArtifact: {
      id: 'art-006',
      name: 'Rouletted Ware and Amphorae Sherds',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'hs-pillar',
    name: 'Pillar',
    category: 'Ayaka Inscribed Pillar',
    position: [0, 2.5, 6.2],
    description:
      'Monolithic octagonal sandstone pillar carved with commemorative Brahmi inscriptions recording royal and merchant grants for the spiritual merit of all living beings.',
    historicalContext:
      'Stands on the southern Ayaka projection. Represents the Five Key Events of the Buddha’s earthly mission.',
    archaeologicalNotes:
      'Eight lines of deeply chiseled Southern Brahmi script in Prakrit language, dating to the regnal year 14 of King Rudrapurusadatta.',
    associatedArtifact: {
      id: 'art-002',
      name: 'Brahmi Inscribed Ayaka Octagonal Pillar',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'hs-entrance',
    name: 'Entrance',
    category: 'Torana Ceremonial Gateway',
    position: [0, 2.0, 11.5],
    description:
      'Three-tiered monumental Torana gateway arch with carved spiral volutes, projecting makara water monsters, and relief carvings of Siddhartha’s Great Departure.',
    historicalContext:
      'The ceremonial gateway oriented toward the river approach where pilgrims entered barefoot after ritual cleansing.',
    archaeologicalNotes:
      'Discovered broken into 18 pieces by archaeologists in 2001 and digitally reassembled through 3D photogrammetry.',
    associatedArtifact: {
      id: 'art-007',
      name: 'Siddhartha Renunciation Torana Medallion',
      image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'hs-artifact-area',
    name: 'Artifact area',
    category: 'Relic Pit & Bronze Atelier',
    position: [6.5, 0.8, -4],
    description:
      'Stratified excavation trench where votive lead coinage caches, inscribed clay sealings, and bronze standing Buddha icons were uncovered beneath ancient flagstones.',
    historicalContext:
      'Served as the sanctuary treasury and consecration pit where pious pilgrims deposited gold flowers and Roman coins as offerings.',
    archaeologicalNotes:
      'Carbon-dated archaeological stratum dating securely between 1st century BCE and 3rd century CE.',
    associatedArtifact: {
      id: 'art-004',
      name: 'Satavahana Lead & Potin Coinage Cache',
      image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80'
    }
  }
];

// -----------------------------------------------------------------------------
// PROCEDURAL ARCHAEOLOGICAL RECONSTRUCTION 3D MODEL
// Authentically recreates Telangana's Buddhist Stupa Architecture:
// Circular Drum (Medhi), Hemispherical Dome (Anda), Square Harmika,
// 3-tiered Chhatravali, 4 Ayaka Platforms with Octagonal Pillars, Torana Gateway.
// -----------------------------------------------------------------------------
const StupaProceduralReconstruction: React.FC<{
  activeHotspotId: string | null;
  onSelectHotspot: (hs: Hotspot3DInfo) => void;
}> = ({ activeHotspotId, onSelectHotspot }) => {
  return (
    <group>
      {/* 1. TERRAIN BASE PLATFORM (Granite bedrock of Deccan plateau) */}
      <mesh receiveShadow position={[0, -0.3, 0]}>
        <cylinderGeometry args={[18, 19, 0.6, 32]} />
        <meshStandardMaterial color="#22201D" roughness={0.9} />
      </mesh>

      {/* Outer Circumambulation Floor (Pradakshinapatha) */}
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <cylinderGeometry args={[14, 14, 0.1, 32]} />
        <meshStandardMaterial color="#403A32" roughness={0.8} />
      </mesh>

      {/* 2. MAHASTUPA STRUCTURE */}
      {/* Lower Circular Terrace (Medhi) */}
      <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
        <cylinderGeometry args={[8.5, 8.8, 1.4, 36]} />
        <meshStandardMaterial color="#EAE6DF" roughness={0.6} />
      </mesh>

      {/* Upper Drum with Limestone Casing Relief Band */}
      <mesh castShadow receiveShadow position={[0, 1.9, 0]}>
        <cylinderGeometry args={[7.2, 7.5, 1.0, 36]} />
        <meshStandardMaterial color="#D8D2C6" roughness={0.5} />
      </mesh>

      {/* Hemispherical Dome (Anda) */}
      <mesh castShadow receiveShadow position={[0, 2.4, 0]}>
        <sphereGeometry args={[6.8, 36, 18, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#F2EFE9" roughness={0.4} />
      </mesh>

      {/* Square Balustrade / Reliquary Box (Harmika) */}
      <mesh castShadow receiveShadow position={[0, 7.3, 0]}>
        <boxGeometry args={[2.2, 1.1, 2.2]} />
        <meshStandardMaterial color="#C59A4E" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Central Spire Shaft (Yasti) */}
      <mesh castShadow position={[0, 8.8, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 2.4, 16]} />
        <meshStandardMaterial color="#9E7836" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Triple Royal Umbrellas (Chhatravali) */}
      <mesh castShadow position={[0, 8.4, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.1, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0, 9.0, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.1, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0, 9.5, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* 3. FOUR CARDINAL AYAKA PROJECTIONS (North, South, East, West) */}
      {[
        { rot: 0, pos: [0, 0.75, 7.6] as [number, number, number] }, // South
        { rot: Math.PI, pos: [0, 0.75, -7.6] as [number, number, number] }, // North
        { rot: Math.PI * 0.5, pos: [7.6, 0.75, 0] as [number, number, number] }, // East
        { rot: -Math.PI * 0.5, pos: [-7.6, 0.75, 0] as [number, number, number] } // West
      ].map((cardinal, idx) => (
        <group key={idx} rotation={[0, cardinal.rot, 0]}>
          {/* Ayaka Base Platform */}
          <mesh castShadow receiveShadow position={[0, 0.75, 7.8]}>
            <boxGeometry args={[4.2, 1.3, 1.5]} />
            <meshStandardMaterial color="#E8E2D5" roughness={0.6} />
          </mesh>

          {/* 5 Ayaka Monolithic Octagonal Pillars on each platform */}
          {[-1.6, -0.8, 0, 0.8, 1.6].map((xOffset, pIdx) => (
            <mesh key={pIdx} castShadow position={[xOffset, 2.5, 7.8]}>
              <cylinderGeometry args={[0.14, 0.16, 2.4, 8]} />
              <meshStandardMaterial color="#DDD6C8" roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 4. CEREMONIAL TORANA GATEWAY (Entrance) */}
      <group position={[0, 0, 11.5]}>
        {/* Left Post */}
        <mesh castShadow position={[-1.8, 2.2, 0]}>
          <boxGeometry args={[0.4, 4.4, 0.4]} />
          <meshStandardMaterial color="#D4A759" roughness={0.6} />
        </mesh>
        {/* Right Post */}
        <mesh castShadow position={[1.8, 2.2, 0]}>
          <boxGeometry args={[0.4, 4.4, 0.4]} />
          <meshStandardMaterial color="#D4A759" roughness={0.6} />
        </mesh>
        {/* Architrave 1 (Lower Crossbeam) */}
        <mesh castShadow position={[0, 3.4, 0]}>
          <boxGeometry args={[4.8, 0.35, 0.3]} />
          <meshStandardMaterial color="#E0B768" roughness={0.5} />
        </mesh>
        {/* Architrave 2 (Middle Crossbeam) */}
        <mesh castShadow position={[0, 4.0, 0]}>
          <boxGeometry args={[4.4, 0.35, 0.3]} />
          <meshStandardMaterial color="#E0B768" roughness={0.5} />
        </mesh>
        {/* Architrave 3 (Top Crossbeam with spirals) */}
        <mesh castShadow position={[0, 4.6, 0]}>
          <boxGeometry args={[4.0, 0.35, 0.3]} />
          <meshStandardMaterial color="#E0B768" roughness={0.5} />
        </mesh>
        {/* Torana Finial Dharmachakra Wheel */}
        <mesh position={[0, 5.1, 0]}>
          <torusGeometry args={[0.3, 0.08, 12, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* 5. MONASTIC CLOISTERS / VIHARA (Residential Cells) */}
      <group position={[-9, 0, 3]}>
        {/* Perimeter Foundation */}
        <mesh receiveShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[6, 0.6, 8]} />
          <meshStandardMaterial color="#3D342A" roughness={0.9} />
        </mesh>
        {/* Monastic Cells Partition Walls */}
        {[-2.2, -0.7, 0.8, 2.3].map((z, cIdx) => (
          <mesh key={cIdx} castShadow position={[0, 1.0, z]}>
            <boxGeometry args={[5.6, 0.8, 0.3]} />
            <meshStandardMaterial color="#A39682" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* 6. RELIC PIT / EXCAVATION TRENCH */}
      <group position={[6.5, 0, -4]}>
        <mesh receiveShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[4.5, 0.2, 4.5]} />
          <meshStandardMaterial color="#2B2620" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 16]} />
          <meshStandardMaterial color="#B89255" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* 7. INTERACTIVE 3D HOTSPOT LABELS (Requirement 8) */}
      {DEFAULT_3D_HOTSPOTS.map((hs) => {
        const isSelected = hs.id === activeHotspotId;
        return (
          <group key={hs.id} position={hs.position}>
            {/* Pulsing Beacon Light */}
            <pointLight
              color={isSelected ? '#E8C868' : '#B89255'}
              intensity={isSelected ? 1.5 : 0.6}
              distance={3}
            />

            {/* Visual 3D Anchor Marker */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#F3D278' : '#B89255'}
                emissive={isSelected ? '#D4AF37' : '#5E461B'}
                emissiveIntensity={0.8}
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>

            {/* Clickable 2.5D Billboard Label */}
            <Html position={[0, 0.45, 0]} center distanceFactor={14}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(hs);
                }}
                className={`group px-2.5 py-1 rounded-sm text-xs font-serif font-bold whitespace-nowrap transition-all shadow-xl cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#B89255] text-[#0D0E10] border-2 border-[#FAF8F3] scale-110 ring-4 ring-[#B89255]/40'
                    : 'bg-[#121316]/90 text-[#FAF8F3] border border-[#B89255] hover:bg-[#B89255] hover:text-[#0D0E10]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#E8C868] group-hover:text-[#0D0E10]" />
                <span>{hs.name}</span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

// -----------------------------------------------------------------------------
// EXTERNAL GLB/GLTF MODEL RENDERER WITH AUTOMATIC ERROR BOUNDARY
// -----------------------------------------------------------------------------
const GLTFModelWrapper: React.FC<{
  modelUrl: string;
  activeHotspotId: string | null;
  onSelectHotspot: (hs: Hotspot3DInfo) => void;
}> = ({ modelUrl, activeHotspotId, onSelectHotspot }) => {
  try {
    const gltf = useGLTF(modelUrl);
    return (
      <group>
        <primitive object={gltf.scene} scale={1.0} />
        {/* Overlay Hotspots on top of GLTF model */}
        {DEFAULT_3D_HOTSPOTS.map((hs) => (
          <group key={hs.id} position={hs.position}>
            <Html position={[0, 0.4, 0]} center distanceFactor={14}>
              <button
                onClick={() => onSelectHotspot(hs)}
                className="px-2 py-0.5 bg-[#121316]/90 border border-[#B89255] text-[11px] text-[#FAF8F3] font-serif font-bold shadow-xl hover:bg-[#B89255] hover:text-[#0D0E10] transition-colors cursor-pointer"
              >
                {hs.name}
              </button>
            </Html>
          </group>
        ))}
      </group>
    );
  } catch (err) {
    // If GLB fails to load, gracefully display the procedural model
    return (
      <StupaProceduralReconstruction
        activeHotspotId={activeHotspotId}
        onSelectHotspot={onSelectHotspot}
      />
    );
  }
};

// Camera Controller for Reset
const CameraResetController: React.FC<{ resetTrigger: number }> = ({ resetTrigger }) => {
  const { camera } = useThree();

  React.useEffect(() => {
    if (resetTrigger > 0) {
      camera.position.set(13, 9, 15);
      camera.lookAt(0, 3, 0);
    }
  }, [resetTrigger, camera]);

  return null;
};

// -----------------------------------------------------------------------------
// MAIN 3D HERITAGE VIEWER COMPONENT
// -----------------------------------------------------------------------------
export type LightingPreset = 'daylight' | 'sunset' | 'moonlight' | 'studio';

interface Heritage3DViewerProps {
  siteSlug: string;
  siteName: string;
  district?: string;
  modelUrl?: string | null;
  hasModel?: boolean;
  className?: string;
}

export const Heritage3DViewer: React.FC<Heritage3DViewerProps> = ({
  siteSlug,
  siteName,
  district = 'Telangana',
  modelUrl,
  hasModel = true,
  className = ''
}) => {
  const { navigate } = useHeritage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lighting, setLighting] = useState<LightingPreset>('daylight');
  const [lightIntensity, setLightIntensity] = useState(1.4);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot3DInfo | null>(null);
  const [resetCount, setResetCount] = useState(0);
  const [showWireframe, setShowWireframe] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Requirement 10: Model Fallback if 3D model is unavailable
  if (!hasModel) {
    return (
      <div
        className={`relative w-full bg-[#121316] border border-[#2E333D] p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-5 shadow-2xl ${className}`}
      >
        <div className="w-16 h-16 rounded-full bg-[#191B20] border-2 border-dashed border-[#B89255]/60 flex items-center justify-center text-[#B89255] shadow-inner">
          <Box className="w-8 h-8 animate-pulse" />
        </div>

        <div className="max-w-md space-y-2">
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono uppercase bg-amber-950/80 text-amber-300 border border-amber-800">
            Archaeological Photogrammetry in Progress
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3]">
            3D Reconstruction Coming Soon
          </h3>
          <p className="text-xs sm:text-sm text-[#D5C5AE] leading-relaxed">
            High-density LiDAR surveys and drone photogrammetry are currently being compiled for{' '}
            <strong className="text-[#FAF8F3]">{siteName}</strong>. Spatial polygon rendering will be available in the upcoming heritage release.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="gold"
            size="sm"
            onClick={() => navigate(`/virtual-tours/${siteSlug}`)}
            className="text-xs"
          >
            <Compass className="w-4 h-4 mr-1.5" />
            <span>Explore 360° Virtual Tour Instead</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/sites/${siteSlug}`)}
            className="text-xs"
          >
            <span>View Architectural Survey Data</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    );
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Lighting configuration settings
  const lightConfig = useMemo(() => {
    switch (lighting) {
      case 'sunset':
        return {
          ambientColor: '#8C5B32',
          ambientIntensity: 0.6 * lightIntensity,
          sunColor: '#FF9E4A',
          sunPosition: [18, 6, 12] as [number, number, number],
          sunIntensity: 2.2 * lightIntensity,
          groundColor: '#4A2810'
        };
      case 'moonlight':
        return {
          ambientColor: '#1A233A',
          ambientIntensity: 0.5 * lightIntensity,
          sunColor: '#7AA2E3',
          sunPosition: [-12, 14, -10] as [number, number, number],
          sunIntensity: 1.2 * lightIntensity,
          groundColor: '#0E1320'
        };
      case 'studio':
        return {
          ambientColor: '#FAF8F3',
          ambientIntensity: 1.0 * lightIntensity,
          sunColor: '#FFFFFF',
          sunPosition: [0, 20, 10] as [number, number, number],
          sunIntensity: 1.8 * lightIntensity,
          groundColor: '#2B2620'
        };
      case 'daylight':
      default:
        return {
          ambientColor: '#F5EFEB',
          ambientIntensity: 0.8 * lightIntensity,
          sunColor: '#FFE8C2',
          sunPosition: [14, 18, 14] as [number, number, number],
          sunIntensity: 1.8 * lightIntensity,
          groundColor: '#302920'
        };
    }
  }, [lighting, lightIntensity]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-[#0B0C0E] border border-[#2E333D] overflow-hidden shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen border-none' : 'h-[560px] sm:h-[680px]'
      } ${className}`}
    >
      {/* 3D WebGL Canvas Engine (Three.js & React Three Fiber) */}
      <Canvas
        shadows
        camera={{ position: [13, 9, 15], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]} // Mobile performance constraint (Requirement 11)
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <CameraResetController resetTrigger={resetCount} />

        {/* Ambient & Directional Lighting Rig (Requirement 7) */}
        <ambientLight color={lightConfig.ambientColor} intensity={lightConfig.ambientIntensity} />
        <directionalLight
          castShadow
          position={lightConfig.sunPosition}
          intensity={lightConfig.sunIntensity}
          color={lightConfig.sunColor}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={45}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
        />
        <hemisphereLight
          color={lightConfig.ambientColor}
          groundColor={lightConfig.groundColor}
          intensity={0.4}
        />

        {/* 3D Scene / Model with Hotspots */}
        <Suspense fallback={null}>
          {modelUrl ? (
            <GLTFModelWrapper
              modelUrl={modelUrl}
              activeHotspotId={selectedHotspot?.id || null}
              onSelectHotspot={(hs) => setSelectedHotspot(hs)}
            />
          ) : (
            <StupaProceduralReconstruction
              activeHotspotId={selectedHotspot?.id || null}
              onSelectHotspot={(hs) => setSelectedHotspot(hs)}
            />
          )}
        </Suspense>

        {/* Camera Controls (Rotate, Zoom, Pan) */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={32}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from going beneath ground
          target={[0, 3, 0]}
        />
      </Canvas>

      {/* TOP OVERLAY: Site Title & Status */}
      <div className="absolute top-4 left-4 pointer-events-none z-20">
        <div className="bg-[#121316]/90 border border-[#2E333D] backdrop-blur-md p-3 max-w-sm pointer-events-auto shadow-xl">
          <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-[#B89255] font-semibold">
            <Box className="w-3.5 h-3.5" />
            <span>Interactive 3D Spatial Reconstruction &bull; {district}</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#FAF8F3] mt-0.5">
            {siteName}
          </h3>
          <span className="text-[10px] text-amber-400 font-mono block mt-0.5">
            Digital Reconstruction — Illustrative Visualization
          </span>
        </div>
      </div>

      {/* TOP RIGHT: Camera & Display Tools */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-[#121316]/90 border border-[#2E333D] p-1.5 backdrop-blur-md shadow-xl">
        <button
          onClick={() => setResetCount((c) => c + 1)}
          className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20] transition-colors cursor-pointer"
          title="Reset Camera View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20] transition-colors cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* BOTTOM FLOATING CONTROLS: Lighting Controls & Hotspot Selector */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        {/* Lighting Atmosphere Controls (Requirement 7) */}
        <div className="bg-[#121316]/95 border border-[#2E333D] p-2.5 backdrop-blur-md pointer-events-auto shadow-xl flex items-center gap-3">
          <span className="text-[10px] uppercase font-mono text-[#B89255] hidden sm:inline">
            Lighting:
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLighting('daylight')}
              className={`p-1.5 text-xs flex items-center gap-1 border transition-colors cursor-pointer ${
                lighting === 'daylight'
                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold'
                  : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
              }`}
              title="Bright Daylight"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden md:inline">Day</span>
            </button>
            <button
              onClick={() => setLighting('sunset')}
              className={`p-1.5 text-xs flex items-center gap-1 border transition-colors cursor-pointer ${
                lighting === 'sunset'
                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold'
                  : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
              }`}
              title="Sunset Golden Hour"
            >
              <Sunset className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden md:inline">Sunset</span>
            </button>
            <button
              onClick={() => setLighting('moonlight')}
              className={`p-1.5 text-xs flex items-center gap-1 border transition-colors cursor-pointer ${
                lighting === 'moonlight'
                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold'
                  : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
              }`}
              title="Moonlit Night"
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden md:inline">Moon</span>
            </button>
            <button
              onClick={() => setLighting('studio')}
              className={`p-1.5 text-xs flex items-center gap-1 border transition-colors cursor-pointer ${
                lighting === 'studio'
                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold'
                  : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
              }`}
              title="Archaeological Studio Light"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden md:inline">Studio</span>
            </button>
          </div>

          {/* Intensity Slider */}
          <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-[#2E333D]">
            <Sliders className="w-3 h-3 text-[#9E9689]" />
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.1}
              value={lightIntensity}
              onChange={(e) => setLightIntensity(Number(e.target.value))}
              className="w-16 h-1 bg-[#2E333D] rounded appearance-none cursor-pointer accent-[#B89255]"
              title="Adjust Sunlight Intensity"
            />
          </div>
        </div>

        {/* Hotspot Quick Jumper Pills (Requirement 8) */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#121316]/95 border border-[#2E333D] p-2 backdrop-blur-md pointer-events-auto">
          <span className="text-[10px] uppercase font-mono text-[#9E9689] mr-1">Hotspots:</span>
          {DEFAULT_3D_HOTSPOTS.map((hs) => (
            <button
              key={hs.id}
              onClick={() => setSelectedHotspot(hs)}
              className={`px-2 py-1 text-[11px] font-mono border transition-colors cursor-pointer ${
                selectedHotspot?.id === hs.id
                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-bold'
                  : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
              }`}
            >
              {hs.name}
            </button>
          ))}
        </div>
      </div>

      {/* HOTSPOT DETAIL INFORMATION DRAWER (Requirement 8) */}
      {selectedHotspot && (
        <div className="absolute inset-y-0 right-0 w-full max-w-md bg-[#121316]/98 border-l border-[#B89255] p-6 shadow-2xl z-40 overflow-y-auto space-y-4 backdrop-blur-md animate-in slide-in-from-right duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-[#2E333D]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#B89255] block">
                3D Architectural Element &bull; {selectedHotspot.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FAF8F3] mt-0.5">
                {selectedHotspot.name}
              </h3>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-1.5 text-[#9E9689] hover:text-[#FAF8F3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#D5C5AE] leading-relaxed">
            <p>{selectedHotspot.description}</p>

            <div className="p-3 bg-[#191B20] border border-[#2E333D] space-y-1">
              <span className="text-[10px] uppercase font-mono text-[#B89255] font-semibold block">
                Historical Context
              </span>
              <p className="text-xs text-[#FAF8F3] italic">
                {selectedHotspot.historicalContext}
              </p>
            </div>

            <div className="p-3 bg-[#191B20] border border-[#2E333D] space-y-1">
              <span className="text-[10px] uppercase font-mono text-[#9E9689] font-semibold block">
                Archaeological Evidence
              </span>
              <p className="text-xs text-[#D5C5AE]">
                {selectedHotspot.archaeologicalNotes}
              </p>
            </div>

            {selectedHotspot.associatedArtifact && (
              <div className="p-3 bg-[#15171D] border border-[#B89255]/40 flex items-center gap-3">
                <div className="w-14 h-14 bg-[#0D0E10] border border-[#2E333D] overflow-hidden shrink-0">
                  <img
                    src={selectedHotspot.associatedArtifact.image}
                    alt={selectedHotspot.associatedArtifact.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase font-mono text-[#B89255] block">
                    Excavated Artifact Discovery
                  </span>
                  <h5 className="font-serif text-xs font-bold text-[#FAF8F3] truncate">
                    {selectedHotspot.associatedArtifact.name}
                  </h5>
                  <button
                    onClick={() => {
                      setSelectedHotspot(null);
                      navigate(`/archive/artifacts/${selectedHotspot.associatedArtifact!.id}`);
                    }}
                    className="text-[10px] text-[#B89255] hover:text-[#E8C868] flex items-center gap-1 mt-1 cursor-pointer font-medium"
                  >
                    <span>Inspect in Archive</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#2E333D] flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedHotspot(null)}
              className="text-xs"
            >
              Dismiss Label
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={() => navigate(`/virtual-tours/${siteSlug}`)}
              className="text-xs"
            >
              <Compass className="w-3.5 h-3.5 mr-1" />
              <span>360° Walkthrough</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
