'use server';

import { db } from '@/db';
import { uri } from '@/db/schema';
import { convertToURL } from '@/lib/url';
import { nanoid } from 'nanoid';
import whatwg from 'whatwg-url';

type State = {
  msg?: string;
  error?: string;
  shortUrl?: string;
};

export const shortenURLFormAction = async (
  prevState: State,
  formData: FormData,
): Promise<State> => {
  const { url } = Object.fromEntries(formData);

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
      shortUrl: convertToURL({ baseUrl, shortUrlId: existingUri.shortUrlId }),
    };
  }

  try {
    const shortUrlId = nanoid(8);

    await db.insert(uri).values({
      shortUrlId: shortUrlId,
      mainUrl: newUrl,
    });

    return { shortUrl: convertToURL({ baseUrl, shortUrlId }) };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);

    throw new Error('Error occured while adding url into database');
  }
};
