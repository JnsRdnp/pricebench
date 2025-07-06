import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('./raws/giganttikoneet.html', 'utf-8'); // or use axios to fetch the page
const $ = cheerio.load(html);

const products = [];

$('a[data-testid="product-card"]').each((i, el) => {
  const $el = $(el);

    const name = $el.find('h2').text().trim();
    const priceText = $el.find('[data-primary-price]').text().trim();
    const match = priceText.match(/\d{1,3}(?:\.\d{3})*,\d{2}\s*€/);
    const price = match ? match[0] : 'N/A';
    const availability = $el.find('.text-xs .font-bold').text().trim();
    const imageUrl = $el.find('img').attr('src') || '';
    const link = 'https://www.gigantti.fi' + $el.attr('href');

  // Extract SKU
  const sku = $el.attr('data-item-id');

  // Extract specs (inside <li> elements)
  const specs = [];
  $el.find('ul li').each((i, li) => {
    specs.push($(li).text().trim());
  });

  products.push({
    name,
    price: price,
    availability,
    imageUrl,
    link,
    sku,
    specs
  });
});

console.log(products);