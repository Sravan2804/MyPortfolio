import { Link } from 'next-view-transitions'
import ThemeToggle from '@/components/ui/theme-toggle'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/85 py-4 backdrop-blur-md border-b border-border/40'>
      <nav className='container flex max-w-4xl items-center justify-between px-4 sm:px-6'>
        <Link
          href='/'
          className='font-serif text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary'
        >
          RSG
        </Link>

        <div className='flex items-center gap-6 sm:gap-8'>
          <ul className='flex items-center gap-6 sm:gap-8 text-sm font-medium text-muted-foreground'>
            <li>
              <Link
                href='/about'
                className='relative transition-colors hover:text-foreground group'
              >
                About
                <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full' />
              </Link>
            </li>
            <li>
              <Link
                href='/projects'
                className='relative transition-colors hover:text-foreground group'
              >
                Projects
                <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full' />
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className='relative transition-colors hover:text-foreground group'
              >
                Contact
                <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full' />
              </Link>
            </li>
          </ul>

          <div className='border-l border-border/60 pl-4 sm:pl-6'>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
