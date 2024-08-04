import whatwg from 'whatwg-url';

export const convertToURL = ({
  baseUrl,
  shortUrlId,
}: {
  baseUrl: whatwg.URLRecord;
  shortUrlId: string;
}) => {
  const url = whatwg.serializeURL({
    ...baseUrl,
    path: `/${shortUrlId}`,
  });

  const parsedUrl = new URL(url);
  return `${parsedUrl.host}${parsedUrl.pathname}`;
};
