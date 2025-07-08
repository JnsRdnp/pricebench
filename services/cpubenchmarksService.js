import Database from 'better-sqlite3';
const db = new Database('./db/data.db'); // Adjust DB path as needed

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[™®]/g, '')     // remove trademark symbols
    .replace(/[-–—]/g, ' ')  // replace dashes with spaces
    .replace(/\s+/g, ' ')    // collapse multiple spaces
    .trim();
}

class CpubenchmarksService {
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM cpubenchmarks');
    const totalResult = totalStmt.get();
    const total = totalResult.count;

    const stmt = db.prepare('SELECT * FROM cpubenchmarks LIMIT ? OFFSET ?');
    const data = stmt.all(limit, offset);

    return { data, page, limit, total };
  }

  async getById(id) {
    const stmt = db.prepare('SELECT * FROM cpubenchmarks WHERE id = ?');
    return stmt.get(id);
  }

  async searchByName(name) {
  const normalized = normalizeText(name);

  const stmt = db.prepare(`
    SELECT * FROM cpubenchmarks
    WHERE LOWER(name) LIKE '%' || ? || '%'
  `);

  const data = stmt.all(normalized);
  return { data, total: data.length };
}

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const stmt = db.prepare(`INSERT INTO cpubenchmarks (${keys.join(', ')}) VALUES (${placeholders})`);
    const info = stmt.run(...keys.map(k => data[k]));
    return this.getById(info.lastInsertRowid);
  }

  async update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) throw new Error('No data to update');

    const assignments = keys.map(k => `${k} = ?`).join(', ');
    const stmt = db.prepare(`UPDATE cpubenchmarks SET ${assignments} WHERE id = ?`);
    const info = stmt.run(...keys.map(k => data[k]), id);

    if (info.changes === 0) throw new Error('Cpubenchmarks not found');
    return this.getById(id);
  }

  async remove(id) {
    const stmt = db.prepare('DELETE FROM cpubenchmarks WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) throw new Error('Cpubenchmarks not found');
    return true;
  }
}

export default new CpubenchmarksService();
