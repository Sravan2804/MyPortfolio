import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className='pt-32 pb-24 w-full'>
      <div className='w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16'>
        <header className='mb-10 rounded-xl border border-border/40 bg-card/30 dark:bg-card/25 backdrop-blur-[2px] p-6 sm:p-7 shadow-md'>
          <p className='font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-primary mb-2'>
            DOSSIER // ARCHIVE
          </p>
          <h1 className='font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground'>
            Featured Projects
          </h1>
          <p className='mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl font-serif'>
            A collection of machine learning pipelines, autonomous AI agents, and computer vision architectures designed for production scalability.
          </p>
        </header>

        <Projects projects={projects} showSearch />
      </div>
    </div>
  )
}
