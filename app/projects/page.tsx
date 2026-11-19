import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className='pt-32 pb-24'>
      <div className='container max-w-4xl px-4 sm:px-6'>
        <header className='mb-12'>
          <p className='text-xs font-semibold tracking-widest uppercase text-primary mb-2'>
            Portfolio & Systems
          </p>
          <h1 className='font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground'>
            Featured Projects
          </h1>
          <p className='mt-4 text-base text-muted-foreground leading-relaxed max-w-xl'>
            A collection of machine learning pipelines, autonomous AI agents, and computer vision applications designed for production scalability.
          </p>
        </header>

        <Projects projects={projects} showSearch />
      </div>
    </div>
  )
}
