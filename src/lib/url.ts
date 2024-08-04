import whatwg from 'whatwg-url';

export const convertToURL = ({
  baseUrl,
  shortUrlId,
}: {
  baseUrl: whatwg.URLRecord;
  shortUrlId: string;
}) => {
  return whatwg.serializeURL({
    ...baseUrl,
    path: `/${shortUrlId}`,
  });
};
