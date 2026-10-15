import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="lg:ml-72 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 lg:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}