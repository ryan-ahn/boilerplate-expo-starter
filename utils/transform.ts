export const getHttpsUrlFromUrl = (url: string): string => {
  const trimmedUrl = url?.trim();
  if (!trimmedUrl) return "";
  return url.replace(/^http:\/\//i, "https://");
};

export const getPathSegmentFromUrl = (raw: string): string | null => {
  const trimmedRaw = raw?.trim();
  if (!trimmedRaw) return null;
  try {
    const pathname = new URL(trimmedRaw).pathname;
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    return last ?? null;
  } catch {
    return null;
  }
};

export const getRandomNumber = ({
  min,
  max,
  isInteger = true,
}: {
  min: number;
  max: number;
  isInteger?: boolean;
}): number => {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  if (isInteger) {
    const minInt = Math.ceil(lower);
    const maxInt = Math.floor(upper);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

  return Math.random() * (upper - lower) + lower;
};
