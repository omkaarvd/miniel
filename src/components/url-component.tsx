'use client';

import { shortenURLFormAction } from '@/actions/url';
import CopyUrl from '@/components/copy-url';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EXPIRY_VALUES } from '@/lib/time';
import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function URLComponent() {
  const formRef = useRef<HTMLFormElement>(null);

  const [{ error, shortUrl, msg, expiry, mainUrl }, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      const result = await shortenURLFormAction(prevState, formData);
      formRef.current?.reset();
      return result;
    },
    {},
  );

  return (
    <>
      <form ref={formRef} action={formAction} className='mb-8'>
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

          <Select name='expiry' defaultValue='3hr'>
            <SelectTrigger className='flex-1'>
              <SelectValue placeholder='Expiry' />
            </SelectTrigger>
            <SelectContent>
              {EXPIRY_VALUES.map((el) => {
                return (
                  <SelectItem key={el} value={el}>
                    {el}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <ShortenBtn />
        </div>

        {error ? (
          <p className='my-2 text-sm text-destructive'>{error}</p>
        ) : null}

        {msg ? <p className='my-2 text-sm text-destructive'>{msg}</p> : null}
      </form>

      {shortUrl ? (
        <CopyUrl link={shortUrl} expiry={expiry!} mainUrl={mainUrl} />
      ) : null}
    </>
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
