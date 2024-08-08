import ListUrls from '@/components/list-urls';
import URLComponent from '@/components/url-component';
import React from 'react';

export default function Home() {
  return (
    <main className='min-w-[80vw] sm:min-w-[60vw]'>
      <div className='mb-4 text-center'>
        <h1 className='-mb-1 text-3xl font-bold'>Miniel</h1>
        <p className='text-sm font-medium text-gray-400'>A URL Shortner</p>
      </div>

      <URLComponent />

      <ListUrls />
    </main>
  );
}
