const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const enrollHere = fs.readFileSync(path.join(root, 'assets', 'enrollhere-logo-mark.png')).toString('base64');
const idme = fs.readFileSync(path.join(root, 'assets', 'idme-logo-navy.svg')).toString('base64');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#5050ff"/><stop offset="1" stop-color="#1769aa"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="18" fill="url(#line)"/>

  <image href="data:image/png;base64,${enrollHere}" x="78" y="65" width="138" height="138"/>
  <image href="data:image/svg+xml;base64,${idme}" x="875" y="89" width="247" height="90"/>

  <text x="600" y="320" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" letter-spacing="-2.5" fill="#19324d">A Free Education</text>
  <text x="600" y="408" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" letter-spacing="-2.5" fill="#19324d">Resource</text>
  <text x="600" y="500" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#5050ff">powered by EnrollHere</text>

  <rect x="78" y="568" width="1044" height="12" rx="6" fill="url(#line)"/>
</svg>`;

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, 'assets', 'enrollhere-me-og.png'))
  .then(info => console.log(`${info.width}x${info.height} ${info.size} bytes`));
