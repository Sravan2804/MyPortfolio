import Link from 'next/link'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import BorderGlow from '@/components/ui/BorderGlow'
import RefineFrame from '@/components/ui/RefineFrame'

// Allow on-demand rendering for GitHub repo slugs not pre-built at build time
export const dynamicParams = true

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
    <article className='pt-32 pb-24'>
      <div className='container max-w-3xl px-4 sm:px-6'>
        <div className='mb-8'>
          <Link
            href='/projects'
            className='inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary'
          >
            ← Back to all projects
          </Link>
        </div>

        <header className='mb-10'>
          <div className='flex items-center gap-3 text-xs font-medium text-primary mb-3 uppercase tracking-wider'>
            <span>{author || 'Rama Sravan'}</span>
            <span className='text-muted-foreground/40'>•</span>
            <time dateTime={publishedAt}>{formatDate(publishedAt ?? '')}</time>
          </div>
          <h1 className='font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
            {title}
          </h1>
        </header>

        {image && (
          <div className='mb-12'>
            <BorderGlow
              edgeSensitivity={30}
              glowColor="345 80 65"
              backgroundColor="#120F17"
              borderRadius={20}
              glowRadius={36}
              glowIntensity={0.85}
              coneSpread={24}
              colors={['#ff2a85', '#e01e72', '#b5179e']}
              className="p-1"
            >
              <div className='relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl'>
                <RefineFrame
                  status="complete"
                  aspectRatio="16 / 9"
                  width={800}
                  radius={16}
                  background="#120F17"
                  color="#ff2a85"
                  stageDuration={400}
                  sweep={true}
                  showStatus={false}
                  className="w-full h-full"
                >
                  <Image
                    src={image}
                    alt={title || ''}
                    className='object-cover'
                    fill
                    priority
                  />
                </RefineFrame>
              </div>
            </BorderGlow>
          </div>
        )}

        <main className='prose prose-zinc dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline'>
          <MDXContent
            source={content}
            options={isMarkdown ? { mdxOptions: { format: 'md' } } : undefined}
          />
        </main>
      </div>
    </article>
  )
}
