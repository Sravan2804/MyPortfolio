import Image from 'next/image'
import authorImage from '@/public/images/authors/srv.jpeg'
import TechText from '@/components/ui/TechText'
import TextPressure from '@/components/ui/TextPressure'
import BorderGlow from '@/components/ui/BorderGlow'

export default function Intro() {
  return (
    <section className='relative flex flex-col-reverse items-start gap-x-16 gap-y-12 pb-8 pt-20 md:flex-row md:items-center'>
      <div className='z-10 mt-2 flex-1 md:mt-0'>
        <div style={{ position: 'relative', height: '56px', width: '220px' }}>
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
            minFontSize={18}
          />
        </div>
        <div style={{ width: '100%', height: '120px', position: 'relative', marginTop: '8px' }}>
          <TechText
            text="Rama Sravan G."
            fontWeight={700}
            fontSize={100}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={10}
            intro="none"
            clickKick
            sweep={true}
            align="left"
            accentColor="oklch(0.65 0.3 345)"
          />
        </div>
        <p className='mt-2 text-sm font-semibold tracking-[0.2em] uppercase text-primary/80'>
          AI Engineer · Limerick, Ireland
        </p>
        <p className='mt-6 text-base text-muted-foreground leading-relaxed max-w-lg'>
          I build <span className="text-foreground font-medium">intelligent systems</span> that solve real-world problems — from agentic workflows and LLM orchestration to computer vision pipelines.
        </p>
      </div>
      <div className='relative z-10 flex-shrink-0'>
        <BorderGlow
          edgeSensitivity={25}
          glowColor="345 80 65"
          backgroundColor="transparent"
          borderRadius={20}
          glowRadius={32}
          glowIntensity={0.9}
          coneSpread={22}
          animated={false}
          colors={['#e879a0', '#f472b6', '#c084fc']}
          className="overflow-hidden"
        >
          <Image
            className='block object-cover grayscale transition-all duration-700 hover:grayscale-0'
            src={authorImage}
            alt='Rama Sravan G'
            width={220}
            height={220}
            priority
            style={{ display: 'block', width: '220px', height: '220px' }}
          />
        </BorderGlow>
      </div>
    </section>
  )
}
