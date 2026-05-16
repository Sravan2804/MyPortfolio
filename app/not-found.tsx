import Link from 'next/link'
import { ArrowLeft, Orbit } from 'lucide-react'

export default function NotFound() {
  return (
    <section className='relative flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden pb-24 pt-40'>
      {/* Deep Space Glow */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]'></div>
      <div className='pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[150px]'></div>

      <div className='container relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center text-center'>
        {/* Floating Animated 404 */}
        <div className='relative mb-8 flex animate-[bounce_4s_infinite] items-center justify-center'>
          <h1 className='text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 drop-shadow-2xl sm:text-[180px] md:text-[220px]'>
            404
          </h1>
          <div className='absolute -right-4 top-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite]'>
            <Orbit className='h-24 w-24 text-primary/40' />
          </div>
        </div>

        <h2 className='mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl'>
          Lost in the <span className='text-primary'>Void</span>
        </h2>
        
        <p className='mb-12 max-w-md text-base text-muted-foreground sm:text-lg'>
          The coordinates you entered lead to a sector that doesn&apos;t exist. Let&apos;s get you back to familiar territory.
        </p>

        {/* Glassy Return Button */}
        <Link
          href='/'
          className='group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-black/10 bg-black/5 px-8 py-4 font-semibold text-foreground shadow-2xl shadow-black/10 dark:shadow-white/10 backdrop-blur-xl transition-all hover:ring-2 hover:ring-primary/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'
        >
          {/* Shine Sweep Effect */}
          <div className='absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]'>
            <div className='relative h-full w-8 bg-white/20 blur-sm'></div>
          </div>
          <ArrowLeft className='relative h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1' />
          <span className='relative'>Initiate Return Sequence</span>
        </Link>
      </div>
    </section>
  )
}