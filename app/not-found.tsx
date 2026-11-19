import Link from 'next/link'
import BorderGlow from '@/components/ui/BorderGlow'

export default function NotFound() {
  return (
    <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 pt-32 pb-24'>
      <div className='w-full max-w-md'>
        <BorderGlow
          edgeSensitivity={30}
          glowColor="345 80 65"
          backgroundColor="#120F17"
          borderRadius={24}
          glowRadius={36}
          glowIntensity={0.9}
          coneSpread={24}
          colors={['#ff2a85', '#e01e72', '#b5179e']}
          className="w-full text-center p-8 sm:p-12"
        >
          <p className='font-mono text-xs font-semibold tracking-widest uppercase text-primary mb-3'>
            HTTP 404 Error
          </p>

          <h1 className='font-serif text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-4'>
            Page Not Found
          </h1>

          <p className='text-sm text-muted-foreground leading-relaxed mb-8'>
            The resource or endpoint you requested could not be resolved on this system.
          </p>

          <Link
            href='/'
            className='inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          >
            Return to Homepage
          </Link>
        </BorderGlow>
      </div>
    </div>
  )
}
