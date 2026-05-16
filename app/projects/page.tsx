import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-7xl'>
        <h1 className='title mb-12 text-center text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl'>
          Our <span className='text-primary'>Projects</span>
        </h1>

        <Projects projects={projects} />
      </div>
    </section>
  )
}