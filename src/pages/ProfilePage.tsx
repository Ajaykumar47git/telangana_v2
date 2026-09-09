import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Shield,
  Star,
  FileText,
  Settings,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Lock,
  LogOut,
  Database,
  Calendar,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useHeritage } from '../context/HeritageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { DbContribution, UserRole } from '../types/database';
import {
  getContributions,
  updateContributionStatus,
  uploadStorageFile,
  getHeritageSites,
  getArtifacts
} from '../lib/supabase';
import { SEED_USERS } from '../data/seedData';

export const ProfilePage: React.FC = () => {
  const {
    currentUser,
    userRole,
    navigate,
    logout,
    setIsLoginOpen,
    switchRole,
    favorites,
    isSupabaseActive,
    showNotification
  } = useHeritage();

  const [activeTab, setActiveTab] = useState<'overview' | 'contributions' | 'favorites' | 'curation' | 'settings'>('overview');
  const [contributions, setContributions] = useState<DbContribution[]>([]);
  const [allContributions, setAllContributions] = useState<DbContribution[]>([]);
  const [isLoadingContribs, setIsLoadingContribs] = useState(false);

  // File upload state for testing Supabase Storage
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  // Curation review state
  const [reviewNotes, setReviewNotes] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    loadUserContributions();
  }, [currentUser]);

  const loadUserContributions = async () => {
    setIsLoadingContribs(true);
    try {
      if (currentUser) {
        const userList = await getContributions(currentUser.id);
        setContributions(userList);
      }
      // If curator or admin, also load all contributions for review
      if (userRole === 'curator' || userRole === 'admin') {
        const allList = await getContributions();
        setAllContributions(allList);
      }
    } finally {
      setIsLoadingContribs(false);
    }
  };

  const handleCurationDecision = async (id: string, status: 'approved' | 'rejected') => {
    const note = reviewNotes[id] || (status === 'approved' ? 'Verified against archaeological record.' : 'Requires primary source reference.');
    const updated = await updateContributionStatus(id, status, note, currentUser?.id);
    if (updated) {
      showNotification(`Contribution #${id.slice(0, 8)} ${status.toUpperCase()}`);
      loadUserContributions();
    }
  };

  const handleTestUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    try {
      const path = `user-uploads/${Date.now()}_${uploadFile.name.replace(/\s+/g, '_')}`;
      const res = await uploadStorageFile('contributions', uploadFile, path);
      if (res.url) {
        setUploadedUrl(res.url);
        showNotification('File successfully uploaded to Supabase Storage bucket!');
      } else {
        showNotification('Storage upload error: ' + (res.error || 'Check bucket policy'));
      }
    } catch (err: any) {
      showNotification('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#1A1D24] border border-[#2E333D] flex items-center justify-center mx-auto text-[#B89255]">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#FAF8F3]">Sign In to View User Profile</h2>
        <p className="text-[#9E9689] max-w-md mx-auto text-sm">
          Please authenticate to access your personal archaeological favorites, field submissions, and role permissions.
        </p>
        <div className="pt-2">
          <Button
            onClick={() => setIsLoginOpen(true)}
            className="bg-[#B89255] hover:bg-[#C4A052] text-[#121418] font-semibold px-6"
          >
            Open Sign In Portal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* HEADER CARD */}
      <div className="bg-[#1A1D24] border border-[#2E333D] p-6 sm:p-8 rounded-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B89255]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#22262E] border-2 border-[#B89255] overflow-hidden flex items-center justify-center text-2xl font-serif font-bold text-[#FAF8F3] shrink-0">
              {currentUser.avatar_url ? (
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F3]">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#B89255]/20 text-[#B89255] border border-[#B89255]/40">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-sm text-[#9E9689] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#787163]" />
                {currentUser.email}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#787163] pt-1">
                <span>Member since {new Date(currentUser.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Database className="w-3 h-3 text-[#B89255]" />
                  {isSupabaseActive ? 'Supabase Cloud' : 'Supabase Sandbox'}
                </span>
              </div>
            </div>
          </div>

          {/* QUICK DEMO ROLE SWITCHER IN PROFILE */}
          <div className="w-full sm:w-auto bg-[#121418] border border-[#2E333D] p-3 rounded-lg text-xs space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-[#9E9689] flex items-center justify-between">
              <span className="font-semibold text-[#D5C5AE]">Switch Demo Role</span>
              <span className="text-[10px] text-[#B89255]">Stage 2 RBAC</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(['admin', 'curator', 'researcher', 'contributor', 'visitor'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                    userRole === r
                      ? 'bg-[#B89255] text-[#121418] font-semibold'
                      : 'bg-[#1A1D24] text-[#9E9689] hover:text-[#FAF8F3] hover:bg-[#22262E] border border-[#2E333D]'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-[#2E333D] gap-2 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'border-[#B89255] text-[#FAF8F3]'
              : 'border-transparent text-[#9E9689] hover:text-[#D5C5AE]'
          }`}
        >
          Overview & Roles
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 px-4 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'favorites'
              ? 'border-[#B89255] text-[#FAF8F3]'
              : 'border-transparent text-[#9E9689] hover:text-[#D5C5AE]'
          }`}
        >
          Saved Heritage ({favorites.sites.length + favorites.artifacts.length + (favorites.inscriptions?.length || 0)})
        </button>
        <button
          onClick={() => setActiveTab('contributions')}
          className={`pb-3 px-4 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'contributions'
              ? 'border-[#B89255] text-[#FAF8F3]'
              : 'border-transparent text-[#9E9689] hover:text-[#D5C5AE]'
          }`}
        >
          My Submissions ({contributions.length})
        </button>
        {(userRole === 'curator' || userRole === 'admin') && (
          <button
            onClick={() => setActiveTab('curation')}
            className={`pb-3 px-4 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'curation'
                ? 'border-[#B89255] text-[#FAF8F3]'
                : 'border-transparent text-[#9E9689] hover:text-[#D5C5AE]'
            }`}
          >
            Curation Queue ({allContributions.filter((c) => c.status === 'pending').length} Pending)
          </button>
        )}
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'settings'
              ? 'border-[#B89255] text-[#FAF8F3]'
              : 'border-transparent text-[#9E9689] hover:text-[#D5C5AE]'
          }`}
        >
          Storage & Settings
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* RBAC Card */}
          <div className="md:col-span-2 bg-[#1A1D24] border border-[#2E333D] p-6 rounded-lg space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#FAF8F3] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#B89255]" />
              Role-Based Access Control (RBAC) Permissions
            </h3>
            <p className="text-sm text-[#9E9689]">
              Your account is configured with <strong className="text-[#FAF8F3] capitalize">{userRole}</strong> privileges under SanghaTelangana's database schema.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Public Heritage Browsing', allowed: true, desc: 'Sites, artifacts, 3D photogrammetry, virtual tours' },
                { title: 'Personal Bookmarks & Trips', allowed: true, desc: 'Saved in Supabase public.favorites table' },
                {
                  title: 'Citizen Archaeology Submissions',
                  allowed: ['contributor', 'researcher', 'curator', 'admin'].includes(userRole),
                  desc: 'Submit field photos, findspots, and epigraphical reports'
                },
                {
                  title: 'Research Archive Access',
                  allowed: ['researcher', 'curator', 'admin'].includes(userRole),
                  desc: 'High-res epigraphy transliterations, scholarly citations, and version history'
                },
                {
                  title: 'Curatorial Verification',
                  allowed: ['curator', 'admin'].includes(userRole),
                  desc: 'Review, approve, or reject field contributions in the verification queue'
                },
                {
                  title: 'System & Schema Administration',
                  allowed: userRole === 'admin',
                  desc: 'Manage users, archive rollback, database configuration, and storage buckets'
                }
              ].map((perm, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 border rounded-lg transition-colors ${
                    perm.allowed
                      ? 'border-emerald-900/40 bg-emerald-950/20 text-[#FAF8F3]'
                      : 'border-[#2E333D] bg-[#121418] opacity-60 text-[#9E9689]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {perm.allowed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#787163] shrink-0" />
                    )}
                    <span className="font-medium text-xs sm:text-sm">{perm.title}</span>
                  </div>
                  <p className="text-[11px] text-[#9E9689] pl-6">{perm.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="space-y-6">
            <div className="bg-[#1A1D24] border border-[#2E333D] p-6 rounded-lg space-y-4">
              <h3 className="font-serif text-base font-bold text-[#FAF8F3]">Activity Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#121418] rounded border border-[#2E333D]">
                  <span className="text-xs text-[#9E9689]">Sites Saved</span>
                  <span className="font-bold text-[#FAF8F3]">{favorites.sites.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#121418] rounded border border-[#2E333D]">
                  <span className="text-xs text-[#9E9689]">Artifacts Saved</span>
                  <span className="font-bold text-[#FAF8F3]">{favorites.artifacts.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#121418] rounded border border-[#2E333D]">
                  <span className="text-xs text-[#9E9689]">Inscriptions Saved</span>
                  <span className="font-bold text-[#FAF8F3]">{favorites.inscriptions?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#121418] rounded border border-[#2E333D]">
                  <span className="text-xs text-[#9E9689]">Submissions Made</span>
                  <span className="font-bold text-[#B89255]">{contributions.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1D24] border border-[#2E333D] p-6 rounded-lg space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D5C5AE]">Quick Actions</h4>
              <div className="space-y-2">
                <Button
                  onClick={() => navigate('/contribute')}
                  className="w-full bg-[#22262E] hover:bg-[#2A2F3A] text-[#FAF8F3] border border-[#2E333D] text-xs justify-start"
                >
                  <Upload className="w-3.5 h-3.5 mr-2 text-[#B89255]" />
                  Submit New Archaeological Observation
                </Button>
                <Button
                  onClick={() => navigate('/archive')}
                  className="w-full bg-[#22262E] hover:bg-[#2A2F3A] text-[#FAF8F3] border border-[#2E333D] text-xs justify-start"
                >
                  <Layers className="w-3.5 h-3.5 mr-2 text-[#B89255]" />
                  Browse Epigraphical & Artifact Archive
                </Button>
                <Button
                  onClick={() => logout()}
                  className="w-full bg-red-950/30 hover:bg-red-950/60 text-red-300 border border-red-900/50 text-xs justify-start"
                >
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  Sign Out of Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#FAF8F3]">
              Saved Inscriptions, Sites & Artifacts
            </h3>
            <Button
              onClick={() => navigate('/favorites')}
              className="bg-[#22262E] hover:bg-[#2A2F3A] text-[#B89255] border border-[#2E333D] text-xs"
            >
              Open Full Explorer
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.sites.map((siteId) => (
              <div
                key={siteId}
                className="bg-[#1A1D24] border border-[#2E333D] p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#B89255] font-semibold">Heritage Site</div>
                  <div className="font-medium text-[#FAF8F3] capitalize">{siteId.replace(/-/g, ' ')}</div>
                </div>
                <Button
                  onClick={() => navigate(`/sites/${siteId}`)}
                  className="bg-[#22262E] hover:bg-[#2A2F3A] text-[#FAF8F3] text-xs h-8 px-3"
                >
                  View Site
                </Button>
              </div>
            ))}

            {favorites.artifacts.map((artId) => (
              <div
                key={artId}
                className="bg-[#1A1D24] border border-[#2E333D] p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#C4A052] font-semibold">Artifact</div>
                  <div className="font-medium text-[#FAF8F3] capitalize truncate max-w-[150px]">{artId.slice(0, 12)}</div>
                </div>
                <Button
                  onClick={() => navigate(`/archive?q=${artId}`)}
                  className="bg-[#22262E] hover:bg-[#2A2F3A] text-[#FAF8F3] text-xs h-8 px-3"
                >
                  Inspect
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: MY CONTRIBUTIONS */}
      {activeTab === 'contributions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#FAF8F3]">My Field Contributions</h3>
              <p className="text-xs text-[#9E9689]">
                Synchronized with Supabase <code className="text-[#B89255]">public.contributions</code>
              </p>
            </div>
            <Button
              onClick={() => navigate('/contribute')}
              className="bg-[#B89255] hover:bg-[#C4A052] text-[#121418] text-xs font-semibold"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              New Submission
            </Button>
          </div>

          {contributions.length === 0 ? (
            <div className="bg-[#1A1D24] border border-[#2E333D] p-12 text-center rounded-lg space-y-3">
              <FileText className="w-10 h-10 text-[#787163] mx-auto" />
              <div className="font-serif text-base text-[#FAF8F3]">No contributions submitted yet</div>
              <p className="text-xs text-[#9E9689] max-w-md mx-auto">
                As a registered heritage enthusiast or scholar, you can submit photographs, GPS coordinates, and historical notes from Telangana Buddhist sites.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {contributions.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#1A1D24] border border-[#2E333D] p-5 rounded-lg space-y-2 hover:border-[#3E4552] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#FAF8F3]">{c.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#22262E] text-[#B89255] uppercase">
                          {c.contribution_type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-[#9E9689] mt-1">{c.description}</p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                          c.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : c.status === 'rejected'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {c.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                        {c.status === 'pending' && <Clock className="w-3 h-3" />}
                        {c.status === 'rejected' && <XCircle className="w-3 h-3" />}
                        <span className="capitalize">{c.status}</span>
                      </span>
                      <div className="text-[10px] text-[#787163] mt-1">
                        {new Date(c.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {c.reviewer_notes && (
                    <div className="bg-[#121418] border-l-2 border-[#B89255] p-2.5 text-xs text-[#D5C5AE] rounded-r mt-2">
                      <strong className="text-[#B89255]">Curator Note: </strong>
                      {c.reviewer_notes}
                    </div>
                  )}

                  {c.image_url && (
                    <div className="pt-1">
                      <a
                        href={c.image_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#B89255] hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Uploaded Media Attachment
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: CURATION QUEUE (Curators and Admins only) */}
      {activeTab === 'curation' && (userRole === 'curator' || userRole === 'admin') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#FAF8F3]">Curatorial Review Queue</h3>
              <p className="text-xs text-[#9E9689]">
                Review citizen archaeology submissions before approving into the public database.
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-[#B89255]/20 text-[#B89255] border border-[#B89255]/40 rounded">
              Role: {userRole.toUpperCase()}
            </span>
          </div>

          <div className="space-y-4">
            {allContributions.map((c) => (
              <div
                key={c.id}
                className="bg-[#1A1D24] border border-[#2E333D] p-5 rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#FAF8F3]">{c.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#22262E] text-[#B89255] uppercase">
                        {c.contribution_type}
                      </span>
                    </div>
                    <p className="text-xs text-[#D5C5AE] mt-1">{c.description}</p>
                    <div className="text-[11px] text-[#787163] mt-2">
                      Submitted by User ID: <code className="text-[#9E9689]">{c.user_id}</code> | Date: {new Date(c.created_at).toLocaleString()}
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                      c.status === 'approved'
                        ? 'bg-emerald-950 text-emerald-300'
                        : c.status === 'rejected'
                        ? 'bg-red-950 text-red-300'
                        : 'bg-amber-950 text-amber-300'
                    }`}
                  >
                    {c.status.toUpperCase()}
                  </span>
                </div>

                {c.image_url && (
                  <div className="p-2 bg-[#121418] rounded border border-[#2E333D] flex items-center gap-3">
                    <img
                      src={c.image_url}
                      alt="submission"
                      className="w-16 h-12 object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs text-[#9E9689]">
                      <div className="font-medium text-[#FAF8F3]">Evidence Photo Attached</div>
                      <a href={c.image_url} target="_blank" rel="noreferrer" className="text-[#B89255] hover:underline">
                        Open high resolution source
                      </a>
                    </div>
                  </div>
                )}

                {/* Review Controls */}
                <div className="pt-2 border-t border-[#2E333D] space-y-2">
                  <Input
                    placeholder="Enter curatorial notes / archaeological verification remarks..."
                    value={reviewNotes[c.id] || ''}
                    onChange={(e) => setReviewNotes({ ...reviewNotes, [c.id]: e.target.value })}
                    className="text-xs"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => handleCurationDecision(c.id, 'rejected')}
                      className="bg-red-950/40 hover:bg-red-950/80 text-red-300 border border-red-800 text-xs h-8 px-3"
                    >
                      Reject Submission
                    </Button>
                    <Button
                      onClick={() => handleCurationDecision(c.id, 'approved')}
                      className="bg-emerald-950/40 hover:bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs h-8 px-3"
                    >
                      Approve & Catalog
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: STORAGE & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Storage Bucket Tester */}
          <div className="bg-[#1A1D24] border border-[#2E333D] p-6 rounded-lg space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#FAF8F3] flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#B89255]" />
              Supabase Storage Bucket Uploader
            </h3>
            <p className="text-xs text-[#9E9689]">
              Test direct asset uploads to configured Supabase storage buckets (<code className="text-[#B89255]">contributions</code>, <code className="text-[#B89255]">site_photos</code>, <code className="text-[#B89255]">avatars</code>).
            </p>

            <form onSubmit={handleTestUpload} className="space-y-3">
              <div className="border-2 border-dashed border-[#2E333D] hover:border-[#B89255] p-6 rounded-lg text-center transition-colors">
                <input
                  type="file"
                  id="storage-file-input"
                  className="hidden"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="storage-file-input" className="cursor-pointer block space-y-2">
                  <Upload className="w-8 h-8 text-[#787163] mx-auto" />
                  <div className="text-xs text-[#D5C5AE]">
                    {uploadFile ? uploadFile.name : 'Click to choose an image, PDF or model'}
                  </div>
                  <div className="text-[10px] text-[#787163]">
                    PNG, JPG, WEBP, GLB or PDF up to 25MB
                  </div>
                </label>
              </div>

              <Button
                type="submit"
                disabled={!uploadFile || uploading}
                className="w-full bg-[#B89255] hover:bg-[#C4A052] text-[#121418] font-semibold text-xs"
              >
                {uploading ? 'Uploading to Bucket...' : 'Upload Asset to Supabase Storage'}
              </Button>
            </form>

            {uploadedUrl && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-800 rounded text-xs space-y-1">
                <div className="font-semibold text-emerald-300">File Upload Complete:</div>
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B89255] hover:underline break-all block"
                >
                  {uploadedUrl}
                </a>
              </div>
            )}
          </div>

          {/* Database & Environment Info */}
          <div className="bg-[#1A1D24] border border-[#2E333D] p-6 rounded-lg space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#FAF8F3] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#B89255]" />
              Database Connection & Schemas
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#121418] rounded border border-[#2E333D] space-y-1">
                <div className="text-[#9E9689] flex items-center justify-between">
                  <span>Supabase Environment Status:</span>
                  <span className={isSupabaseActive ? 'text-emerald-400 font-semibold' : 'text-[#B89255] font-semibold'}>
                    {isSupabaseActive ? 'Configured (Live)' : 'Local Sandbox Active'}
                  </span>
                </div>
                <div className="text-[11px] text-[#787163]">
                  {isSupabaseActive
                    ? 'Connected with valid VITE_SUPABASE_URL.'
                    : 'Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY to .env to connect your remote Supabase instance.'}
                </div>
              </div>

              <div className="p-3 bg-[#121418] rounded border border-[#2E333D] space-y-1">
                <div className="text-[#9E9689] font-medium">Configured PostgreSQL Tables:</div>
                <div className="flex flex-wrap gap-1 pt-1 text-[11px] text-[#D5C5AE]">
                  {[
                    'users',
                    'heritage_sites',
                    'artifacts',
                    'inscriptions',
                    'virtual_tours',
                    'tour_stops',
                    'events',
                    'contributions',
                    'favorites',
                    'archive_versions'
                  ].map((table) => (
                    <span key={table} className="px-1.5 py-0.5 bg-[#1A1D24] border border-[#2E333D] rounded font-mono">
                      {table}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#121418] rounded border border-[#2E333D] space-y-1">
                <div className="text-[#9E9689] font-medium">Configured Supabase Storage Buckets:</div>
                <div className="flex flex-wrap gap-1 pt-1 text-[11px] text-[#D5C5AE]">
                  {[
                    'site_photos',
                    'artifact_images',
                    'panoramas',
                    'models_3d',
                    'manuscripts',
                    'audio_guides',
                    'contributions',
                    'avatars'
                  ].map((bucket) => (
                    <span key={bucket} className="px-1.5 py-0.5 bg-[#1A1D24] border border-[#2E333D] rounded font-mono">
                      {bucket}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
