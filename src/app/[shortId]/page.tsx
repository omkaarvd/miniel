import { redirectToMainUrl } from '@/actions/url';
import { db } from '@/db';
import { uri } from '@/db/schema';
import { gte } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
  const urls = await db.query.uri.findMany({
    columns: { shortUrlId: true },
    where: gte(uri.expiryTime, new Date()),
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
  const mainUrl = await redirectToMainUrl(shortId);

  if (!mainUrl) {
    return notFound();
  }

  return redirect(mainUrl);
}
