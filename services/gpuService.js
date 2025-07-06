
import Database from 'better-sqlite3';
const db = new Database('./db/data.db');  // your DB file path
/**
 * Finds GPUS whose names include the given substring.
 * @param {string} partialName - Substring to search for in GPUS names.
 * @returns {Array} Array of matching GPUS rows.
 */
export function findGpusByName(partialName) {
  const stmt = db.prepare(`
    SELECT id, name, benchmark
    FROM gpubenchmarks
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

export function findGpusByNameExact(partialName) {
  const stmt = db.prepare(`
    SELECT id, name, benchmark
    FROM gpubenchmarks
    WHERE
      name LIKE ? OR    -- space before and after
      name LIKE ? OR    -- dash before, space after
      name LIKE ? OR    -- space before, dash after
      name LIKE ? OR    -- dash before and after
      name LIKE ? OR    -- start with token + space or dash
      name LIKE ? OR    -- end with space or dash + token
      name LIKE ? OR    -- token at start + dash or end of string
      name LIKE ? OR    -- token at end + dash or start of string
      name = ?          -- exact match
    ORDER BY LENGTH(name) ASC
  `);

  const param1 = `% ${partialName} %`;     // space before and after
  const param2 = `%-${partialName} %`;     // dash before, space after
  const param3 = `% ${partialName}-%`;     // space before, dash after
  const param4 = `%-${partialName}-%`;     // dash before and after
  const param5 = `${partialName} %`;       // start + space after
  const param6 = `% ${partialName}`;       // space before + end
  const param7 = `${partialName}-%`;       // start + dash after (like i7-12700)
  const param8 = `%-${partialName}`;       // dash before + end
  const param9 = partialName;               // exact match

  return stmt.all(param1, param2, param3, param4, param5, param6, param7, param8, param9);
}