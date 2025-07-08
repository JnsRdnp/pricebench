import fs, { cp } from 'fs';
import Database from 'better-sqlite3';
import * as cheerio from 'cheerio';
import { findCpuPerformancePerEuroExact, findGpuPerformancePerEuroExact } from './services/priceService.js';

const db = new Database('./db/data.db');

// ... Your CPU and GPU benchmark tables and upserts here ...

// Create Gigantti products table and upsert
db.exec(`DROP TABLE IF EXISTS gigantti_products;`);

db.exec(`
    CREATE TABLE gigantti_products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT UNIQUE,
        name TEXT,
        price REAL,
        availability TEXT,
        imageUrl TEXT,
        link TEXT,
        cpuName TEXT,
        gpuName TEXT,
        cpuPerformanceJson TEXT,
        gpuPerformanceJson TEXT,
        combinedValueScore REAL,
        combinedValueScoreLessCpu REAL,
        cpuValueScore REAL,
        gpuValueScore REAL,
        specsJson TEXT
    );
`);

const upsertGiganttiProduct = db.prepare(`
  INSERT INTO gigantti_products (
    sku, name, price, availability, imageUrl, link, cpuName, gpuName,
    cpuPerformanceJson, gpuPerformanceJson, combinedValueScore, combinedValueScoreLessCpu, cpuValueScore, gpuValueScore, specsJson)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(sku) DO UPDATE SET
    name=excluded.name,
    price=excluded.price,
    availability=excluded.availability,
    imageUrl=excluded.imageUrl,
    link=excluded.link,
    cpuName=excluded.cpuName,
    gpuName=excluded.gpuName,
    cpuPerformanceJson=excluded.cpuPerformanceJson,
    gpuPerformanceJson=excluded.gpuPerformanceJson,
    combinedValueScore=excluded.combinedValueScore,
    combinedValueScoreLessCpu=excluded.combinedValueScoreLessCpu,
    cpuValueScore=excluded.cpuValueScore,
    gpuValueScore=excluded.gpuValueScore,
    specsJson=excluded.specsJson;
`);

function parsePriceToNumber(priceStr) {
  if (!priceStr || priceStr === 'N/A') return null;
  const numStr = priceStr.replace(/\s*€/g, '').replace(/\./g, '').replace(',', '.');
  return parseFloat(numStr);
}

function cleanComponentName(name) {
  if (!name) return '';
  return name.replace(/\s*-?näytönohjain\s*$/i, '')
             .replace(/\s*-?prosessori\s*$/i, '')
             .trim();

}

function extractLastComponent(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  const last = parts[parts.length - 1].toLowerCase();

  if (last === 'ti' || last === 'pro' || last === 'xt') {
    if (parts.length >= 2) {
      return parts.slice(parts.length - 2).join(' ');
    }
  }

  return parts[parts.length - 1];
}

function extractWrongstyleName(name) {
  switch (name) {
    case '5-8645HS':
      return '5 8645HS';
    case '7-8845HS':
      return '7 8845HS';
    default:
      return name; // fallback to original if not matched
  }
}

function parseGiganttiHtml(html) {
  const $ = cheerio.load(html);
  const products = [];

  $('a[data-testid="product-card"]').each((i, el) => {
    const $el = $(el);
    const name = $el.find('h2').text().trim();
    const priceText = $el.find('span.font-headline.inc-vat').first().text().trim();
    const priceNumber = parsePriceToNumber(priceText);
    const availability = $el.find('.text-xs .font-bold').text().trim();
    const imageUrl = $el.find('img').attr('src') || '';
    const link = 'https://www.gigantti.fi' + $el.attr('href');
    const sku = $el.attr('data-item-id');

    const specs = [];
    $el.find('ul li').each((_, li) => {
      specs.push($(li).text().trim());
    });

    const rawCpuName = specs[0] || '';
    const rawGpuName = specs[1] || '';

    const cpuNameCleaned = cleanComponentName(rawCpuName);
    const gpuNameCleaned = cleanComponentName(rawGpuName);

    const cpuNameExtracted = extractLastComponent(cpuNameCleaned);
    const gpuNameExtracted = extractLastComponent(gpuNameCleaned);

    const cpuName = extractWrongstyleName(cpuNameExtracted)
    const gpuName = extractWrongstyleName(gpuNameExtracted)


    let gpuNameLaptopCheck = gpuName;  // Start with the base GPU name

    if (name.toLowerCase().includes('kannettava')) {
      gpuNameLaptopCheck += ' laptop'; // Add "laptop" if it's a notebook
    }

    console.log(gpuNameLaptopCheck);

    const cpuPerformance = priceNumber ? findCpuPerformancePerEuroExact(cpuName, priceNumber)[0] || null : null;
    const gpuPerformance = priceNumber ? findGpuPerformancePerEuroExact(gpuNameLaptopCheck, priceNumber)[0] || null : null;

    const combinedValueScore = (cpuPerformance?.valueScore || 0) + (gpuPerformance?.valueScore || 0);

    const cpuValueScore = cpuPerformance?.valueScore
    const gpuValueScore = gpuPerformance?.valueScore

    const combinedValueScoreLessCpu = ((cpuPerformance?.valueScore/2) || 0) + (gpuPerformance?.valueScore || 0);

    products.push({
      name,
      price: priceText,
      priceNumber,
      availability,
      imageUrl,
      link,
      sku,
      specs,
      cpuName,
      cpuPerformance,
      gpuName: gpuNameLaptopCheck,
      gpuPerformance,
      combinedValueScore,
      combinedValueScoreLessCpu,
      cpuValueScore,
      gpuValueScore,
    });
  });

  return products;
}

function saveGiganttiProductsToDb(products) {
db.exec('DELETE FROM gigantti_products;'); // clear table first
  const insert = db.transaction((products) => {
    for (const p of products) {
        upsertGiganttiProduct.run(
        p.sku,
        p.name,
        p.priceNumber,
        p.availability,
        p.imageUrl,
        p.link,
        p.cpuName,
        p.gpuName,
        JSON.stringify(p.cpuPerformance),
        JSON.stringify(p.gpuPerformance),
        p.combinedValueScore,
        p.combinedValueScoreLessCpu,
        p.cpuValueScore,
        p.gpuValueScore,
        JSON.stringify(p.specs) // add this line for specs
        );
    }
  });
  insert(products);
}

function importGiganttiFiles() {
  const files = [
    './raws/giganttikoneet1.html',
    './raws/giganttikoneet2.html',
    './raws/giganttikoneet3.html',
    './raws/giganttikoneet4.html',
  ];

  let allProducts = [];

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const products = parseGiganttiHtml(html);
    allProducts = allProducts.concat(products);
  }

  allProducts.sort((a, b) => b.combinedValueScore - a.combinedValueScore);

  saveGiganttiProductsToDb(allProducts);
}

// Call the function to run the import
importGiganttiFiles();