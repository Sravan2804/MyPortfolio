'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Search } from 'lucide-react'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

export default function Projects({
  projects,
  showSearch = false
}: {
  projects: ProjectMetadata[]
  showSearch?: boolean
}) {
  const [query, setQuery] = useState('')

  const filteredProjects = projects.filter(project => {
    if (!query) return true
    const searchContent = ((project.title || '') + ' ' + (project.summary || '')).toLowerCase()
    return searchContent.includes(query.toLowerCase())
  })

  return (
    <div className='w-full'>
      {showSearch && (
        <div className='relative mb-16 mx-auto group w-full max-w-md transition-all duration-500 focus-within:max-w-2xl'>
          {/* Glowing background effect */}
          <div className='absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-20 blur-xl transition-all duration-500 group-focus-within:opacity-70 group-focus-within:blur-2xl group-hover:opacity-50'></div>
          
          <div className='relative flex items-center'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-muted-foreground/50 transition-colors duration-300 group-focus-within:text-primary'>
              <Search className='h-5 w-5' />
            </div>
            
            <input
              type='text'
              placeholder='Search through projects, tech stacks, or keywords...'
              className='block w-full rounded-full border border-black/5 bg-black/5 py-4 pl-14 pr-16 text-sm text-foreground shadow-lg backdrop-blur-2xl transition-all duration-300 placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-background/80 focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:focus:bg-black/40'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'>
              <kbd className='hidden sm:inline-flex items-center gap-1 rounded-md border border-black/10 bg-black/5 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground opacity-60 transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-primary/70 dark:border-white/10 dark:bg-white/5'>
                <span className='text-xs'>⌘</span>K
              </kbd>
            </div>
          </div>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <ul className={`grid grid-cols-1 gap-8 ${projects.length === 2 && !showSearch ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {filteredProjects.map(project => (
        <li key={project.slug} className='group relative flex h-full'>
          <Link 
            href={`/projects/${project.slug}`} 
            className='flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-background/95 dark:bg-white/[0.03] dark:border-white/10 p-6 shadow-xl shadow-black/5 dark:shadow-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-primary/50 hover:bg-primary/[0.02] hover:shadow-[0_0_40px_-10px] hover:shadow-primary/40 dark:hover:shadow-primary/40 hover:-translate-y-2'
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
      ) : (
        <div className='py-24 text-center text-muted-foreground'>
          <p className='text-lg'>No projects found matching &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}