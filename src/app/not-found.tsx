import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h2 className='text-2xl font-bold'>Not Found</h2>
      <p className='text-sm font-medium'>Could not find requested resource</p>
      <Button variant='outline' asChild>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
}
