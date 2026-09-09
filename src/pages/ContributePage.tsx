import React, { useState } from 'react';
import {
  UploadCloud,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Send,
  Camera,
  CheckCircle2,
  FileText,
  User,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/button';
import { useHeritage } from '../context/HeritageContext';
import { HERITAGE_SITES } from '../data/heritageData';
import { createContribution, uploadStorageFile } from '../lib/supabase';
import { DbContribution } from '../types/database';

export const ContributePage: React.FC = () => {
  const {
    currentUser,
    userRole,
    canSubmitContribution,
    setIsLoginOpen,
    navigate,
    showNotification
  } = useHeritage();

  const [activeTab, setActiveTab] = useState<'photo' | 'damage_report' | 'epigraphical_note'>('photo');

  // Form states
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siteName, setSiteName] = useState(HERITAGE_SITES[0].name);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [damageSeverity, setDamageSeverity] = useState('Moderate Concern');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsLoginOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      let uploadedFileUrl: string | undefined = undefined;

      if (selectedFile) {
        const safeName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const path = `contributions/${currentUser.id}_${Date.now()}_${safeName}`;
        const uploadResult = await uploadStorageFile('contributions', selectedFile, path);
        if (uploadResult.url) {
          uploadedFileUrl = uploadResult.url;
        }
      }

      // Match site ID if available
      const matchedSite = HERITAGE_SITES.find((s) => s.name === siteName);
      const siteId = matchedSite ? matchedSite.id : null;

      const fullDesc =
        activeTab === 'damage_report'
          ? `[Threat Severity: ${damageSeverity}] ${details}`
          : details;

      await createContribution({
        user_id: currentUser.id,
        site_id: siteId,
        title: title || `${siteName} - ${activeTab.replace('_', ' ').toUpperCase()}`,
        contribution_type: activeTab,
        description: fullDesc,
        image_url: uploadedFileUrl || null,
        status: 'pending',
        reviewer_id: null,
        reviewer_notes: null
      });

      setSubmitted(true);
      showNotification('Submission transmitted to the Archaeological Review Board (Supabase synchronized)');
    } catch (err: any) {
      showNotification('Submission error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setTitle('');
    setDetails('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Contribute Research' }]} />

      {/* Header */}
      <div className="border-b border-[#2E333D] pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
          <UploadCloud className="w-4 h-4" />
          <span>Citizen Archaeology & Preservation Collective</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
          Contribute to Telangana Heritage
        </h1>
        <p className="text-sm sm:text-base text-[#D5C5AE] max-w-3xl mt-3 leading-relaxed">
          Help document, monitor, and safeguard ancient Buddhist antiquities. Submit field photographs, notify conservators of environmental weathering or site encroachment, or suggest peer-reviewed epigraphical corrections.
        </p>

        {/* Institutional Review Notice */}
        <div className="mt-6 p-4 bg-[#191B20] border-l-2 border-[#B89255] flex items-center justify-between gap-3 text-xs text-[#D5C5AE]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#B89255] shrink-0" />
            <span>
              <strong>Editorial Standard:</strong> All submissions undergo scholarly verification by archaeological experts before inclusion in the public digital archive.
            </span>
          </div>
          {currentUser && (
            <span className="hidden sm:inline-block px-2.5 py-1 bg-[#121418] border border-[#2E333D] rounded text-[11px] text-[#B89255] uppercase font-semibold">
              Role: {userRole}
            </span>
          )}
        </div>
      </div>

      {/* Form Tabs */}
      <div className="flex border-b border-[#2E333D] overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('photo');
            setSubmitted(false);
          }}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === 'photo'
              ? 'border-[#B89255] text-[#FAF8F3] bg-[#191B20]'
              : 'border-transparent text-[#9E9689] hover:text-[#FAF8F3]'
          }`}
        >
          <Camera className="w-4 h-4 text-[#B89255]" />
          <span>Field Photographs & Documentation</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('damage_report');
            setSubmitted(false);
          }}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === 'damage_report'
              ? 'border-[#B89255] text-[#FAF8F3] bg-[#191B20]'
              : 'border-transparent text-[#9E9689] hover:text-[#FAF8F3]'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Report Site Threat / Damage</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('epigraphical_note');
            setSubmitted(false);
          }}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === 'epigraphical_note'
              ? 'border-[#B89255] text-[#FAF8F3] bg-[#191B20]'
              : 'border-transparent text-[#9E9689] hover:text-[#FAF8F3]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-[#B89255]" />
          <span>Epigraphical Correction</span>
        </button>
      </div>

      {/* Main Grid: Form + Review Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-8 bg-[#191B20] border border-[#2E333D] p-6 sm:p-8 rounded-lg">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FAF8F3]">
                Submission Received with Gratitude
              </h3>
              <p className="text-xs sm:text-sm text-[#D5C5AE] max-w-md mx-auto leading-relaxed">
                Your documentation has been registered in the Supabase PostgreSQL database and queued for curatorial verification.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Submit Another Report
                </Button>
                <Button
                  onClick={() => navigate('/profile')}
                  className="bg-[#B89255] hover:bg-[#C4A052] text-[#121418] text-xs font-semibold"
                >
                  View in My Profile
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Site Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  Target Heritage Site / Monument
                </label>
                <select
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3.5 py-2.5 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
                >
                  {HERITAGE_SITES.map((site) => (
                    <option key={site.id} value={site.name}>
                      {site.name} ({site.district} District)
                    </option>
                  ))}
                  <option value="Unlisted Site">Unlisted Ancient Mound / Stupa</option>
                </select>
              </div>

              {/* Title / Headline */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  Observation Title / Summary
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Limestone Torana Arch Fragment with Rosette Carving"
                  className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3.5 py-2.5 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
                />
              </div>

              {/* Conditional Field: Damage Severity if on Damage tab */}
              {activeTab === 'damage_report' && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                    Threat Nature & Urgency
                  </label>
                  <select
                    value={damageSeverity}
                    onChange={(e) => setDamageSeverity(e.target.value)}
                    className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3.5 py-2.5 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
                  >
                    <option value="Severe Encroachment">Severe Encroachment / Illegal Digging</option>
                    <option value="Severe Weathering">Severe Weathering / Water Seepage</option>
                    <option value="Vandalism / Graffiti">Vandalism / Surface Graffiti</option>
                    <option value="Moderate Concern">Moderate Concern / Vegetation Overgrowth</option>
                  </select>
                </div>
              )}

              {/* Upload area with real file input */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  {activeTab === 'photo'
                    ? 'Attach High-Resolution Field Photograph (Supabase Storage: contributions)'
                    : 'Attach Evidence Photos / Coordinates'}
                </label>

                <div className="border-2 border-dashed border-[#2E333D] hover:border-[#B89255] p-6 text-center cursor-pointer transition-colors bg-[#121316]/60 rounded">
                  <input
                    type="file"
                    id="contrib-file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="contrib-file" className="cursor-pointer block space-y-2">
                    <UploadCloud className="w-8 h-8 text-[#B89255] mx-auto" />
                    <p className="text-xs text-[#FAF8F3]">
                      {selectedFile ? (
                        <span className="text-[#B89255] font-semibold">{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                      ) : (
                        <>
                          Drag and drop image files or <span className="text-[#B89255] underline">browse</span>
                        </>
                      )}
                    </p>
                    <p className="text-[10px] text-[#9E9689]">
                      Supports TIFF, JPEG, PNG, or PDF with EXIF GPS metadata
                    </p>
                  </label>
                </div>

                {previewUrl && (
                  <div className="mt-3 p-2 bg-[#121316] border border-[#2E333D] rounded flex items-center gap-3">
                    <img src={previewUrl} alt="Preview" className="w-16 h-12 object-cover rounded" />
                    <div className="text-xs text-[#9E9689]">
                      <span className="text-[#FAF8F3] font-medium block">File Ready for Upload</span>
                      <span>Will be stored in Supabase contributions bucket</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Details Text Area */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  Detailed Notes & Observations
                </label>
                <textarea
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={
                    activeTab === 'photo'
                      ? 'Describe camera parameters, angle, lighting, and any notable structural carvings observed...'
                      : activeTab === 'damage_report'
                      ? 'Describe the location of damage, visible cracks, estimated date of occurrence...'
                      : 'Provide scholarly citations, transcription corrections, or alternative transliterations with page numbers...'
                  }
                  className="w-full bg-[#121316] text-[#FAF8F3] text-xs p-3.5 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
                />
              </div>

              <div className="pt-4 border-t border-[#2E333D] flex items-center justify-between">
                <div className="text-xs text-[#787163]">
                  {currentUser ? (
                    <span>Submitting as <strong className="text-[#FAF8F3]">{currentUser.name}</strong></span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Authentication required
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#B89255] hover:bg-[#C4A052] text-[#121418] text-xs font-semibold"
                >
                  {isSubmitting ? (
                    'Transmitting...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      <span>Submit to Supabase Archive</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right Sidebar: Guidelines & Auth Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* User Status Card */}
          <div className="bg-[#191B20] border border-[#2E333D] p-5 rounded-lg space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F3] flex items-center gap-2">
              <User className="w-4 h-4 text-[#B89255]" />
              Archival Identity
            </h4>
            {currentUser ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#9E9689]">Name:</span>
                  <span className="text-[#FAF8F3] font-medium">{currentUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9E9689]">Role:</span>
                  <span className="text-[#B89255] font-semibold uppercase">{userRole}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9E9689]">Database:</span>
                  <span className="text-emerald-400">Supabase Connected</span>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={() => navigate('/profile')}
                    className="w-full bg-[#22262E] hover:bg-[#2A2F3A] text-[#FAF8F3] text-xs border border-[#2E333D]"
                  >
                    View My Prior Submissions
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-[#9E9689]">
                  Sign in or switch demo role to attach your archaeological observations directly to your profile.
                </p>
                <Button
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full bg-[#B89255] hover:bg-[#C4A052] text-[#121418] text-xs font-semibold"
                >
                  Sign In / Switch Role
                </Button>
              </div>
            )}
          </div>

          {/* Guidelines Card */}
          <div className="bg-[#191B20] border border-[#2E333D] p-6 space-y-4 rounded-lg">
            <h3 className="font-serif text-lg font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
              Contribution Guidelines
            </h3>

            <ul className="space-y-3 text-xs text-[#D5C5AE]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89255] mt-1 shrink-0" />
                <span>
                  <strong>Preserve EXIF Geolocation:</strong> Ensure location metadata remains enabled on camera shots for accurate GIS mapping.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89255] mt-1 shrink-0" />
                <span>
                  <strong>Do Not Touch Monuments:</strong> Never use chalk, water, or physical rubbings on ancient Brahmi inscriptions as this accelerates limestone decay.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89255] mt-1 shrink-0" />
                <span>
                  <strong>Peer Citations:</strong> Cite published ASI Epigraphia Indica volumes or Telangana Department monographs when proposing corrections.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
