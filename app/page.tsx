import React from 'react';
import Intro from '@/components/ui/intro';
import RecentProjects from '@/components/recent-projects';

export default function Home() {
  return (
    <section className="py-24">
      <div className="container max-w-4xl">
        <Intro />

        <div className="mt-16">
          <RecentProjects />
        </div>
      </div>
    </section>
  );
}