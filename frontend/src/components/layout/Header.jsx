import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Search, 
  Bell, 
  ChevronDown, 
  LogOut, 
  User, 
  Settings, 
  Sparkles,
  X,
  Moon,
  Sun
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../utils/helpers'

const mockNotifications = [
  { id: 1, title: 'New job match found', description: 'Senior Frontend Developer at TechCorp - 87% match', time: '2 hours ago', read: false, type: 'match' },
  { id: 2, title: 'Application submitted', description: 'Your application to StartupXYZ has been submitted', time: '5 hours ago', read: false, type: 'success' },
  { id: 3, title: 'Interview scheduled', description: 'Technical interview with TechCorp on Dec 15 at 2 PM', time: '1 day ago', read: true, type: 'interview' },
  { id: 4, title: 'Auto-apply paused', description: 'Daily application limit reached', time: '2 days ago', read: true, type: 'warning' },
]

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const notificationsRef = useRef(null)
  const profileRef = useRef(null)
  const searchRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = mockNotifications.filter(n => !n.read).length

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-full mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-14 lg:ml-72">
          <div className="flex-1 lg:flex-none max-w-md mx-4 lg:mx-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
              >
                <Bell size={22} aria-hidden="true" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <button
                        key={notification.id}
                        className={`w-full p-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 last:border-0 ${!notification.read ? 'bg-slate-50' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${notification.type === 'match' ? 'bg-indigo-100 text-indigo-600' : notification.type === 'success' ? 'bg-emerald-100 text-emerald-600' : notification.type === 'interview' ? 'bg-violet-100 text-violet-600' : 'bg-amber-100 text-amber-600'}`}>
                            <Sparkles size={18} aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900">{notification.title}</p>
                            <p className="text-sm text-slate-500 mt-0.5">{notification.description}</p>
                            <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-200">
                    <Link to="/settings" className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Profile menu"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold">
                  {getInitials(user?.name)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-900 truncate max-w-[150px]">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate max-w-[150px]">{user?.targetRole || 'Job Seeker'}</p>
                </div>
                <ChevronDown size={16} className="text-slate-400 hidden md:block" aria-hidden="true" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden py-2">
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors">
                    <User size={18} aria-hidden="true" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors">
                    <Settings size={18} aria-hidden="true" />
                    <span className="font-medium">Settings</span>
                  </Link>
                  <div className="border-t border-slate-200 my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} aria-hidden="true" />
                    <span className="font-medium">Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}