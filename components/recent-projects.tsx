import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import Projects from '@/components/projects'

export default async function RecentProjects() {
  const projects = await getProjects(2)

  return (
    <section className='pb-24 pt-12 relative z-10'>
      <div>
        <div className='flex items-baseline justify-between mb-10'>
          <h2 className='font-serif text-2xl font-bold tracking-tight text-foreground'>
            Featured Projects
          </h2>
          <Link
            href='/projects'
            className='text-sm font-medium text-muted-foreground underline underline-offset-4 decoration-transparent hover:decoration-primary hover:text-primary transition-all duration-200'
          >
            View all
          </Link>
        </div>
        <Projects projects={projects} />
        <div className='mt-14 flex justify-start'>
          <Link
            href='/projects'
            className='inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          >
            Explore all projects
          </Link>
        </div>
      </div>
    </section>
  )
}
