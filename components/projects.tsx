'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Search, X } from 'lucide-react'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import BorderGlow from '@/components/ui/BorderGlow'

// Helper to determine clean technology tags without pills/rainbows
function getProjectTechTags(project: ProjectMetadata): string[] {
  const text = `${project.title || ''} ${project.summary || ''} ${project.slug}`.toLowerCase()
  const tags: string[] = []

  if (text.includes('langgraph') || text.includes('deepseek') || text.includes('gemini')) {
    tags.push('LangGraph', 'DeepSeek-V3', 'LLM Agents')
  } else if (text.includes('ppe') || text.includes('kit detection')) {
    tags.push('YOLOv8', 'PyTorch', 'OpenCV')
  } else if (text.includes('resume') || text.includes('screener')) {
    tags.push('Python', 'FastAPI', 'NLP')
  } else if (text.includes('anomaly') || text.includes('intrusion')) {
    tags.push('ML Architecture', 'Scikit-Learn', 'FastAPI')
  } else if (text.includes('car-counter') || text.includes('counter')) {
    tags.push('Computer Vision', 'YOLO', 'Object Tracking')
  } else if (text.includes('face')) {
    tags.push('Neural Nets', 'OpenCV', 'FaceNet')
  } else if (text.includes('simpson')) {
    tags.push('CNN', 'PyTorch', 'Classification')
  } else {
    tags.push('Machine Learning', 'Python')
  }

  return tags.slice(0, 3)
}

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
            className='block w-full rounded-md border border-border/80 bg-card/75 py-2.5 pl-11 pr-10 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary/80 focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all shadow-inner'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className='absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground/60 hover:text-foreground cursor-pointer'
              aria-label='Clear search query'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <ul className='flex flex-col gap-6'>
          {filteredProjects.map(project => {
            const tags = getProjectTechTags(project)
            return (
              <li key={project.slug} className='w-full'>
                <BorderGlow
                  edgeSensitivity={28}
                  glowColor="22 90 52"
                  backgroundColor="var(--card)"
                  borderRadius={16}
                  glowRadius={32}
                  glowIntensity={0.85}
                  coneSpread={22}
                  colors={['#e11d48', '#ffffff', '#e11d48']}
                  className="w-full transition-transform duration-200 hover:-translate-y-0.5 shadow-lg"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className='flex flex-col sm:flex-row gap-6 p-6 sm:p-7 no-underline w-full group'
                  >
                    {project.image && (
                      <div className='relative w-full sm:w-56 h-40 sm:h-36 shrink-0 overflow-hidden rounded-lg bg-muted/30 border border-border/40'>
                        <Image
                          src={project.image}
                          alt={project.title || ''}
                          fill
                          sizes="(max-width: 640px) 100vw, 240px"
                          className='object-cover object-center grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105'
                        />
                      </div>
                    )}

                    <div className='flex flex-1 flex-col justify-between py-0.5 min-w-0'>
                      <div>
                        {/* Header: Title and Date */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 mb-2">
                          <h3 className='font-serif text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors'>
                            {project.title}
                          </h3>
                          <span className='text-xs font-mono font-medium tracking-wider text-muted-foreground shrink-0 uppercase sm:pt-1'>
                            {formatDate(project.publishedAt ?? '')}
                          </span>
                        </div>

                        {/* Summary */}
                        <p className='text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4'>
                          {project.summary}
                        </p>
                      </div>

                      {/* Footer: Tech Tags and CTA */}
                      <div className='flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40'>
                        <div className='flex flex-wrap items-center gap-1.5'>
                          {tags.map(tag => (
                            <span
                              key={tag}
                              className='text-[10px] font-mono uppercase tracking-wider text-muted-foreground/90 bg-muted/40 px-2 py-0.5 rounded-sm border border-border/70 group-hover:border-primary/40 transition-colors'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className='flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-primary uppercase'>
                          <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Explore File &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </BorderGlow>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className='py-20 text-center'>
          <p className='text-base font-medium text-foreground mb-1.5'>
            No projects found matching &quot;{query}&quot;
          </p>
          <p className='text-sm text-muted-foreground mb-6 max-w-sm mx-auto'>
            Try searching for keywords like YOLO, PyTorch, LangGraph, or Computer Vision.
          </p>
          <button
            onClick={() => setQuery('')}
            className='inline-flex h-10 items-center justify-center rounded-lg border border-border/80 bg-card/60 px-5 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary/50 hover:text-primary transition-all cursor-pointer'
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  )
}
