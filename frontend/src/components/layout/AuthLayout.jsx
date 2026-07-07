import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, GitBranch, Database, ShieldCheck, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import { scaleIn } from '../../lib/animations'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-surface-alt dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Background Gradients for Mobile/Tablet */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none lg:hidden" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none lg:hidden" />

      {/* Left Column: Visual Panel (Visible on lg screens only) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 overflow-hidden flex-col justify-between p-12 text-white border-r border-slate-800">
        {/* Animated Background Gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-violet-600/20 blur-[100px] pointer-events-none"
        />

        {/* Tech Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Branding header */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-2xl tracking-tight">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-extrabold">RepoHub</span>
          </Link>
        </div>

        {/* Dynamic Mockup Panels */}
        <div className="relative z-10 flex flex-col gap-6 my-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <Database className="h-4.5 w-4.5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Dataset Ingestion Status</h3>
                <p className="text-xs text-slate-400">Real-time statistics</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                <span className="block text-xs text-slate-400">Total Entries</span>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">360K+</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                <span className="block text-xs text-slate-400">Supported Repos</span>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">1,240+</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                  <GitBranch className="h-4.5 w-4.5 text-violet-400" />
                </div>
                <h3 className="font-semibold text-sm">Language Distribution</h3>
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Star className="h-3 w-3 fill-emerald-400" /> Live
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Python</span>
                  <span className="font-semibold">48%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "48%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400" 
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>TypeScript / JavaScript</span>
                  <span className="font-semibold">32%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "32%" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-violet-500 to-violet-400" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Stateless JWT sessions verified by AES-256</span>
        </div>
      </div>

      {/* Right Column: Form Panel */}
      <div className="flex-1 flex flex-col justify-between relative z-10 min-h-screen">
        {/* Header containing theme toggle */}
        <header className="flex justify-end p-6">
          <div className="rounded-xl bg-surface/60 dark:bg-slate-800/60 backdrop-blur-md border border-border dark:border-slate-700/80 p-1 flex items-center justify-center shadow-sm">
            <ThemeToggle />
          </div>
        </header>

        {/* Central Auth Container */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            {/* Logo for mobile devices */}
            <div className="flex flex-col items-center mb-8 lg:hidden">
              <Link to="/" className="flex items-center gap-2.5 font-extrabold text-3xl tracking-tight mb-2">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-text-primary via-text-primary/90 to-text-secondary bg-clip-text text-transparent">
                  RepoHub
                </span>
              </Link>
              <p className="text-sm text-text-secondary text-center">GitHub Code Intelligence Workspace</p>
            </div>

            {/* Main Interactive Form Card */}
            <div className="rounded-2xl border border-border dark:border-slate-700/80 bg-surface-card dark:bg-slate-800/40 backdrop-blur-md shadow-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-indigo-500/5">
              <Outlet />
            </div>
          </motion.div>
        </main>

        {/* Footer legal notes */}
        <footer className="text-center py-6 text-xs text-text-muted">
          &copy; {new Date().getFullYear()} RepoHub Inc. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
