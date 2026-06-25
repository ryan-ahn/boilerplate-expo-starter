export function isVersionLower(current: string, required: string): boolean {
  const toParts = (v: string) =>
    v.split(".").map(part => parseInt(part.replace(/\D/g, "") || "0", 10));
  const cur = toParts(current);
  const req = toParts(required);
  const len = Math.max(cur.length, req.length);
  for (let i = 0; i < len; i++) {
    const c = cur[i] ?? 0;
    const r = req[i] ?? 0;
    if (c < r) return true;
    if (c > r) return false;
  }
  return false;
}

export const isValidSearchKeyword = (value: string) => {
  const trimmedValue = value.trim();
  return trimmedValue.length > 0 && /^[0-9A-Za-z가-힣\s]+$/.test(trimmedValue);
};
