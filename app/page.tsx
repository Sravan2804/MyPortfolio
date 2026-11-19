import React from 'react';
import Intro from '@/components/ui/intro';
import RecentProjects from '@/components/recent-projects';

export default function Home() {
  return (
    <div className="pt-20 sm:pt-24 pb-24 w-full">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <Intro />

        <div className="mt-16 border-t border-border/40 pt-14">
          <RecentProjects />
        </div>
      </div>
    </div>
  );
}
