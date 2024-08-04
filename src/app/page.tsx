import CopyUrl from '@/components/copy-url';
import ShortUrl from '@/components/short-url';
import React from 'react';

export default function Home() {
  return (
    <main>
      <div className='mb-4 text-center'>
        <h1 className='-mb-1 text-3xl font-bold'>Miniel</h1>
        <p className='text-sm font-medium text-gray-400'>A URL Shortner</p>
      </div>

      <ShortUrl />
      <CopyUrl />
    </main>
  );
}
