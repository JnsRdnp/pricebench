
import Database from 'better-sqlite3';
const db = new Database('./db/data.db');  // your DB file path

export function findAllGiganttiProducts() {
  const stmt = db.prepare('SELECT * FROM gigantti_products ORDER BY combinedValueScore DESC');
  const rows = stmt.all();

  return rows.map(p => {
    let cpuPerformance = null, gpuPerformance = null, specs = null;

    try { cpuPerformance = p.cpuPerformanceJson ? JSON.parse(p.cpuPerformanceJson) : null; } catch {}
    try { gpuPerformance = p.gpuPerformanceJson ? JSON.parse(p.gpuPerformanceJson) : null; } catch {}
    try { specs = p.specsJson ? JSON.parse(p.specsJson) : null; } catch {}

    return {
      id: p.id,
      sku: p.sku,
      name: p.name,
      price: p.price,
      availability: p.availability,
      imageUrl: p.imageUrl,
      link: p.link,
      cpuName: p.cpuName,
      gpuName: p.gpuName,
      specs,               // specs before performance
      cpuPerformance,
      gpuPerformance,
      combinedValueScore: p.combinedValueScore,
    };
  });
}