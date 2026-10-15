import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Settings, Sparkles, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../utils/helpers'

export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const close = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <header className="relative z-30 h-16 shrink-0 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-end px-4 lg:px-8">
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((value) => !value)}
            className="flex min-w-0 items-center gap-3 rounded-xl p-1.5 pr-3 transition-colors hover:bg-slate-100"
            aria-expanded={profileOpen}
            aria-label="Profile menu"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-semibold text-white">
              {getInitials(user?.name)}
            </div>
            <div className="hidden min-w-0 text-left md:block">
              <p className="max-w-[180px] truncate text-sm font-medium text-slate-950">{user?.name || 'Job Seeker'}</p>
              <p className="max-w-[180px] truncate text-xs text-slate-500">{user?.targetRole || 'Manage account'}</p>
            </div>
            <ChevronDown size={16} className="shrink-0 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
              <Link to="/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-50">
                <User size={18} />
                <span className="font-medium">Profile</span>
              </Link>
              <Link to="/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-50">
                <Settings size={18} />
                <span className="font-medium">Settings</span>
              </Link>
              <div className="my-2 border-t border-slate-100" />
              <button
                onClick={async () => {
                  await logout()
                  navigate('/login')
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                <span className="font-medium">Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
