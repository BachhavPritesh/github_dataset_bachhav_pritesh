import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import testimonials from '../../data/testimonials.json'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <AnimatedSection className="bg-surface-alt relative overflow-hidden">
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary mb-4">
            Loved by <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">developers</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            See what our developer community says about RepoHub.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-card rounded-2xl border border-border/80 p-8 md:p-10 shadow-xl backdrop-blur-md relative"
            >
              <div className="absolute top-6 right-8 text-primary/10 select-none pointer-events-none">
                <Quote className="h-20 w-20 transform rotate-180" />
              </div>
              <p className="text-text-primary dark:text-slate-200 text-lg md:text-xl font-medium leading-relaxed mb-8 relative z-10 italic">
                "{testimonials[current].content}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-base shadow-md shadow-indigo-500/20 border border-white/10">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="font-bold text-text-primary text-base">{testimonials[current].name}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {testimonials[current].role} &middot; <span className="text-primary font-medium">{testimonials[current].company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-card border border-transparent hover:border-border transition-all cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-text-muted/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-card border border-transparent hover:border-border transition-all cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
