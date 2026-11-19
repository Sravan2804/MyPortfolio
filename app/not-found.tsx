import Link from 'next/link'
import BorderGlow from '@/components/ui/BorderGlow'

export default function NotFound() {
  return (
    <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 pt-28 pb-24 w-full'>
      <div className='w-full max-w-lg'>
        <BorderGlow
          edgeSensitivity={30}
          glowColor="22 90 52"
          backgroundColor="var(--card)"
          borderRadius={24}
          glowRadius={36}
          glowIntensity={0.9}
          coneSpread={24}
          colors={['#e11d48', '#ffffff', '#e11d48']}
          className="w-full text-center p-8 sm:p-12 shadow-2xl"
        >
          <p className='font-mono text-xs font-semibold tracking-widest uppercase text-primary mb-3'>
            HTTP 404 Error
          </p>

          <h1 className='font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4'>
            Page Not Found
          </h1>

          <p className='text-sm sm:text-base text-foreground/90 dark:text-zinc-200 leading-relaxed mb-8 max-w-sm mx-auto font-sans'>
            The resource or endpoint you requested could not be resolved on this system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href='/'
              className='inline-flex h-11 items-center justify-center rounded-md bg-primary px-7 font-mono text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_rgba(225,29,72,0.35)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all duration-200 hover:opacity-95 active:scale-[0.98]'
            >
              Return Home
            </Link>
            <Link
              href='/projects'
              className='inline-flex h-11 items-center justify-center rounded-md border border-border/80 bg-card/60 backdrop-blur-sm px-7 font-mono text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-200 hover:border-primary/60 hover:bg-card hover:text-primary active:scale-[0.98]'
            >
              View Projects
            </Link>
          </div>
        </BorderGlow>
      </div>
    </div>
  )
}
