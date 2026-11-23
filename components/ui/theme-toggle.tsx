'use client'

import React from 'react'
import CinematicThemeSwitcher from '@/components/ui/cinematic-theme-switcher'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-[58px] sm:w-[60px] h-[36px] ${className}`.trim()}>
      <CinematicThemeSwitcher className="origin-center scale-[0.52] sm:scale-[0.55]" />
    </div>
  )
}
