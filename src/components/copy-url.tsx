'use client';

import * as htmlToImage from 'html-to-image';
import { QrCodeIcon } from 'lucide-react';
import React from 'react';
import QRCode from 'react-qr-code';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card, CardHeader } from './ui/card';
import { cn } from '@/lib/utils';

export default function CopyUrl({
  link,
  mainUrl,
}: {
  link: string;
  mainUrl?: string;
}) {
  const textRef = React.useRef<HTMLElement>(null);

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

  const defaultMessageId = `default-message-${link}`;
  const successMessageId = `success-message-${link}`;
  const qrCodeId = `qr-code-${link}`;

  function onCopyBtnClick() {
    document.getElementById(defaultMessageId)?.classList.add('hidden');
    document.getElementById(successMessageId)?.classList.remove('hidden');
    document.getElementById(successMessageId)?.classList.add('inline-flex');

    copyTextToClipboard(textRef.current?.textContent!);

    setTimeout(() => {
      document.getElementById(defaultMessageId)?.classList.remove('hidden');
      document.getElementById(successMessageId)?.classList.add('hidden');
      document
        .getElementById(successMessageId)
        ?.classList.remove('inline-flex');
    }, 1000);
  }

  function handleQrDownload() {
    const qrCode = document.getElementById(qrCodeId);
    if (qrCode) {
      htmlToImage.toJpeg(qrCode, { quality: 0.95 }).then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'qrcode.jpeg';
        link.href = dataUrl;
        link.click();
      });
    }
  }

  return (
    <Card className='flex flex-row items-center justify-between p-0'>
      <div className='min-w-0 flex-1'>
        <CardHeader
          className={cn(
            'whitespace-nowrap p-3 text-sm font-medium',
            mainUrl && 'pb-0',
          )}
        >
          <span ref={textRef} className='block overflow-hidden text-ellipsis'>
            {link}
          </span>
        </CardHeader>
        {mainUrl ? (
          <p className='overflow-hidden text-ellipsis whitespace-nowrap pb-3 pl-3 text-xs'>
            {mainUrl}
          </p>
        ) : null}
      </div>
      <div className='flex flex-shrink-0 flex-row items-center gap-2 p-2 pr-3'>
        <Button
          data-copy-to-clipboard-target='copy-text'
          onClick={() => onCopyBtnClick()}
        >
          <span id={defaultMessageId}>Copy</span>
          <span id={successMessageId} className='hidden items-center'>
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

        <Dialog>
          <DialogTrigger asChild>
            <Button size='icon' className='w-10'>
              <QrCodeIcon className='size-6' />
            </Button>
          </DialogTrigger>
          <DialogContent
            aria-describedby={undefined}
            className='w-5/6 rounded-lg sm:w-full'
          >
            <DialogTitle className='text-base'>{link}</DialogTitle>
            <div id={qrCodeId} className='mx-auto bg-white p-1'>
              <QRCode value={link} />
            </div>
            <DialogFooter className='mx-auto'>
              <Button onClick={handleQrDownload}>Download</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
