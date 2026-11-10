import Link from 'next/link'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { ArrowLeft } from 'lucide-react'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'

// Allow on-demand rendering for GitHub repo slugs not pre-built at build time
export const dynamicParams = true

export async function generateStaticParams() {
  // Only pre-render local MDX files at build time.
  // GitHub repo pages render on first request (no MDX compilation at build time).
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
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='h-5 w-5' />
          <span>Back to projects</span>
        </Link>

        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={title || ''}
              className='object-cover'
              fill
            />
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-xs text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose mt-16 dark:prose-invert'>
          <MDXContent
            source={content}
            options={isMarkdown ? { mdxOptions: { format: 'md' } } : undefined}
          />
        </main>
      </div>
    </section>
  )
}
