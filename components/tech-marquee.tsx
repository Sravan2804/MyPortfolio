import React from 'react'

const technologies = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "OpenCV",
  "FastAPI",
  "Next.js",
  "TypeScript",
  "React",
  "CUDA",
  "Docker",
  "AWS",
  "LangChain",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS"
]

export default function TechMarquee() {
  return (
    <div className="relative flex overflow-hidden w-full py-5 border-y border-border/40 bg-card/30">
      {/* Edge fade gradients */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-10 px-6 hover:[animation-play-state:paused]">
        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-10 text-sm font-semibold tracking-wider uppercase text-muted-foreground transition-colors duration-200 hover:text-primary cursor-default"
          >
            <span>{tech}</span>
            <span className="text-primary/40 select-none">/</span>
          </div>
        ))}
      </div>
    </div>
  )
}
