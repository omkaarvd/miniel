'use client';

import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function CopyUrl() {
  const textRef = React.useRef<HTMLInputElement>(null);

  function copyTextToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }

  function onCopyBtnClick() {
    document.getElementById('default-message')?.classList.add('hidden');
    document.getElementById('success-message')?.classList.remove('hidden');
    document.getElementById('success-message')?.classList.add('inline-flex');

    copyTextToClipboard(textRef.current!.value);

    setTimeout(() => {
      document.getElementById('default-message')?.classList.remove('hidden');
      document.getElementById('success-message')?.classList.add('hidden');
      document
        .getElementById('success-message')
        ?.classList.remove('inline-flex');
    }, 1000);
  }

  return (
    <div className='my-4 flex flex-row items-center gap-2'>
      <Input
        id='copy-text'
        className='cursor-text'
        value='link'
        ref={textRef}
        readOnly
      />
      <Button
        data-copy-to-clipboard-target='copy-text'
        onClick={() => onCopyBtnClick()}
      >
        <span id='default-message'>Copy</span>
        <span id='success-message' className='hidden items-center'>
          <svg
            className='me-1.5 h-3 w-3 text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 16 12'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5.917 5.724 10.5 15 1.5'
            />
          </svg>
          Copied!
        </span>
      </Button>
    </div>
  );
}
