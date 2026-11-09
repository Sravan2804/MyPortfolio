import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'content', 'projects')

const GITHUB_USER = 'Sravan2804'

export type Project = {
  metadata: ProjectMetadata
  content: string
  isMarkdown?: boolean
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

interface GitHubRepo {
  name: string
  description: string
  fork: boolean
  created_at: string
  html_url: string
}

async function fetchReadme(repoName: string): Promise<string> {
  for (const branch of ['main', 'master']) {
    const res = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/${branch}/README.md`
    )
    if (res.ok) return res.text()
  }
  return ''
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    if (fs.existsSync(filePath)) {
      const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
      return { metadata: { ...data, slug }, content }
    }

    const repoRes = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${slug}`,
      { next: { revalidate: 3600 } }
    )
    if (!repoRes.ok) return null

    const repo: GitHubRepo = await repoRes.json()
    const readme = await fetchReadme(repo.name)

    return {
      metadata: {
        title: repo.name.replaceAll('-', ' '),
        summary: repo.description || 'GitHub Repository',
        image: '',
        author: 'Sravan',
        publishedAt: repo.created_at.slice(0, 10),
        slug,
      },
      content: readme || `[View on GitHub](${repo.html_url})`,
      isMarkdown: true,
    }
  } catch {
    return null
  }
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  const localProjects: ProjectMetadata[] = fs.existsSync(rootDirectory)
    ? fs.readdirSync(rootDirectory).map(file => {
        const slug = file.replace(/\.mdx$/, '')
        const { data } = matter(fs.readFileSync(path.join(rootDirectory, file), 'utf8'))
        return { ...data, slug } as ProjectMetadata
      })
    : []

  let githubProjects: ProjectMetadata[] = []
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      { next: { revalidate: 3600 } }
    )
    if (res.ok) {
      const repos: GitHubRepo[] = await res.json()
      githubProjects = repos
        .filter(repo => !repo.fork && repo.description)
        .map(repo => ({
          title: repo.name.replaceAll('-', ' '),
          summary: repo.description,
          image: '',
          author: 'Sravan',
          publishedAt: repo.created_at.slice(0, 10),
          slug: repo.name.toLowerCase(),
        }))
    }
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
  }

  const localSlugs = new Set(localProjects.map(p => p.slug))
  const combined = [
    ...localProjects,
    ...githubProjects.filter(p => !localSlugs.has(p.slug)),
  ].sort(
    (a, b) =>
      new Date(b.publishedAt ?? '').getTime() -
      new Date(a.publishedAt ?? '').getTime()
  )

  return limit ? combined.slice(0, limit) : combined
}
