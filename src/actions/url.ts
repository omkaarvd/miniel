'use server';

import { db } from '@/db';
import { analytics, uri } from '@/db/schema';
import { getExpiryTime, TimeLimit } from '@/lib/time';
import { convertToURL } from '@/lib/url';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import whatwg from 'whatwg-url';

type State = {
  msg?: string;
  error?: string;
  shortUrl?: string;
  expiry?: Date;
  mainUrl?: string;
};

export const shortenURLFormAction = async (
  prevState: State,
  formData: FormData,
): Promise<State> => {
  const { url, expiry } = Object.fromEntries(formData);

  const parsedUrl = whatwg.parseURL(url.toString());
  const baseUrl = whatwg.parseURL(process.env.NEXT_BASE_URL);

  if (!parsedUrl || !baseUrl) return { error: 'Invalid URL' };

  if (parsedUrl.host == baseUrl.host) {
    return { error: 'Invalid URL' };
  }

  const newUrl = whatwg.serializeURL(parsedUrl, true);

  const existingUri = await db.query.uri.findFirst({
    where: (uri, { eq }) => eq(uri.mainUrl, newUrl),
  });

  if (existingUri) {
    return {
      msg: 'URL already shortened!',
      shortUrl: convertToURL({ shortUrlId: existingUri.shortUrlId }),
      expiry: existingUri.expiryTime,
      mainUrl: existingUri.mainUrl,
    };
  }

  try {
    const shortUrlId = nanoid(8);

    await db.insert(uri).values({
      shortUrlId: shortUrlId,
      mainUrl: newUrl,
      expiryTime: getExpiryTime(expiry as TimeLimit),
    });

    return {
      shortUrl: convertToURL({ shortUrlId }),
      expiry: getExpiryTime(expiry as TimeLimit),
      mainUrl: newUrl,
    };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while adding url into database');
  }
};

export const redirectToMainUrl = async (shortId: string) => {
  try {
    const existingUri = await db.query.uri.findFirst({
      where: (uri, { eq }) => eq(uri.shortUrlId, shortId),
    });

    if (!existingUri) return null;

    const { expiryTime, mainUrl, shortUrlId } = existingUri;

    if (expiryTime < new Date()) {
      return null;
    }

    await db.insert(analytics).values({
      uriId: shortUrlId,
    });

    return mainUrl;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while handling redirect');
  }
};

export const getAllUrls = async () => {
  noStore();

  try {
    const allUrls = await db
      .select({
        url: uri.shortUrlId,
        mainUrl: uri.mainUrl,
        expiry: uri.expiryTime,
      })
      .from(uri);

    return allUrls.map((el) => ({
      ...el,
      url: convertToURL({ shortUrlId: el.url }),
    }));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error("Error occured while reading all URL's");
  }
};

export const updateUrlExpiryAction = async (
  link: string,
  formData: FormData,
) => {
  const { expiry } = Object.fromEntries(formData);

  try {
    const parts = link.split('/');
    const shortUrlId = parts[parts.length - 1];

    await db
      .update(uri)
      .set({
        expiryTime: getExpiryTime(expiry as TimeLimit),
      })
      .where(eq(uri.shortUrlId, shortUrlId));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while updating url expiry');
  }

  revalidatePath('/');
};

export const deleteUrlAction = async (link: string) => {
  try {
    const parts = link.split('/');
    const shortUrlId = parts[parts.length - 1];

    await db.delete(uri).where(eq(uri.shortUrlId, shortUrlId));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while deleting url');
  }

  revalidatePath('/');
};
