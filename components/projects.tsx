'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Search } from 'lucide-react'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import BorderGlow from '@/components/ui/BorderGlow'

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
        <div className='relative mb-12 w-full max-w-lg'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50'>
            <Search className='h-4 w-4' />
          </div>
          <input
            type='text'
            placeholder='Search projects...'
            className='block w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <ul className='flex flex-col gap-6'>
          {filteredProjects.map(project => (
            <li key={project.slug}>
              <BorderGlow
                edgeSensitivity={30}
                glowColor="345 80 65"
                backgroundColor="transparent"
                borderRadius={16}
                glowRadius={32}
                glowIntensity={0.8}
                coneSpread={22}
                colors={['#e879a0', '#f472b6', '#c084fc']}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className='flex gap-6 p-5 no-underline'
                >
                  {project.image && (
                    <div className='relative w-36 h-24 shrink-0 overflow-hidden rounded-lg'>
                      <Image
                        src={project.image}
                        alt={project.title || ''}
                        fill
                        className='object-cover object-center'
                      />
                    </div>
                  )}
                  <div className='flex flex-1 flex-col justify-between'>
                    <div>
                      <h2 className='font-serif text-lg font-bold text-foreground mb-1'>
                        {project.title}
                      </h2>
                      <p className='text-sm text-muted-foreground line-clamp-2'>
                        {project.summary}
                      </p>
                    </div>
                    <p className='text-xs font-medium text-primary/70 mt-2'>
                      {formatDate(project.publishedAt ?? '')}
                    </p>
                  </div>
                </Link>
              </BorderGlow>
            </li>
          ))}
        </ul>
      ) : (
        <div className='py-24 text-center text-muted-foreground'>
          <p className='text-base'>No projects found matching &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}
