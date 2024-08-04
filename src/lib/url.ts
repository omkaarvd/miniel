export const convertToURL = ({ shortUrlId }: { shortUrlId: string }) => {
  const parsedUrl = new URL(process.env.NEXT_BASE_URL);
  return `${parsedUrl.host}/${shortUrlId}`;
};
