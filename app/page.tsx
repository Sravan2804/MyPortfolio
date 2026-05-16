import React from 'react';
import Intro from '@/components/ui/intro';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default function Home() {

  const content = `
    #markdown content
    
  `;
  
  return (
    <section className="py-24">
      <div className="container max-w-4xl">
        <Intro />

        <MDXRemote source={content} />
      </div>
    </section>
  );
}