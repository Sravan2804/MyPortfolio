import React from 'react'

const technologies = [
  "Python", "TypeScript", "React", "Next.js", "Tailwind CSS", "C", "Pytorch", "Tensorflow","HTML", "CSS",
  "AWS", "PyTorch", "TensorFlow", "OpenCV", "FastAPI", "Node.js", "Git", "Streamlit"
]

export default function TechMarquee() {
  return (
    <div className="relative flex overflow-hidden w-full bg-background/50 py-12 border-y border-border/50">
      {/* Left and right fade gradients */}
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee space-x-12 px-12 hover:[animation-play-state:paused]">
        {/* Duplicate the array 3 times for a perfectly seamless looping animation */}
        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center rounded-2xl border border-white/5 bg-white/5 px-8 py-4 text-xl font-bold tracking-wider text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/10 hover:text-primary hover:shadow-[0_0_30px_-5px] hover:shadow-primary/50 cursor-default"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  )
}
