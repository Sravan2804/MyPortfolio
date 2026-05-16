import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import Projects from '@/components/projects'
import { ArrowRight } from 'lucide-react'

export default async function RecentProjects() {
  const projects = await getProjects(2)

  return (
    <section className='pb-24 pt-12 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both'>
      <div>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='font-serif text-3xl font-bold tracking-tight text-foreground'>
            Featured <span className='text-primary'>Projects</span>
          </h2>
          <Link
            href='/projects'
            className='group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
          >
            <span>View all</span>
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>
        
        <Projects projects={projects} />
        
        <div className='mt-12 flex justify-center'>
          <Link
            href='/projects'
            className='relative overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group'
          >
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(var(--primary),0)_0%,rgba(var(--primary),0.8)_50%,rgba(var(--primary),0)_100%)]' />
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-card px-8 py-3 text-sm font-medium text-foreground backdrop-blur-3xl transition-colors group-hover:bg-card/80'>
              Explore the Archive
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}