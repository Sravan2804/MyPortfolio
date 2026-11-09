import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'content', 'posts')

export type PostMetadata = {
  title?: string
  date?: string
  draft?: boolean
  slug: string
  [key: string]: unknown
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(rootDirectory, `${slug}.mdx`)
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  return { metadata: { ...data, slug } as PostMetadata, content }
}
