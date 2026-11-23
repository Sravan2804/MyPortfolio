import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import BorderGlow from '@/components/ui/BorderGlow'

// Allow on-demand rendering for GitHub repo slugs not pre-built at build time
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.metadata.title || slug,
    description: project.metadata.summary || 'Architecture details and technical implementation.',
  }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects
    .filter(p => !p.isMarkdown)
    .map(p => ({ slug: p.slug }))
}

export default async function Project({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content, isMarkdown } = project
  const { title, image, author, publishedAt } = metadata

  return (
    <article className='pt-24 sm:pt-32 pb-24 w-full'>
      <div className='w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16'>
        <div className='mb-8'>
          <Link
            href='/projects'
            className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary group min-h-[44px]'
          >
            <ArrowLeft className='h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-primary' />
            <span>Back to all projects</span>
          </Link>
        </div>

        <header className='mb-8 rounded-xl border border-border/50 bg-card/65 dark:bg-card/55 backdrop-blur-[6px] p-6 sm:p-8 shadow-md'>
          <div className='flex items-center gap-3 text-xs font-mono font-medium text-primary mb-3 uppercase tracking-wider'>
            <span>{author || 'Rama Sravan'}</span>
            <span className='text-muted-foreground/40'>•</span>
            <time dateTime={publishedAt}>{formatDate(publishedAt ?? '')}</time>
          </div>
          <h1 className='font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
            {title}
          </h1>
        </header>

        {image && (
          <div className='mb-10'>
            <BorderGlow
              edgeSensitivity={30}
              glowColor="22 90 52"
              backgroundColor="var(--card)"
              borderRadius={18}
              glowRadius={36}
              glowIntensity={0.85}
              coneSpread={24}
              colors={['#e11d48', '#ffffff', '#e11d48']}
              className="p-1 shadow-2xl"
            >
              <div className='relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-card border border-border/40'>
                <Image
                  src={image}
                  alt={title || ''}
                  className='object-cover grayscale contrast-125 transition-all duration-700 hover:grayscale-0'
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            </BorderGlow>
          </div>
        )}

        <main className='rounded-xl border border-border/50 bg-card/65 dark:bg-card/55 backdrop-blur-[6px] p-8 sm:p-12 shadow-md prose prose-zinc dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:border prose-pre:border-border/60 prose-pre:bg-card/60 prose-blockquote:border-l-primary prose-blockquote:text-foreground'>
          <MDXContent
            source={content}
            options={isMarkdown ? { mdxOptions: { format: 'md' } } : undefined}
          />
        </main>
      </div>
    </article>
  )
}
