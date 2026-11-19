'use client'

import React from 'react'
import { InfiniteSlider } from '@/components/core/infinite-slider'

const skills = [
  { name: 'Python', category: 'Core' },
  { name: 'PyTorch', category: 'Deep Learning' },
  { name: 'TensorFlow', category: 'ML & AI' },
  { name: 'OpenCV', category: 'Computer Vision' },
  { name: 'CUDA', category: 'GPU Compute' },
  { name: 'FastAPI', category: 'API Engineering' },
  { name: 'Next.js', category: 'Full Stack' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'React', category: 'Frontend' },
  { name: 'Docker', category: 'Containers' },
  { name: 'AWS', category: 'Cloud Infrastructure' },
  { name: 'LangChain', category: 'Agentic Workflows' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Tailwind CSS', category: 'Styling' }
]

export default function TechMarquee() {
  return (
    <div className="relative w-full py-6 border-y border-border/50 bg-card/60 backdrop-blur-sm shadow-inner">
      {/* Edge fade gradients for seamless entry/exit */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background via-background/60 to-transparent" />

      <InfiniteSlider speedOnHover={20} gap={24} duration={32}>
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/90 px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-primary/60 hover:shadow-[0_0_20px_-3px] hover:shadow-primary/20 cursor-default select-none"
          >
            <span className="text-sm font-semibold tracking-wide text-foreground">
              {skill.name}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary/80 border-l border-border/60 pl-2.5">
              {skill.category}
            </span>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  )
}
