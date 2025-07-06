import fs, { cp } from 'fs';
import * as cheerio from 'cheerio';
import { findCpuPerformancePerEuroExact, findGpuPerformancePerEuroExact } from './priceService.js';

function parsePriceToNumber(priceStr) {
  if (!priceStr || priceStr === 'N/A') return null;
  const numStr = priceStr.replace(/\s*€/g, '').replace(/\./g, '').replace(',', '.');
  return parseFloat(numStr);
}

function cleanComponentName(name) {
  if (!name) return '';
  // Regex to remove these suffixes (with optional leading dash and space)
  return name.replace(/\s*-?näytönohjain\s*$/i, '')   // remove "-näytönohjain" or "näytönohjain" at end
             .replace(/\s*-?prosessori\s*$/i, '')     // remove "-prosessori" or "prosessori" at end
             .trim();
}

function extractLastComponent(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  const last = parts[parts.length - 1].toLowerCase();

  // Check if last part is 'ti' or 'pro'
  if (last === 'ti' || last === 'pro') {
    // If yes and there's at least 2 parts, return last two parts joined
    if (parts.length >= 2) {
      return parts.slice(parts.length - 2).join(' ');
    }
  }
  // Otherwise return just the last part
  return parts[parts.length - 1];
}

function parseGiganttiHtml(html) {
  const $ = cheerio.load(html);

  const products = [];

  $('a[data-testid="product-card"]').each((i, el) => {
    const $el = $(el);

    const name = $el.find('h2').text().trim();
    const priceText = $el.find('span.font-headline.inc-vat').first().text().trim();
    const price = priceText || 'N/A';
    const availability = $el.find('.text-xs .font-bold').text().trim();
    const imageUrl = $el.find('img').attr('src') || '';
    const link = 'https://www.gigantti.fi' + $el.attr('href');
    const sku = $el.attr('data-item-id');

    const specs = [];
    $el.find('ul li').each((i, li) => {
      specs.push($(li).text().trim());
    });

    const priceNumber = parsePriceToNumber(price);
    const rawCpuName = specs[0] || '';
    const rawGpuName = specs[1] || '';

    const cpuNameCleaned = cleanComponentName(rawCpuName);
    const gpuNameCleaned = cleanComponentName(rawGpuName);

    const cpuName = extractLastComponent(cpuNameCleaned);
    const gpuName = extractLastComponent(gpuNameCleaned);

    const cpuPerformance = priceNumber ? findCpuPerformancePerEuroExact(cpuName, priceNumber)[0] || null : null;
    const gpuPerformance = priceNumber ? findGpuPerformancePerEuroExact(gpuName, priceNumber)[0] || null : null;

    const combinedValueScore = (cpuPerformance?.valueScore || 0) + (gpuPerformance?.valueScore || 0);

    products.push({
      name,
      price,
      priceNumber,
      availability,
      imageUrl,
      link,
      sku,
      specs,
      cpuName,
      cpuPerformance,
      gpuName,
      gpuPerformance,
      combinedValueScore,
    });
  });

  return products;
}

export function findGiganttiPC() {
  const allFiles = [
    './raws/giganttikoneet1.html',
    './raws/giganttikoneet2.html',
    './raws/giganttikoneet3.html',
    './raws/giganttikoneet4.html',
  ];

  let allProducts = [];

  for (const file of allFiles) {
    const html = fs.readFileSync(file, 'utf-8');
    const products = parseGiganttiHtml(html);
    allProducts = allProducts.concat(products);
  }

  // Sort all combined products by combinedValueScore descending
  allProducts.sort((a, b) => b.combinedValueScore - a.combinedValueScore);

  return allProducts;
}