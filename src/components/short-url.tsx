import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function ShortUrl() {
  return (
    <div>
      <Label htmlFor='url' className='mb-1 block text-sm font-medium'>
        Enter URL
      </Label>
      <div className='flex w-full flex-col items-center justify-between gap-4 sm:flex-row'>
        <Input
          placeholder='Enter URL here'
          autoComplete='off'
          required
          id='url'
        />
        <Button>Shorten</Button>
      </div>
    </div>
  );
}
