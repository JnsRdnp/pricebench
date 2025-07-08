import Database from 'better-sqlite3';
const db = new Database('./db/data.db'); // Adjust DB path as needed

class Gigantti_productsService {
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM gigantti_products');
    const totalResult = totalStmt.get();
    const total = totalResult.count;

    const stmt = db.prepare('SELECT * FROM gigantti_products LIMIT ? OFFSET ?');
    const data = stmt.all(limit, offset);

    return { data, page, limit, total };
  }

  async getById(id) {
    const stmt = db.prepare('SELECT * FROM gigantti_products WHERE id = ?');
    return stmt.get(id);
  }

  async create(data) {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const stmt = db.prepare(`INSERT INTO gigantti_products (${keys.join(', ')}) VALUES (${placeholders})`);
    const info = stmt.run(...keys.map(k => data[k]));
    return this.getById(info.lastInsertRowid);
  }

  async update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) throw new Error('No data to update');

    const assignments = keys.map(k => `${k} = ?`).join(', ');
    const stmt = db.prepare(`UPDATE gigantti_products SET ${assignments} WHERE id = ?`);
    const info = stmt.run(...keys.map(k => data[k]), id);

    if (info.changes === 0) throw new Error('Gigantti_products not found');
    return this.getById(id);
  }

  async remove(id) {
    const stmt = db.prepare('DELETE FROM gigantti_products WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) throw new Error('Gigantti_products not found');
    return true;
  }
}

export default new Gigantti_productsService();
