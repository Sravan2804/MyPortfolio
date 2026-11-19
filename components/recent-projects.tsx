import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import Projects from '@/components/projects'

export default async function RecentProjects() {
  const allProjects = await getProjects()
  const featuredProjects = allProjects.slice(0, 3)

  return (
    <section className='pb-24 pt-8 relative z-10'>
      <div>
        <div className='mb-8 rounded-xl border border-border/50 bg-card/65 dark:bg-card/55 backdrop-blur-[6px] p-6 sm:p-7 shadow-md'>
          <p className='font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-primary mb-2'>
            PORTFOLIO // SYSTEMS
          </p>
          <div className='flex flex-col sm:flex-row sm:items-baseline justify-between gap-2'>
            <h2 className='font-serif text-3xl font-bold tracking-tight text-foreground'>
              Featured Projects
            </h2>
            <Link
              href='/projects'
              className='font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors'
            >
              View all ({allProjects.length}) &rarr;
            </Link>
          </div>
          <p className='mt-2 text-sm text-foreground/90 dark:text-zinc-200 max-w-xl leading-relaxed'>
            Selected production-grade architectures spanning agentic research orchestrators, vision telemetry, and computer vision pipelines.
          </p>
        </div>

        <Projects projects={featuredProjects} />

        <div className='mt-10 flex justify-start'>
          <Link
            href='/projects'
            className='inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-mono text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_rgba(225,29,72,0.35)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all duration-200 hover:opacity-95 active:scale-[0.98]'
          >
            Explore all {allProjects.length} projects
          </Link>
        </div>
      </div>
    </section>
  )
}
