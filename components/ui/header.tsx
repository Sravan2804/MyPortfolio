'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ui/theme-toggle'
import { Search } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('toggle-command-menu'))
  }

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/85 py-3 backdrop-blur-md border-b border-border/40'>
      <nav className='w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-10 lg:px-16'>
        {/* Logo / Initials */}
        <Link
          href='/'
          className='font-serif text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary min-h-[44px] flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm'
        >
          RSG
        </Link>

        {/* Nav actions */}
        <div className='flex items-center gap-2 sm:gap-6'>
          {/* Main Navigation Links */}
          <ul className='flex items-center gap-2 sm:gap-6 text-xs sm:text-sm font-medium'>
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative min-h-[44px] flex items-center transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm px-0.5 ${
                      isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-2.5 left-0 h-0.5 bg-primary transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Quick Command Palette Button (Desktop) */}
          <button
            type='button'
            onClick={handleOpenSearch}
            className='hidden sm:inline-flex items-center gap-2 rounded-md border border-border/70 bg-card/60 px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            aria-label='Search command palette'
          >
            <Search className='h-3.5 w-3.5 text-muted-foreground' />
            <span className='font-sans text-[11px]'>Search</span>
            <kbd className='rounded bg-muted/80 px-1 py-0.5 text-[10px] font-mono border border-border/60 text-muted-foreground'>
              ⌘K
            </kbd>
          </button>

          {/* Quick Command Palette Button (Mobile) */}
          <button
            type='button'
            onClick={handleOpenSearch}
            className='sm:hidden flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-card/60 text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            aria-label='Search command palette'
          >
            <Search className='h-3.5 w-3.5' />
          </button>

          {/* Cinematic Theme Switcher */}
          <div className='border-l border-border/60 pl-2 sm:pl-4 flex items-center shrink-0'>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
