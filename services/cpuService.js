
import Database from 'better-sqlite3';
const db = new Database('./db/data.db');  // your DB file path
/**
 * Finds CPUs whose names include the given substring.
 * @param {string} partialName - Substring to search for in CPU names.
 * @returns {Array} Array of matching CPU rows.
 */
export function findCpusByName(partialName) {
  const stmt = db.prepare(`
    SELECT id, name, singlethread, multithread
    FROM cpubenchmarks
    WHERE name LIKE ?
    ORDER BY
      CASE
        WHEN name = ? THEN 0
        WHEN name LIKE ? THEN 1
        ELSE 2
      END,
      name
  `);

  const likeParam = `%${partialName}%`;
  const startsWithParam = `${partialName}%`;

  return stmt.all(likeParam, partialName, startsWithParam);
}