export function asEmbeddedRows<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

/** embed에서 첫 행만 필요할 때 */
export function firstEmbeddedRow<T>(
  value: T | T[] | null | undefined,
): T | undefined {
  return asEmbeddedRows(value)[0];
}

/** `deleted_at`이 비어 있는 행만 남긴다 (Supabase embed·조회 배열 공통) */
export function filterAliveRows<T extends { deleted_at?: unknown }>(
  rows: T[],
): T[] {
  return rows.filter(row => row.deleted_at == null);
}
