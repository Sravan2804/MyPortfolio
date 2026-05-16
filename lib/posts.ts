import path from 'path'
import fs from 'fs'
import matter from 'gray-matter';

const rootDirectory = path.join(process.cwd(), 'content', 'posts')

export type PostMetadata = {
  title?: string;
  date?: string;
  draft?: boolean;
  slug: string;
  [key: string]: unknown;
};

export async function getPostBySlug(slug: string) {
    const fullPath = path.join(rootDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, {encoding: 'utf8'});

    const {data, content} = matter(fileContents);
    
    return {metadata: {...data, slug} as PostMetadata, content};
}