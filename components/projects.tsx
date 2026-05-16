import Image from 'next/image'
import Link from 'next/link'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map(project => (
        <li key={project.slug} className='group relative flex h-full'>
          <Link 
            href={`/projects/${project.slug}`} 
            className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-card/50 hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)] hover:-translate-y-1'
          >
            {project.image ? (
              <div className='relative mb-6 h-48 w-full shrink-0 overflow-hidden rounded-xl'>
                <Image
                  src={project.image}
                  alt={project.title || ''}
                  fill
                  className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
                />
              </div>
            ) : (
              <div className='mb-6 flex h-48 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 transition-transform duration-500 group-hover:scale-105'>
                <span className='text-4xl font-bold tracking-tight text-primary/40'>{project.title?.charAt(0) || 'P'}</span>
              </div>
            )}

            <div className='flex flex-1 flex-col'>
              <h2 className='title mb-2 text-xl line-clamp-2 no-underline group-hover:text-primary transition-colors'>
                {project.title}
              </h2>
              <p className='mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground'>
                {project.summary}
              </p>
              <div className='mt-auto flex items-center justify-between'>
                <p className='text-xs font-medium text-primary/80'>
                  {formatDate(project.publishedAt ?? '')}
                </p>
                <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-primary/20'>
                  <span className='text-primary'>→</span>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}