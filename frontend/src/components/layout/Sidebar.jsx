import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Sparkles, 
  Mail, 
  KanbanSquare, 
  BarChart3, 
  Mic, 
  Settings,
  Bot,
  ClipboardList,
  Menu,
  X,
  User,
  LogOut,
  Bell,
  ChevronDown
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../utils/helpers'

const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/jobs', label: 'Job Discovery', icon: Search },
  { to: '/resume', label: 'Resume', icon: FileText },
  { to: '/match', label: 'AI Matching', icon: Sparkles },
  { to: '/auto-apply', label: 'Auto-Apply', icon: Bot },
  { to: '/cover-letter', label: 'Cover Letter', icon: Mail },
  { to: '/tracker', label: 'Application Tracker', icon: KanbanSquare },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/interview', label: 'Interview Prep', icon: Mic },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-xl shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:transform-none ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800">
            <NavLink to="/dashboard" className="flex items-center gap-3" aria-label="AI Career Companion">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                <Sparkles size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">AI Career Companion</span>
            </NavLink>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={20} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold">
                {getInitials(user?.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}