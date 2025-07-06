
import Database from 'better-sqlite3';
const db = new Database('./db/data.db');  // your DB file path

export function findAllGiganttiProducts() {
  const stmt = db.prepare('SELECT * FROM gigantti_products ORDER BY combinedValueScore DESC');
  const products = stmt.all(); // returns all rows as array of objects
  return products;
}
