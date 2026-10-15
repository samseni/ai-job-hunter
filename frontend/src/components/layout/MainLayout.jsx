import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout() {
  return (
    <div className="min-h-dvh h-dvh overflow-hidden bg-slate-100">
      <Sidebar />
      <div className="flex h-full min-h-0 lg:pl-72">
        <main className="flex h-full min-h-0 w-full min-w-0 flex-col">
          <Header />
          <div className="min-h-0 w-full flex-1 overflow-y-auto px-4 pb-5 pt-20 lg:px-8 lg:pb-6 lg:pt-4">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
