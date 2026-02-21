/**
 * API key helpers: generation, masking, and DB row mapping.
 */

export function generateApiKey(type = "dev") {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = `dandi-${type}-`;
  for (let i = 0; i < 20; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export function maskKey(key, type = "dev") {
  if (key.startsWith("dandi-")) {
    const match = key.match(/^dandi-(dev|prod)-/);
    const p = match ? match[0] : key.slice(0, 8);
    return p + "*".repeat(12);
  }
  return key.slice(0, 8) + "*".repeat(12);
}

export function rowToKey(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type ?? "dev",
    key: row.key,
    usage: row.usage ?? 0,
    createdAt: row.created_at,
  };
}
