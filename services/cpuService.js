
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
  `);

  const likeParam = `%${partialName}%`;
  return stmt.all(likeParam);
}