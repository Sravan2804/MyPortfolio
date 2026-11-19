'use client'

import Image from 'next/image'
import Link from 'next/link'
import authorImage from '@/public/images/authors/srv.jpeg'
import TechText from '@/components/ui/TechText'
import TextPressure from '@/components/ui/TextPressure'
import BorderGlow from '@/components/ui/BorderGlow'
import RefineFrame from '@/components/ui/RefineFrame'

export default function Intro() {
  return (
    <section className='relative flex flex-col-reverse items-start gap-12 pb-16 pt-8 md:flex-row md:items-center md:justify-between'>
      {/* Content Container */}
      <div className='z-10 flex-1 max-w-2xl'>
        {/* "Hey, I'm" - TextPressure interactive component */}
        <div className="relative h-12 w-48 sm:w-56 mb-1">
          <TextPressure
            text="Hey, I'm"
            flex={false}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            radius={0.6}
            smoothing={0.5}
            idle="wave"
            idleSpeed={0.8}
            clickRipple={false}
            textColor="currentColor"
            pressureColor="oklch(0.65 0.3 345)"
            minFontSize={22}
          />
        </div>

        {/* Name — TechText interactive canvas */}
        <div className="relative w-full h-24 sm:h-28 -ml-1">
          <TechText
            text="Rama Sravan Gunda"
            fontWeight={700}
            fontSize={84}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={12}
            intro="none"
            clickKick={true}
            sweep={true}
            align="left"
            accentColor="oklch(0.65 0.3 345)"
          />
        </div>

        {/* Role & Specialization Subtitle */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            AI Engineer
          </span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-xs font-medium tracking-wider text-muted-foreground">
            Limerick, Ireland
          </span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-xs font-medium tracking-wider text-muted-foreground">
            Computer Vision & Agentic AI
          </span>
        </div>

        {/* Bio paragraph */}
        <p className='mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl'>
          I design and deploy production-grade <span className="text-foreground font-medium">intelligent systems</span>, specialising in autonomous agentic workflows, LLM orchestration, and high-performance computer vision pipelines.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Explore Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Author Photo with RefineFrame and BorderGlow */}
      <div className='relative z-10 flex-shrink-0 self-center md:self-auto'>
        <BorderGlow
          edgeSensitivity={30}
          glowColor="345 80 65"
          backgroundColor="#120F17"
          borderRadius={24}
          glowRadius={36}
          glowIntensity={1.0}
          coneSpread={24}
          animated={false}
          colors={['#ff2a85', '#e01e72', '#b5179e']}
          className="p-1.5"
        >
          <RefineFrame
            status="complete"
            aspectRatio="1 / 1"
            width={240}
            radius={20}
            background="#120F17"
            color="#ff2a85"
            stageDuration={400}
            sweep={true}
            showStatus={true}
            hideAfter={2500}
            className="shadow-2xl"
          >
            <Image
              className='block object-cover grayscale transition-all duration-700 hover:grayscale-0'
              src={authorImage}
              alt='Rama Sravan Gunda'
              width={240}
              height={240}
              priority
              style={{ display: 'block', width: '240px', height: '240px' }}
            />
          </RefineFrame>
        </BorderGlow>
      </div>
    </section>
  )
}
