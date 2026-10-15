import { Outlet } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles size={28} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">AI Career Companion</span>
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Your AI-Powered Career Agent
          </h1>
          <p className="text-xl text-indigo-100 leading-relaxed mb-8">
            Discover matching jobs, optimize your resume, prepare for interviews, and automate applications with our intelligent AI career companion.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-indigo-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <span>AI Resume Analysis & Optimization</span>
            </div>
            <div className="flex items-center gap-4 text-indigo-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <span>Smart Job Matching & Discovery</span>
            </div>
            <div className="flex items-center gap-4 text-indigo-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <span>Automated Job Applications</span>
            </div>
            <div className="flex items-center gap-4 text-indigo-100">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <span>Interview Preparation & Feedback</span>
            </div>
          </div>
        </div>
        <div className="text-indigo-200 text-sm">
          © 2024 AI Career Companion. All rights reserved.
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}