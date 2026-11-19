'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Search } from 'lucide-react'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import BorderGlow from '@/components/ui/BorderGlow'
import RefineFrame from '@/components/ui/RefineFrame'

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
        <div className='relative mb-12 w-full max-w-md'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/60'>
            <Search className='h-4 w-4' />
          </div>
          <input
            type='text'
            placeholder='Search projects by title, stack, or topic...'
            className='block w-full rounded-lg border border-border bg-card/60 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <ul className='flex flex-col gap-6'>
          {filteredProjects.map(project => (
            <li key={project.slug} className='w-full'>
              <BorderGlow
                edgeSensitivity={28}
                glowColor="345 80 65"
                backgroundColor="#120F17"
                borderRadius={18}
                glowRadius={32}
                glowIntensity={0.85}
                coneSpread={22}
                colors={['#ff2a85', '#e01e72', '#b5179e']}
                className="w-full transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className='flex flex-col sm:flex-row gap-6 p-6 no-underline w-full group'
                >
                  {project.image && (
                    <div className='relative w-full sm:w-48 h-32 shrink-0 overflow-hidden rounded-xl'>
                      <RefineFrame
                        status="complete"
                        aspectRatio="16 / 10"
                        width={200}
                        radius={12}
                        background="#18141f"
                        color="#ff2a85"
                        stageDuration={300}
                        sweep={false}
                        showStatus={false}
                        className="w-full h-full"
                      >
                        <Image
                          src={project.image}
                          alt={project.title || ''}
                          fill
                          className='object-cover object-center grayscale transition-all duration-500 group-hover:grayscale-0'
                        />
                      </RefineFrame>
                    </div>
                  )}

                  <div className='flex flex-1 flex-col justify-between py-0.5'>
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-1.5">
                        <h2 className='font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors'>
                          {project.title}
                        </h2>
                        <span className='text-xs font-semibold tracking-wider text-primary/80 shrink-0 uppercase'>
                          {formatDate(project.publishedAt ?? '')}
                        </span>
                      </div>
                      <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
                        {project.summary}
                      </p>
                    </div>

                    <div className='mt-4 flex items-center gap-2 text-xs font-medium text-primary'>
                      <span className="underline underline-offset-4 decoration-primary/40 group-hover:decoration-primary transition-all">
                        View project details
                      </span>
                    </div>
                  </div>
                </Link>
              </BorderGlow>
            </li>
          ))}
        </ul>
      ) : (
        <div className='py-20 text-center text-muted-foreground'>
          <p className='text-base font-medium'>No projects found matching &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}
