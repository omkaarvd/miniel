'use client';

import { shortenURLFormAction } from '@/actions/url';
import CopyUrl from '@/components/copy-url';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export default function Home() {
  const [{ error, shortUrl, msg }, formAction] = useFormState(
    shortenURLFormAction.bind(null),
    {
      error: undefined,
      shortUrl: undefined,
      msg: undefined,
    },
  );

  return (
    <main>
      <div className='mb-4 text-center'>
        <h1 className='-mb-1 text-3xl font-bold'>Miniel</h1>
        <p className='text-sm font-medium text-gray-400'>A URL Shortner</p>
      </div>

      <form action={formAction}>
        <Label htmlFor='url' className='mb-1 block text-sm font-medium'>
          Enter URL
        </Label>
        <div className='flex w-full flex-col items-center justify-between gap-4 sm:flex-row'>
          <Input
            placeholder='Enter URL here'
            autoComplete='off'
            required
            type='url'
            id='url'
            name='url'
          />
          <ShortenBtn />
        </div>
        {error ? (
          <p className='mt-1 text-sm text-destructive'>{error}</p>
        ) : null}

        {msg ? <p className='mt-1 text-sm text-destructive'>{msg}</p> : null}
      </form>

      {shortUrl ? <CopyUrl link={shortUrl} /> : null}
    </main>
  );
}

function ShortenBtn() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit'>
      {pending ? (
        <span className='animate-bounce text-3xl'>...</span>
      ) : (
        'Shorten'
      )}
    </Button>
  );
}
