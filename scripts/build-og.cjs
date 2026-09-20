const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const enrollHere = fs.readFileSync(path.join(root, 'assets', 'enrollhere-wordmark.png')).toString('base64');
const idme = fs.readFileSync(path.join(root, 'assets', 'idme-logo-navy.svg')).toString('base64');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="18" fill="#1769aa"/>

  <image href="data:image/png;base64,${enrollHere}" x="70" y="72" width="278" height="38"/>
  <text x="367" y="106" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" fill="#526579">.me</text>

  <rect x="910" y="52" width="220" height="98" rx="18" fill="#f4f8fb" stroke="#c8d9e6" stroke-width="2"/>
  <image href="data:image/svg+xml;base64,${idme}" x="950" y="76" width="140" height="51"/>

  <text x="70" y="305" font-family="Arial, Helvetica, sans-serif" font-size="94" font-weight="800" letter-spacing="-4" fill="#19324d">ID.me made</text>
  <text x="70" y="410" font-family="Arial, Helvetica, sans-serif" font-size="94" font-weight="800" letter-spacing="-4" fill="#1769aa">easier.</text>

  <rect x="70" y="472" width="750" height="92" rx="18" fill="#eaf4fb"/>
  <text x="108" y="532" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="#19324d">Free step-by-step practice.</text>

  <circle cx="1080" cy="515" r="48" fill="#e2f4e9"/>
  <text x="1080" y="534" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="800" fill="#17623f">✓</text>
</svg>`;

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, 'assets', 'enrollhere-me-og.png'))
  .then(info => console.log(`${info.width}x${info.height} ${info.size} bytes`));
