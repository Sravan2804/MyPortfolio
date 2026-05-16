import Image from 'next/image'
import authorImage from '@/public/images/authors/srv.jpg'

export default function Intro() {
  return (
    <section className='relative flex flex-col-reverse items-center gap-x-12 gap-y-12 pb-24 pt-16 md:flex-row md:items-center'>
      {/* Cinematic Glowing Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-70 pointer-events-none animate-in fade-in duration-1000" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[100px] opacity-60 pointer-events-none animate-in fade-in duration-1000 delay-300" />

      {/* Content Container */}
      <div className='z-10 mt-2 flex-1 md:mt-0 text-center md:text-left animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both'>
        <h1 className='font-serif text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50'>
          Hey, I&#39;m <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary to-primary/70 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
            Rama Sravan G.
          </span>
        </h1>
        <p className='mt-6 font-light text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0'>
          I&#39;m an <span className="text-foreground font-medium"> AI Engineer </span> based in Limerick, Ireland. 
          I&#39;m passionate about building <span className="text-primary/90 font-medium border-b border-primary/30">intelligent systems</span> that solve real-world problems.
        </p>
      </div>
      
      {/* Image Container with Cinematic Frame */}
      <div className='relative z-10 animate-in zoom-in-95 fade-in duration-1000 fill-mode-both delay-300'>
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-primary/20 to-background opacity-70 blur-md animate-pulse"></div>
        <div className="relative rounded-full p-1 bg-background/50 backdrop-blur-sm border border-primary/20 shadow-2xl shadow-primary/20">
          <Image
            className='rounded-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105'
            src={authorImage}
            alt='Rama Sravan G'
            width={240}
            height={240}
            priority
          />
        </div>
      </div>
    </section>
  )
}