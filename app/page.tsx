import React from 'react';
import Intro from '@/components/ui/intro';
import RecentProjects from '@/components/recent-projects';

export default function Home() {
  return (
    <div className="pt-32 pb-24">
      <div className="container max-w-4xl px-4 sm:px-6">
        <Intro />

        <div className="mt-20 border-t border-border/50 pt-16">
          <RecentProjects />
        </div>
      </div>
    </div>
  );
}
