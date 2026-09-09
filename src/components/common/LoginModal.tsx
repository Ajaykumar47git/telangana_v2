import React, { useState } from 'react';
import { Shield, BookOpen, KeyRound, Check, AlertCircle, ArrowRight, UserPlus, LogIn, Lock, Database } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useHeritage } from '../../context/HeritageContext';
import { UserRole } from '../../types/database';
import { SEED_USERS } from '../../data/seedData';

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const {
    isLoginOpen: ctxIsOpen,
    setIsLoginOpen: ctxSetIsOpen,
    currentUser,
    login,
    register,
    resetPassword,
    switchRole,
    isSupabaseActive
  } = useHeritage();

  const isModalOpen = propIsOpen !== undefined ? propIsOpen : ctxIsOpen;
  const handleClose = propOnClose || (() => ctxSetIsOpen(false));

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('contributor');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          handleClose();
        } else {
          setErrorMsg(res.error || 'Invalid credentials');
        }
      } else if (mode === 'register') {
        const res = await register(email, password, name, role);
        if (res.success) {
          handleClose();
        } else {
          setErrorMsg(res.error || 'Registration failed');
        }
      } else if (mode === 'forgot') {
        const res = await resetPassword(email);
        if (res.success) {
          setSuccessMsg(res.message);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    switchRole(demoRole);
    handleClose();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        handleClose();
        setErrorMsg(null);
        setSuccessMsg(null);
      }}
      title={
        mode === 'login'
          ? 'Scholar & Member Sign In'
          : mode === 'register'
          ? 'Join the Heritage Community'
          : 'Reset Access Credentials'
      }
      subtitle="Telangana Buddhist Heritage Archival Repository & Epigraphy Network"
      maxWidth="md"
    >
      {/* Backend Status indicator */}
      <div className="mb-4 flex items-center justify-between px-3 py-2 bg-[#1A1D24] border border-[#2E333D] rounded text-xs text-[#9E9689]">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-[#B89255]" />
          <span>Backend:</span>
          {isSupabaseActive ? (
            <span className="text-emerald-400 font-medium">Supabase Cloud Connected</span>
          ) : (
            <span className="text-[#C4A052]">Local Supabase Sandbox Active</span>
          )}
        </div>
        {currentUser && (
          <span className="text-[11px] px-2 py-0.5 rounded bg-[#B89255]/20 text-[#B89255] uppercase tracking-wider font-semibold">
            {currentUser.role}
          </span>
        )}
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-950/40 border border-red-800/60 rounded text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#D5C5AE] uppercase tracking-wider">
                Full Name / Scholar Designation
              </label>
              <Input
                type="text"
                required
                placeholder="Dr. Rajesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#D5C5AE] uppercase tracking-wider">
                Account Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { role: 'visitor', label: 'Visitor', desc: 'Browse & Bookmark' },
                  { role: 'contributor', label: 'Contributor', desc: 'Submit Archaeology' },
                  { role: 'researcher', label: 'Researcher', desc: 'Access Scholarly Data' },
                  { role: 'curator', label: 'Curator', desc: 'Review & Verify' }
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setRole(item.role as UserRole)}
                    className={`p-2 text-left border rounded text-xs transition-colors cursor-pointer ${
                      role === item.role
                        ? 'border-[#B89255] bg-[#B89255]/10 text-[#FAF8F3]'
                        : 'border-[#2E333D] text-[#9E9689] hover:bg-[#22262E]'
                    }`}
                  >
                    <div className="font-medium text-[#FAF8F3]">{item.label}</div>
                    <div className="text-[10px] text-[#9E9689]">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-[#D5C5AE] uppercase tracking-wider">
            Email Address
          </label>
          <Input
            type="email"
            required
            placeholder="scholar@sanghatelangana.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {mode !== 'forgot' && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[#D5C5AE] uppercase tracking-wider">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-xs text-[#B89255] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#B89255] hover:bg-[#C4A052] text-[#121418] font-semibold flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="animate-spin text-sm">⌛</span>
          ) : mode === 'login' ? (
            <>
              <LogIn className="w-4 h-4" />
              Sign In to Archive
            </>
          ) : mode === 'register' ? (
            <>
              <UserPlus className="w-4 h-4" />
              Create Archival Account
            </>
          ) : (
            <>
              <ArrowRight className="w-4 h-4" />
              Send Recovery Link
            </>
          )}
        </Button>

        <div className="flex items-center justify-center text-xs text-[#9E9689] gap-2 pt-2">
          {mode === 'login' ? (
            <>
              <span>Don't have an archival account?</span>
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-[#B89255] hover:underline font-medium"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span>Already registered?</span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#B89255] hover:underline font-medium"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </form>

      {/* QUICK DEMO ROLES SWITCHER (Stage 2 Mandatory requirement) */}
      <div className="mt-6 pt-5 border-t border-[#2E333D]">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9E9689] mb-2.5 flex items-center justify-between">
          <span>Demo Accounts (Instant Role Testing)</span>
          <span className="text-[10px] text-[#B89255] lowercase">click to authenticate</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            { role: 'admin', label: 'Admin', name: 'Dr. V. Rao', badge: 'Full Access' },
            { role: 'curator', label: 'Curator', name: 'M. Sastry', badge: 'Reviewer' },
            { role: 'researcher', label: 'Researcher', name: 'Dr. E. Schalk', badge: 'Epigraphy' },
            { role: 'contributor', label: 'Contributor', name: 'A. Sharma', badge: 'Submitter' },
            { role: 'visitor', label: 'Visitor', name: 'K. Reddy', badge: 'Public' }
          ].map((item) => (
            <button
              key={item.role}
              type="button"
              onClick={() => handleQuickDemo(item.role as UserRole)}
              className="p-2 text-left bg-[#1A1D24] hover:bg-[#22262E] border border-[#2E333D] hover:border-[#B89255] rounded transition-all text-xs cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-[#FAF8F3] group-hover:text-[#B89255] capitalize">
                  {item.label}
                </span>
                <span className="text-[9px] px-1 py-0.2 bg-[#2E333D] rounded text-[#B89255]">
                  {item.badge}
                </span>
              </div>
              <div className="text-[10px] text-[#9E9689] truncate">{item.name}</div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-[#787163] text-center">
          * Demo accounts allow testing RBAC permissions across Visitor, Contributor, Researcher, Curator, and Admin without requiring external email verification.
        </p>
      </div>
    </Modal>
  );
};
