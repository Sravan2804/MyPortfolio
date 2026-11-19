'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import GradientBlinds from '@/components/ui/GradientBlinds'

export default function GlitchBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isLight = resolvedTheme === 'light'

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {isLight ? (
        <GradientBlinds
          key="light"
          gradientColors={['#fff5f7', '#ffd1dc', '#fed7aa']}
          angle={20}
          blindCount={16}
          blindMinWidth={60}
          spotlightRadius={0.55}
          shine={0.5}
          relief={0.4}
          glow={0.35}
          sway={0.35}
          hoverTilt={0.6}
          clickEffect="ripple"
          noise={0.15}
          mirrorGradient
          lightMode
          lightColor="#ffffff"
          className="w-full h-full"
        />
      ) : (
        <GradientBlinds
          key="dark"
          gradientColors={["#08090f", "#1e2130"]}
          angle={-14}
          blindCount={14}
          blindMinWidth={60}
          spotlightRadius={0.65}
          shine={0.6}
          relief={0.85}
          glow={0.35}
          sway={0.35}
          hoverTilt={0.6}
          clickEffect="ripple"
          noise={0.35}
          spotlightSoftness={1.3}
          lightColor="#ffe4c4"
          className="w-full h-full"
        />
      )}

      {/* Neo-Noir Cinematic Anamorphic Lens Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,10,0.75)_100%)] dark:block hidden"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(240,240,245,0.4)_100%)] dark:hidden block"
        aria-hidden="true"
      />
    </div>
  )
}
