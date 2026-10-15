import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, ChevronDown, LogOut, User, Settings, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../utils/helpers'

const notifications = [
  { id: 1, title: 'New matching jobs', description: '7 jobs meet your 80% auto-apply threshold', time: '10m ago', read: false },
  { id: 2, title: 'Application submitted', description: 'Senior Frontend Developer at TechCorp landed in submission queue', time: '1h ago', read: false },
  { id: 3, title: 'Interview reminder', description: 'System design interview tomorrow at 2 PM', time: '4h ago', read: true },
  { id: 4, title: 'Auto-apply paused', description: 'Week/detail cap reached, review before re-enabling', time: '1d ago', read: true },
]

export default function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notificationRef = useRef(null)
  const profileRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const unread = notifications.filter((item) => !item.read).length

  useEffect(() => {
    const close = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setNotificationsOpen(false)
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="relative hidden max-w-lg flex-1 lg:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-10 py-2" placeholder="Search jobs, companies, skills..." aria-label="Search" />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationsOpen((value) => !value)}
              className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-expanded={notificationsOpen}
              aria-label={`Notifications, ${unread} unread`}
            >
              <Bell size={20} />
              {unread > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">{unread}</span>}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-[23rem] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    <p className="text-sm text-slate-500">{unread} unread updates</p>
                  </div>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Mark all read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((item) => (
                    <button key={item.id} className={`flex w-full items-start gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${item.read ? '' : 'bg-indigo-50/50'}`}>
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full ${item.read ? 'bg-slate-300' : 'bg-indigo-500'}`} />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-3">
                  <Link to="/settings" className="block rounded-xl py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50">View all activity</Link>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen((value) => !value)} className="flex items-center gap-3 rounded-2xl p-1.5 pr-3 transition-colors hover:bg-slate-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 font-semibold text-white">
                {getInitials(user?.name)}
              </div>
              <div className="hidden text-left sm:block">
                <p className="max-w-[150px] truncate text-sm font-medium text-slate-900">{user?.name || 'Job Seeker'}</p>
                <p className="max-w-[150px] truncate text-xs text-slate-500">{user?.targetRole || 'Manage account'}</p>
              </div>
              <ChevronDown size={16} className="hidden text-slate-400 sm:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
                <Link to="/settings" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-50"><User size={18} /><span className="font-medium">Profile</span></Link>
                <Link to="/settings" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-50"><Settings size={18} /><span className="font-medium">Settings</span></Link>
                <div className="my-2 border-t border-slate-100" />
                <button onClick={async () => { await logout(); navigate('/login') }} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-red-600 transition hover:bg-red-50"><LogOut size={18} /><span className="font-medium">Sign out</span></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
