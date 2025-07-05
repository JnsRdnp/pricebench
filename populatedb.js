import Database from 'better-sqlite3'
import fs from 'fs';
import * as cheerio from 'cheerio';
const db = new Database('./db/data.db');  // your DB file path

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS cpubenchmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    singlethread REAL,
    multithread REAL
  );
`);


const upsertSingle = db.prepare(`
  INSERT INTO cpubenchmarks (name, singlethread) VALUES (?, ?)
  ON CONFLICT(name) DO UPDATE SET singlethread=excluded.singlethread
`);

const upsertMulti = db.prepare(`
  INSERT INTO cpubenchmarks (name, multithread) VALUES (?, ?)
  ON CONFLICT(name) DO UPDATE SET multithread=excluded.multithread
`);

// You can add more for other benchmark types if needed

function parseAndUpdateSingle(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);

  $('ul.chartlist li').each((_, elem) => {
    const name = $(elem).find('.prdname').text().trim().replace(/\s+/g, ' ');
    const moreDetailsSpan = $(elem).find('.more_details');
    const onclickAttr = moreDetailsSpan.attr('onclick') || '';

    let scoreText = '';

    if (onclickAttr.startsWith('p(')) {
      // Type 1: score in .mark-neww
      scoreText = $(elem).find('.mark-neww').text().replace(/,/g, '').trim();
    } else if (onclickAttr.startsWith('x(')) {
      // Type 2: score in .count
      scoreText = $(elem).find('.count').text().replace(/,/g, '').trim();
    } else {
      console.warn(`Skipping unknown onclick format for "${name}"`);
      return;
    }

    const score = parseFloat(scoreText);
    if (!name || isNaN(score)) {
      console.warn(`Invalid score for "${name}": raw scoreText="${scoreText}"`);
      return;
    }

    // Always singlethread in your case
    upsertSingle.run(name, score);
  });
}

function parseAndUpdateMulti(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);

  $('ul.chartlist li').each((_, elem) => {
    const name = $(elem).find('.prdname').text().trim().replace(/\s+/g, ' ');
    const moreDetailsSpan = $(elem).find('.more_details');
    const onclickAttr = moreDetailsSpan.attr('onclick') || '';

    let scoreText = '';

    if (onclickAttr.startsWith('p(')) {
      // Type 1: score in .mark-neww
      scoreText = $(elem).find('.mark-neww').text().replace(/,/g, '').trim();
    } else if (onclickAttr.startsWith('x(')) {
      // Type 2: score in .count
      scoreText = $(elem).find('.count').text().replace(/,/g, '').trim();
    } else {
      console.warn(`Skipping unknown onclick format for "${name}"`);
      return;
    }

    const score = parseFloat(scoreText);
    if (!name || isNaN(score)) {
      console.warn(`Invalid score for "${name}": raw scoreText="${scoreText}"`);
      return;
    }

    // Always singlethread in your case
    upsertMulti.run(name, score);
  });
}


parseAndUpdateSingle('./raws/cpuSingle1.html', 'singlethread');
parseAndUpdateSingle('./raws/cpuSingle2.html', 'singlethread');
parseAndUpdateSingle('./raws/cpuSingle3.html', 'singlethread');
parseAndUpdateSingle('./raws/cpuSingle4.html', 'singlethread');
parseAndUpdateSingle('./raws/cpuSingle5.html', 'singlethread');
parseAndUpdateSingle('./raws/cpuSingle6.html', 'singlethread');
parseAndUpdateSingle('./raws/cpuSingle7.html', 'singlethread');

parseAndUpdateMulti('./raws/cpuMulti1.html', 'multithread');
parseAndUpdateMulti('./raws/cpuMulti2.html', 'multithread');
parseAndUpdateMulti('./raws/cpuMulti3.html', 'multithread');
parseAndUpdateMulti('./raws/cpuMulti4.html', 'multithread');
parseAndUpdateMulti('./raws/cpuMulti5.html', 'multithread');
parseAndUpdateMulti('./raws/cpuMulti6.html', 'multithread');
parseAndUpdateMulti('./raws/cpuMulti7.html', 'multithread');