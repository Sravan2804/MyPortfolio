import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'content', 'projects')

/**
 * Sanitize raw GitHub README markdown so it is safe to compile with MDX.
 *
 * MDX uses acorn to parse JSX expressions, so characters that look like JSX
 * but aren't valid will throw "Could not parse expression with acorn".
 * This helper converts such content to MDX-safe equivalents:
 *   - Wraps HTML image tags with badges/shields in plain markdown links
 *   - Escapes bare `{` and `}` that are outside fenced code blocks
 *   - Escapes `<` and `>` that are outside fenced code blocks and are not
 *     valid MDX/HTML tags (e.g. angle-bracket comparisons in prose)
 */
function sanitizeForMdx(raw: string): string {
  const lines = raw.split('\n')
  let inFence = false
  const out: string[] = []

  for (const line of lines) {
    // Track fenced code blocks (``` or ~~~) so we don't escape inside them
    if (/^(\`{3,}|~{3,})/.test(line)) {
      inFence = !inFence
      out.push(line)
      continue
    }

    if (inFence) {
      out.push(line)
      continue
    }

    let safe = line

    // Replace bare { and } with HTML entities outside code spans
    // (preserve inline backtick spans by splitting around them)
    safe = safe.replace(/(^|[^`])(\{)([^`]|$)/g, '$1\\{$3')
    safe = safe.replace(/(^|[^`])(\})([^`]|$)/g, '$1\\}$3')

    out.push(safe)
  }

  return out.join('\n')
}

export type Project = {
  metadata: ProjectMetadata
  content: string
  /** True when content is plain Markdown (e.g. a GitHub README), not MDX */
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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    // 1. Try local MDX first
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
      const { data, content } = matter(fileContent)
      return { metadata: { ...data, slug }, content }
    }

    // 2. If not local, try fetching from GitHub API
    // GitHub API is case-insensitive for repo names, so slug works
    const repoRes = await fetch(`https://api.github.com/repos/Sravan2804/${slug}`, { 
      next: { revalidate: 3600 } 
    })
    
    if (repoRes.ok) {
      const repo = await repoRes.json()
      
      // Try fetching README for content
      let content = ''
      const readmeRes = await fetch(`https://raw.githubusercontent.com/Sravan2804/${repo.name}/main/README.md`)
      if (readmeRes.ok) {
        content = sanitizeForMdx(await readmeRes.text())
      } else {
        const readmeMasterRes = await fetch(`https://raw.githubusercontent.com/Sravan2804/${repo.name}/master/README.md`)
        if (readmeMasterRes.ok) {
          content = sanitizeForMdx(await readmeMasterRes.text())
        }
      }

      if (!content) {
        content = `[View the repository on GitHub](${repo.html_url})`
      }

      return {
        metadata: {
          title: repo.name.replace(/-/g, ' '),
          summary: repo.description || 'GitHub Repository',
          image: '',
          author: 'Sravan',
          publishedAt: repo.created_at.split('T')[0],
          slug: slug
        },
        content,
        isMarkdown: true
      }
    }

    return null
  } catch {
    return null
  }
}

interface GitHubRepo {
  name: string
  description: string
  fork: boolean
  created_at: string
  html_url: string
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  // 1. Get local projects
  let localProjects: ProjectMetadata[] = []
  if (fs.existsSync(rootDirectory)) {
    const files = fs.readdirSync(rootDirectory)
    localProjects = files.map(file => getProjectMetadata(file))
  }

  // 2. Get GitHub projects
  let githubProjects: ProjectMetadata[] = []
  try {
    const response = await fetch('https://api.github.com/users/Sravan2804/repos?sort=updated&per_page=100', {
      next: { revalidate: 3600 }
    })
    if (response.ok) {
      const repos = await response.json()
      if (Array.isArray(repos)) {
        githubProjects = repos
          .filter((repo: GitHubRepo) => !repo.fork && repo.description) // filter out forks and repos without descriptions
          .map((repo: GitHubRepo) => ({
            title: repo.name.replace(/-/g, ' '),
            summary: repo.description,
            image: '',
            author: 'Sravan',
            publishedAt: repo.created_at.split('T')[0],
            slug: repo.name.toLowerCase()
          }))
      }
    }
  } catch (error) {
    console.error('Error fetching github repos:', error)
  }

  // 3. Combine, prioritizing local
  const localSlugs = new Set(localProjects.map(p => p.slug))
  const combined = [...localProjects]
  for (const gp of githubProjects) {
    if (!localSlugs.has(gp.slug)) {
      combined.push(gp)
    }
  }

  // 4. Sort by date
  const sorted = combined.sort((a, b) => {
    if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
      return 1
    } else {
      return -1
    }
  })

  if (limit) {
    return sorted.slice(0, limit)
  }

  return sorted
}

export function getProjectMetadata(filepath: string): ProjectMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  return { ...data, slug }
}