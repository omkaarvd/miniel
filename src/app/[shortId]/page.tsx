import { getMainUrl } from '@/actions/url';
import { db } from '@/db';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
  const urls = await db.query.uri.findMany({
    columns: { shortUrlId: true },
  });

  if (!urls) {
    return [{ shortId: '' }];
  }

  return urls.map(({ shortUrlId }) => {
    return { shortId: shortUrlId };
  });
}

export default async function Page({
  params: { shortId },
}: {
  params: { shortId: string };
}) {
  const mainUrl = await getMainUrl(shortId);

  if (!mainUrl) {
    return notFound();
  }

  return redirect(mainUrl);
}
