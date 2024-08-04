import { getAllUrls } from '@/actions/url';
import CopyUrl from './copy-url';

export default async function ListUrls() {
  const allUrls = await getAllUrls();

  return (
    <div className='my-8 flex flex-col gap-3'>
      <h3 className='text-lg font-semibold'>Previous</h3>
      {allUrls.map((el) => (
        <CopyUrl key={el.url} link={el.url} mainUrl={el.mainUrl} />
      ))}
    </div>
  );
}
