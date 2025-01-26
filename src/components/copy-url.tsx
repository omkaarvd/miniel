'use client';

import { deleteUrlAction, updateUrlExpiryAction } from '@/actions/url';
import { EXPIRY_VALUES, formatDate } from '@/lib/time';
import { cn } from '@/lib/utils';
import * as htmlToImage from 'html-to-image';
import { CheckIcon, QrCodeIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import QRCode from 'react-qr-code';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardHeader } from './ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function CopyUrl({
  link,
  mainUrl,
  expiry,
}: {
  link: string;
  mainUrl?: string;
  expiry: Date;
}) {
  const textRef = React.useRef<HTMLAnchorElement>(null);

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
        const linkc = document.createElement('a');

        const parts = link.split('/');
        const shortUrlId = parts[parts.length - 1];

        linkc.download = shortUrlId + '.jpeg';
        linkc.href = dataUrl;
        linkc.click();
      });
    }
  }

  const isUrlExpired = expiry < new Date();

  function onDeleteBtnClick() {
    deleteUrlAction(link);
  }

  return (
    <Card className='relative flex flex-row items-center justify-between p-0'>
      <Badge
        variant='secondary'
        className={cn(
          'absolute -top-3 left-0 text-xs font-normal',
          isUrlExpired ? 'text-destructive' : 'text-green-600',
        )}
      >
        {formatDate(expiry)}
      </Badge>

      <div className='min-w-0 flex-1'>
        <CardHeader
          className={cn(
            'whitespace-nowrap p-3 text-sm font-medium',
            mainUrl && 'pb-0',
          )}
        >
          <a
            href={`http://${link}`}
            ref={textRef}
            target='_blank'
            className='block overflow-hidden text-ellipsis hover:text-blue-500'
          >
            {link}
          </a>
        </CardHeader>

        <a
          href={mainUrl}
          target='_blank'
          className='block overflow-hidden text-ellipsis whitespace-nowrap pb-3 pl-3 text-xs hover:text-blue-500'
        >
          {mainUrl}
        </a>
      </div>

      <div className='flex flex-shrink-0 flex-row items-center gap-2 p-2 pr-3'>
        {isUrlExpired ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm' variant='outline'>
                Renew
              </Button>
            </DialogTrigger>
            <DialogContent
              aria-describedby={undefined}
              className='w-5/6 rounded-lg sm:w-full'
            >
              <DialogTitle className='text-base'>Update URL Expiry</DialogTitle>

              <DialogDescription className='flex flex-col gap-4'>
                <div>
                  <Label htmlFor='link'>Shortened URL</Label>
                  <Input value={link} name='link' readOnly />
                </div>

                <div>
                  <Label htmlFor='main-url'>Main URL</Label>
                  <Input value={mainUrl} name='main-url' readOnly />
                </div>

                <form
                  action={updateUrlExpiryAction.bind(null, link)}
                  className='flex flex-col gap-4'
                >
                  <div>
                    <Label htmlFor='expiry'>New URL Expiry</Label>

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
                  </div>
                  <DialogClose asChild>
                    <Button type='submit'>Update</Button>
                  </DialogClose>
                </form>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ) : (
          <>
            <Button
              data-copy-to-clipboard-target='copy-text'
              onClick={() => onCopyBtnClick()}
              size='sm'
              variant='outline'
            >
              <span id={defaultMessageId}>Copy</span>
              <span id={successMessageId} className='hidden items-center'>
                <CheckIcon size={18} className='mr-1' />
                Copied!
              </span>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button size='sm' variant='outline' className='w-10'>
                  <QrCodeIcon className='scale-125' />
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

            <Link href={`http://${link}`} target='_blank'>
              <Button size='sm' variant='outline'>
                Visit
              </Button>
            </Link>
          </>
        )}

        <Button
          size='sm'
          variant='outline'
          className='w-10'
          onClick={onDeleteBtnClick}
        >
          <Trash2Icon className='scale-125' />
        </Button>
      </div>
    </Card>
  );
}
