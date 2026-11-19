'use client'

import Image from 'next/image'
import Link from 'next/link'
import authorImage from '@/public/images/authors/srv.jpeg'
import BorderGlow from '@/components/ui/BorderGlow'
import TechText from '@/components/ui/TechText'

export default function Intro() {
  return (
    <section className="relative w-full pt-4 pb-10">
      {/* Neo-Noir Subtle Glass Hero Frame: Gentle blur to keep background design crisp & visible */}
      <div
        className="pointer-events-none absolute -inset-x-4 sm:-inset-x-8 -inset-y-4 sm:-inset-y-6 -z-10 rounded-2xl bg-card/30 dark:bg-card/25 backdrop-blur-[2px] border border-border/30 shadow-[0_12px_40px_rgba(0,0,0,0.25)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
        aria-hidden="true"
      />

      {/* Salutation Lead-in: Filmic Noir Title Overlapping the Hero Name */}
      <div className="relative z-20 pointer-events-none pl-1 sm:pl-2 pt-2 -mb-2 sm:-mb-4">
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px] shadow-primary" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-primary/90">
              IDENTITY // 01
            </span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light tracking-tight text-primary leading-none select-none drop-shadow-[0_0_20px_rgba(225,29,72,0.65)] pl-0.5">
            Hey, I&apos;m
          </h2>
        </div>
      </div>

      {/* Accessible Heading for SEO & Screen Readers */}
      <h1 className="sr-only">Rama Sravan Gunda - AI Engineer</h1>

      {/* Hero Name — TechText with interactive canvas animations */}
      <div
        style={{ width: '100%', position: 'relative' }}
        className="w-full select-none overflow-visible my-1 h-[135px] sm:h-[155px] md:h-[175px]"
      >
        <TechText
          text="Rama Sravan Gunda"
          fontWeight={700}
          fontSize={150}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          intro="none"
          introDuration={2}
          clickKick={true}
          guides={true}
          selection={true}
          labels={true}
          draggable={true}
          fontFamily="Georgia, 'Times New Roman', serif"
          lineStyle="solid"
          speed={1.6}
          align="left"
          accentColor="#e11d48"
          color="currentColor"
        />
      </div>

      {/* Directly below the name in the same section: Credentials, Bio, CTAs & Photo */}
      <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 lg:gap-14 w-full">
        {/* Left Column: Role Badges, Bio, CTAs */}
        <div className="flex-1 max-w-3xl">
          {/* Role & Specialization Subtitle */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
            <span className="font-semibold tracking-widest uppercase text-primary">
              AI Engineer
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span className="font-medium tracking-wider text-muted-foreground">
              Limerick, Ireland
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span className="font-medium tracking-wider text-muted-foreground">
              Computer Vision &amp; Agentic AI
            </span>
          </div>

          {/* Bio paragraph */}
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-serif">
            I design and deploy production-grade <span className="text-foreground font-semibold">intelligent systems</span>, specialising in autonomous agentic workflows, LLM orchestration, and high-performance computer vision pipelines.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-7 font-mono text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_rgba(225,29,72,0.35)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all duration-200 hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border/80 bg-card/60 backdrop-blur-sm px-7 font-mono text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-200 hover:border-primary/60 hover:bg-card hover:text-primary active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right Column: Author Photo wrapped in BorderGlow */}
        <div className="relative z-10 shrink-0 self-center md:self-auto">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="22 90 52"
            backgroundColor="var(--card)"
            borderRadius={22}
            glowRadius={36}
            glowIntensity={1.0}
            coneSpread={24}
            animated={false}
            colors={['#e11d48', '#ffffff', '#e11d48']}
            className="p-1.5 shadow-2xl"
          >
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 overflow-hidden rounded-[18px] bg-card ring-1 ring-border/60">
              <Image
                src={authorImage}
                alt="Rama Sravan Gunda"
                fill
                sizes="(max-width: 640px) 208px, 240px"
                priority
                className="object-cover object-center grayscale contrast-115 transition-all duration-700 hover:grayscale-0 hover:scale-105"
              />
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  )
}
