import { db } from '@/db';
import { analytics } from '@/db/schema';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';

export default async function Page({
  params: { shortId },
}: {
  params: { shortId: string };
}) {
  const existingUri = await db.query.uri.findFirst({
    where: (uri, { eq }) => eq(uri.shortUrlId, shortId),
  });

  if (!existingUri) notFound();

  await db.insert(analytics).values({
    uriId: existingUri.shortUrlId,
  });

  redirect(existingUri.mainUrl);
}
