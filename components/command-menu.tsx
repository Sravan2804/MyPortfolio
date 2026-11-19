'use client'

import React, { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { FolderGit2, Home, Mail, Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import BorderGlow from '@/components/ui/BorderGlow'

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    const toggleMenu = () => setOpen(prev => !prev)

    window.addEventListener('toggle-command-menu', toggleMenu)
    document.addEventListener('keydown', down)
    return () => {
      window.removeEventListener('toggle-command-menu', toggleMenu)
      document.removeEventListener('keydown', down)
    }
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-background/80 backdrop-blur-sm px-4"
      onClick={() => setOpen(false)}
    >
      <div 
        onClick={e => e.stopPropagation()} 
        className="w-full max-w-xl"
      >
        <BorderGlow
          edgeSensitivity={30}
          glowColor="345 80 65"
          backgroundColor="var(--card)"
          borderRadius={20}
          glowRadius={36}
          glowIntensity={0.9}
          coneSpread={24}
          colors={['#ff2a85', '#e01e72', '#b5179e']}
          className="w-full shadow-2xl"
        >
          <Command className="flex h-full w-full flex-col overflow-hidden bg-card/95">
            <Command.Input 
              placeholder="Type a command or search..." 
              className="w-full border-b border-border/50 bg-transparent px-6 py-4 text-base outline-none placeholder:text-muted-foreground focus:ring-0 text-foreground" 
            />
            
            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-3">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:mb-1">
                <Command.Item 
                  onSelect={() => runCommand(() => router.push('/'))}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary aria-selected:bg-primary/15 aria-selected:text-primary transition-colors outline-none"
                >
                  <Home className="h-4 w-4" /> Home
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => router.push('/about'))}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary aria-selected:bg-primary/15 aria-selected:text-primary transition-colors outline-none"
                >
                  <User className="h-4 w-4" /> About
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => router.push('/projects'))}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary aria-selected:bg-primary/15 aria-selected:text-primary transition-colors outline-none"
                >
                  <FolderGit2 className="h-4 w-4" /> Projects
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => router.push('/contact'))}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary aria-selected:bg-primary/15 aria-selected:text-primary transition-colors outline-none"
                >
                  <Mail className="h-4 w-4" /> Contact
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Preferences" className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:mb-1">
                <Command.Item 
                  onSelect={() => runCommand(() => setTheme('light'))}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary aria-selected:bg-primary/15 aria-selected:text-primary transition-colors outline-none"
                >
                  <Sun className="h-4 w-4" /> Light Mode
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => setTheme('dark'))}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary aria-selected:bg-primary/15 aria-selected:text-primary transition-colors outline-none"
                >
                  <Moon className="h-4 w-4" /> Dark Mode
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="flex items-center justify-between border-t border-border/40 px-4 py-2.5 text-[11px] font-mono text-muted-foreground bg-muted/20">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border/70 text-[10px]">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border/70 text-[10px]">↵</kbd> select
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded bg-muted px-1.5 py-0.5 border border-border/70 text-[10px]">esc</kbd> close
              </span>
            </div>
          </Command>
        </BorderGlow>
      </div>
    </div>
  )
}
