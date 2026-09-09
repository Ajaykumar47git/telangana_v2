import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Compass,
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
  RotateCcw,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';
import { DbHeritageSite } from '../../types/database';
import { useHeritage } from '../../context/HeritageContext';
import { Button } from '../ui/button';

// Try to load leaflet.markercluster safely
let hasMarkerCluster = false;
try {
  // @ts-ignore
  if (typeof (L as any).markerClusterGroup === 'function') {
    hasMarkerCluster = true;
  }
} catch (e) {
  hasMarkerCluster = false;
}

interface HeritageMapProps {
  sites?: DbHeritageSite[];
  selectedSiteId?: string;
  onSelectSite?: (site: DbHeritageSite) => void;
  heightClass?: string;
  showControls?: boolean;
  initialZoom?: number;
  initialCenter?: [number, number];
  interactive?: boolean;
}

export const HeritageMap: React.FC<HeritageMapProps> = ({
  sites: propSites,
  selectedSiteId,
  onSelectSite,
  heightClass = 'h-[550px] lg:h-[650px]',
  showControls = true,
  initialZoom = 7,
  initialCenter = [17.8, 79.2], // Center of Telangana
  interactive = true
}) => {
  const { navigate } = useHeritage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Default fallback sites if not provided via props
  const [loadedSites, setLoadedSites] = useState<DbHeritageSite[]>([]);
  const [loading, setLoading] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [activeSite, setActiveSite] = useState<DbHeritageSite | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  // Fetch from Supabase service if not provided
  useEffect(() => {
    if (propSites && propSites.length > 0) {
      setLoadedSites(propSites);
    } else {
      setLoading(true);
      import('../../lib/supabase').then(({ getHeritageSites }) => {
        getHeritageSites()
          .then((data) => {
            setLoadedSites(data);
            if (selectedSiteId) {
              const match = data.find((s) => s.id === selectedSiteId || s.slug === selectedSiteId);
              if (match) setActiveSite(match);
            }
          })
          .catch((err) => console.error('Failed to load map sites:', err))
          .finally(() => setLoading(false));
      });
    }
  }, [propSites, selectedSiteId]);

  const allSites = propSites && propSites.length > 0 ? propSites : loadedSites;

  // Filtered sites
  const filteredSites = useMemo(() => {
    return allSites.filter((site) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        site.name.toLowerCase().includes(q) ||
        site.district.toLowerCase().includes(q) ||
        site.period.toLowerCase().includes(q) ||
        site.site_type.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q);

      const matchesDistrict = selectedDistrict === 'all' || site.district === selectedDistrict;
      const matchesPeriod =
        selectedPeriod === 'all' ||
        (selectedPeriod === 'Satavahana' && site.period.includes('Satavahana')) ||
        (selectedPeriod === 'Ikshvaku' && site.period.includes('Ikshvaku')) ||
        (selectedPeriod === 'Vishnukundin' && site.period.includes('Vishnukundin'));
      const matchesType =
        selectedType === 'all' ||
        (selectedType === 'Stupa' && site.site_type.toLowerCase().includes('stupa')) ||
        (selectedType === 'Monastery' && site.site_type.toLowerCase().includes('monaster')) ||
        (selectedType === 'Port' && site.site_type.toLowerCase().includes('port')) ||
        (selectedType === 'Urban' && site.site_type.toLowerCase().includes('urban'));
      const matchesFeatured = !onlyFeatured || site.featured;

      return matchesSearch && matchesDistrict && matchesPeriod && matchesType && matchesFeatured;
    });
  }, [allSites, searchQuery, selectedDistrict, selectedPeriod, selectedType, onlyFeatured]);

  // Distinct filter options
  const districts = useMemo(() => {
    return Array.from(new Set(allSites.map((s) => s.district))).filter(Boolean);
  }, [allSites]);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: initialCenter as L.LatLngTuple,
        zoom: initialZoom,
        zoomControl: false, // We supply our own bespoke themed zoom buttons
        attributionControl: false
      });

      // Standard OpenStreetMap TileLayer with high clarity
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Attribution in bottom right
      L.control
        .attribution({
          position: 'bottomright',
          prefix: '<span class="text-[10px] text-[#9E9689]">Leaflet &bull; OpenStreetMap</span>'
        })
        .addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render Markers on map whenever filteredSites or activeSite changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers layer
    if (markersLayerRef.current) {
      map.removeLayer(markersLayerRef.current);
      markersLayerRef.current = null;
    }

    // Use markerClusterGroup if available, or standard LayerGroup
    let group: L.LayerGroup;
    try {
      // @ts-ignore
      if (typeof (L as any).markerClusterGroup === 'function') {
        // @ts-ignore
        group = (L as any).markerClusterGroup({
          showCoverageOnHover: false,
          maxClusterRadius: 40,
          iconCreateFunction: (cluster: any) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div class="w-9 h-9 rounded-full bg-[#191B20] border-2 border-[#B89255] text-[#FAF8F3] font-serif font-bold text-xs flex items-center justify-center shadow-2xl shadow-black/60"><span class="text-[#E8C868]">${count}</span></div>`,
              className: 'custom-cluster-icon',
              iconSize: L.point(36, 36),
              iconAnchor: [18, 18]
            });
          }
        });
      } else {
        group = L.layerGroup();
      }
    } catch (e) {
      group = L.layerGroup();
    }

    // Build pins for each site
    filteredSites.forEach((site) => {
      const isSelected = activeSite?.id === site.id;

      // Custom Dharma Wheel / Stupa Pin Icon
      const customPinHtml = `
        <div class="relative cursor-pointer group transition-transform duration-200 transform ${isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-20'}">
          <div class="w-10 h-10 rounded-full flex items-center justify-center ${
            site.featured
              ? 'bg-gradient-to-tr from-[#B89255] to-[#E8C868] text-[#0D0E10] shadow-[0_0_15px_rgba(212,175,55,0.6)]'
              : 'bg-[#191B20] text-[#B89255] border-2 border-[#B89255] shadow-lg'
          }">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/>
            </svg>
          </div>
          ${
            site.featured
              ? '<span class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E8C868] text-[#0D0E10] text-[9px] font-bold flex items-center justify-center border border-[#191B20] shadow">★</span>'
              : ''
          }
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45 border-r border-b ${
            site.featured ? 'border-[#B89255] bg-[#B89255]' : 'border-[#B89255] bg-[#191B20]'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-heritage-marker',
        html: customPinHtml,
        iconSize: [40, 44],
        iconAnchor: [20, 42],
        popupAnchor: [0, -42]
      });

      const marker = L.marker([site.latitude, site.longitude], { icon: customIcon });

      // Build popup content complying with Requirement 3:
      // Display: Site name, District, Period, Thumbnail, Short description, Explore button
      const popupHtml = `
        <div class="w-64 bg-[#191B20] text-[#FAF8F3] border border-[#B89255]/70 shadow-2xl p-0 overflow-hidden font-sans">
          <div class="relative h-28 w-full bg-[#0D0E10] overflow-hidden">
            <img
              src="${site.image_url || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80'}"
              alt="${site.name}"
              class="w-full h-full object-cover"
              crossorigin="anonymous"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#191B20] via-transparent to-transparent"></div>
            <div class="absolute top-2 left-2 bg-[#121316]/90 border border-[#B89255]/40 text-[#E8C868] text-[10px] font-semibold uppercase px-2 py-0.5">
              ${site.district} Dist.
            </div>
            ${
              site.featured
                ? '<div class="absolute top-2 right-2 bg-[#B89255] text-[#0D0E10] text-[10px] font-bold px-1.5 py-0.5">Featured</div>'
                : ''
            }
          </div>
          <div class="p-3.5 space-y-2">
            <div>
              <span class="text-[10px] text-[#B89255] font-serif uppercase tracking-wider block">${site.period}</span>
              <h4 class="font-serif text-base font-bold text-[#FAF8F3] leading-snug">${site.name}</h4>
            </div>
            <p class="text-[11px] text-[#D5C5AE] line-clamp-2 leading-relaxed">
              ${site.description}
            </p>
            <div class="pt-2 border-t border-[#2E333D] flex items-center justify-between">
              <span class="text-[10px] text-[#9E9689] font-mono">${site.latitude.toFixed(4)}° N, ${site.longitude.toFixed(4)}° E</span>
              <a
                href="/sites/${site.slug}"
                id="popup-explore-${site.slug}"
                class="inline-flex items-center gap-1 text-xs font-semibold text-[#0D0E10] bg-[#B89255] hover:bg-[#E8C868] px-2.5 py-1 rounded transition-colors"
              >
                <span>Explore</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'heritage-custom-popup',
        maxWidth: 280,
        closeButton: true
      });

      marker.on('click', () => {
        setActiveSite(site);
        if (onSelectSite) onSelectSite(site);
      });

      // Hook up explore button click in popup to our SPA navigation
      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-explore-${site.slug}`);
        if (btn) {
          btn.onclick = (e) => {
            e.preventDefault();
            navigate(`/sites/${site.slug}`);
          };
        }
      });

      group.addLayer(marker);
    });

    map.addLayer(group);
    markersLayerRef.current = group;

    // If activeSite is specified, center map on it
    if (activeSite) {
      map.panTo([activeSite.latitude, activeSite.longitude], { animate: true });
    }
  }, [filteredSites, activeSite]);

  // Handlers for Map Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  const handleResetBounds = () => {
    if (!mapInstanceRef.current) return;
    if (filteredSites.length > 0) {
      const bounds = L.latLngBounds(filteredSites.map((s) => [s.latitude, s.longitude]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
    } else {
      mapInstanceRef.current.setView(initialCenter as L.LatLngTuple, initialZoom);
    }
    setSearchQuery('');
    setSelectedDistrict('all');
    setSelectedPeriod('all');
    setSelectedType('all');
    setOnlyFeatured(false);
  };

  // Locate user position
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      setTimeout(() => setLocationStatus(null), 3000);
      return;
    }

    setLocationStatus('Locating your position...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationStatus('Location found! Zoomed to your position.');
        setTimeout(() => setLocationStatus(null), 3500);

        const map = mapInstanceRef.current;
        if (map) {
          map.flyTo([latitude, longitude], 11, { duration: 1.5 });

          // Add or update user beacon marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          } else {
            const userIcon = L.divIcon({
              className: 'user-beacon',
              html: `
                <div class="relative flex items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-cyan-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-white shadow-lg"></span>
                </div>
              `,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            });
            const uMarker = L.marker([latitude, longitude], { icon: userIcon });
            uMarker.bindPopup('<div class="text-xs font-sans text-gray-900 font-semibold p-1">Your Current Location</div>');
            uMarker.addTo(map);
            userMarkerRef.current = uMarker;
          }
        }
      },
      (err) => {
        setLocationStatus('Could not access your location. Please check browser permissions.');
        setTimeout(() => setLocationStatus(null), 4000);
      }
    );
  };

  return (
    <div className="relative w-full bg-[#121316] border border-[#2E333D] overflow-hidden shadow-2xl">
      {/* Top Floating Control Bar */}
      {showControls && (
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pointer-events-none">
          {/* Search Input on Map */}
          <div className="pointer-events-auto flex items-center bg-[#191B20]/95 backdrop-blur-md border border-[#2E333D] px-3 py-2 shadow-xl max-w-sm w-full">
            <Search className="w-4 h-4 text-[#B89255] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search monuments, districts, dynasties..."
              className="bg-transparent text-xs text-[#FAF8F3] placeholder:text-[#9E9689] focus:outline-none w-full font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#9E9689] hover:text-[#FAF8F3] ml-1.5 cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>

          {/* Filter Bar / Toggles */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsFilterPanelOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs border backdrop-blur-md shadow-lg transition-all cursor-pointer ${
                isFilterPanelOpen || selectedDistrict !== 'all' || selectedPeriod !== 'all' || selectedType !== 'all' || onlyFeatured
                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold'
                  : 'bg-[#191B20]/90 text-[#FAF8F3] border-[#2E333D] hover:border-[#B89255]'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Map Filters</span>
              {(selectedDistrict !== 'all' || selectedPeriod !== 'all' || selectedType !== 'all' || onlyFeatured) && (
                <span className="w-2 h-2 rounded-full bg-red-500 ml-1" />
              )}
            </button>

            <button
              onClick={() => setOnlyFeatured((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs border backdrop-blur-md shadow-lg transition-all cursor-pointer ${
                onlyFeatured
                  ? 'bg-[#E8C868] text-[#0D0E10] border-[#E8C868] font-semibold'
                  : 'bg-[#191B20]/90 text-[#FAF8F3] border-[#2E333D] hover:border-[#B89255]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89255]" />
              <span>Featured Only</span>
            </button>

            <button
              onClick={handleResetBounds}
              title="Reset View"
              className="p-2 bg-[#191B20]/90 text-[#FAF8F3] hover:text-[#B89255] border border-[#2E333D] hover:border-[#B89255] backdrop-blur-md shadow-lg cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Expandable Filter Drawer Overlay */}
      {showControls && isFilterPanelOpen && (
        <div className="absolute top-16 left-4 z-30 w-80 max-w-[calc(100%-2rem)] bg-[#191B20]/95 backdrop-blur-md border border-[#B89255]/70 p-4 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-[#2E333D] pb-2">
            <h4 className="font-serif text-sm font-bold text-[#FAF8F3] flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#B89255]" />
              <span>Filter Heritage Sites</span>
            </h4>
            <button
              onClick={() => setIsFilterPanelOpen(false)}
              className="text-xs text-[#9E9689] hover:text-[#FAF8F3] cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* District Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#B89255]">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-[#121316] text-[#FAF8F3] border border-[#2E333D] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#B89255]"
            >
              <option value="all">All Districts (Entire Telangana)</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d} District
                </option>
              ))}
            </select>
          </div>

          {/* Historical Period Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#B89255]">
              Historical Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-[#121316] text-[#FAF8F3] border border-[#2E333D] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#B89255]"
            >
              <option value="all">All Eras & Dynasties</option>
              <option value="Satavahana">Satavahana Era (3rd c. BCE – 2nd c. CE)</option>
              <option value="Ikshvaku">Ikshvaku Dynasty (2nd – 4th c. CE)</option>
              <option value="Vishnukundin">Vishnukundin Era (4th – 6th c. CE)</option>
            </select>
          </div>

          {/* Site Type Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#B89255]">
              Site Typology
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#121316] text-[#FAF8F3] border border-[#2E333D] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#B89255]"
            >
              <option value="all">All Monument Types</option>
              <option value="Stupa">Maha Stupa & Chaitya</option>
              <option value="Monastery">Vihara & Monastic Complex</option>
              <option value="Port">Riverine Port & Trade Wharf</option>
              <option value="Urban">Urban Manufacturing & Bead Workshop</option>
            </select>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#2E333D] flex items-center justify-between">
            <span className="text-xs text-[#D5C5AE]">
              Showing: <strong className="text-[#B89255]">{filteredSites.length}</strong> of {allSites.length}
            </span>
            <button
              onClick={() => {
                setSelectedDistrict('all');
                setSelectedPeriod('all');
                setSelectedType('all');
                setOnlyFeatured(false);
                setSearchQuery('');
              }}
              className="text-xs text-[#9E9689] hover:text-[#FAF8F3] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Floating Map Navigation Controls (Right Side) */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={handleLocateMe}
          title="Find My Location (GPS)"
          className="w-9 h-9 bg-[#191B20]/95 hover:bg-[#22262E] text-[#FAF8F3] hover:text-cyan-400 border border-[#2E333D] hover:border-cyan-400/50 backdrop-blur-md shadow-xl flex items-center justify-center cursor-pointer transition-colors"
        >
          <Crosshair className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-9 h-9 bg-[#191B20]/95 hover:bg-[#22262E] text-[#FAF8F3] hover:text-[#B89255] border border-[#2E333D] hover:border-[#B89255] backdrop-blur-md shadow-xl flex items-center justify-center cursor-pointer transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-9 h-9 bg-[#191B20]/95 hover:bg-[#22262E] text-[#FAF8F3] hover:text-[#B89255] border border-[#2E333D] hover:border-[#B89255] backdrop-blur-md shadow-xl flex items-center justify-center cursor-pointer transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Status notification toast for Geolocation */}
      {locationStatus && (
        <div className="absolute bottom-6 left-4 z-20 bg-[#191B20]/95 text-[#FAF8F3] border border-cyan-500/50 px-3 py-2 text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{locationStatus}</span>
        </div>
      )}

      {/* Leaflet DOM Node Container */}
      <div
        ref={mapContainerRef}
        className={`w-full ${heightClass} z-10`}
        style={{ background: '#121316' }}
      />
    </div>
  );
};

