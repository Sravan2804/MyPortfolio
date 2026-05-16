'use client'

import React, { useEffect } from 'react'
import { ThemeProvider, useTheme } from "next-themes"

// Suppress the React 19 hydration warning for next-themes script injection
if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return
    }
    originalError.apply(console, args)
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}