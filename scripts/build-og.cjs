const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const enrollHere = fs.readFileSync(path.join(root, 'assets', 'enrollhere-wordmark.png')).toString('base64');
const idme = fs.readFileSync(path.join(root, 'assets', 'idme-logo-navy.svg')).toString('base64');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="headline" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#5558ff"/><stop offset=".58" stop-color="#875dff"/><stop offset="1" stop-color="#18a982"/></linearGradient>
    <radialGradient id="violetGlow"><stop stop-color="#dfe0ff" stop-opacity=".9"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
    <radialGradient id="mintGlow"><stop stop-color="#d9ffea"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
    <filter id="shadow" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="9" stdDeviation="13" flood-color="#20265c" flood-opacity=".10"/></filter>
  </defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  <circle cx="1100" cy="70" r="320" fill="url(#violetGlow)"/>
  <circle cx="65" cy="625" r="285" fill="url(#mintGlow)"/>

  <g filter="url(#shadow)"><rect x="66" y="55" width="242" height="82" rx="17" fill="#ffffff" stroke="#e4e5ed"/></g>
  <image href="data:image/png;base64,${enrollHere}" x="100" y="84" width="174" height="24"/>

  <g filter="url(#shadow)"><rect x="989" y="55" width="145" height="82" rx="17" fill="#ffffff" stroke="#e4e5ed"/></g>
  <image href="data:image/svg+xml;base64,${idme}" x="1015" y="79" width="93" height="34"/>

  <circle cx="77" cy="202" r="8" fill="#32d780"/><circle cx="77" cy="202" r="17" fill="none" stroke="#32d780" stroke-opacity=".16" stroke-width="10"/>
  <text x="105" y="211" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" letter-spacing="1.4" fill="#5558ff">FREE STEP-BY-STEP PRACTICE</text>

  <text x="66" y="327" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="800" letter-spacing="-5" fill="#0b0d18">Learn ID.me.</text>
  <text x="66" y="421" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="800" letter-spacing="-5" fill="url(#headline)">Feel ready.</text>

  <text x="66" y="476" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" fill="#0b0d18">Clear. Calm. Private.</text>
  <text x="66" y="516" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600" fill="#5d6577">No personal information collected.</text>

  <rect x="66" y="552" width="31" height="31" rx="10" fill="#e8fff1"/><text x="74" y="576" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="800" fill="#087f45">✓</text>
  <text x="112" y="576" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" fill="#5c6476">Made for first-time learners</text>
  <text x="1134" y="574" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#737b8d">Independent training • Not an ID.me sign-in</text>

  <rect y="620" width="1200" height="10" fill="url(#headline)"/>
</svg>`;

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, 'assets', 'enrollhere-me-og.png'))
  .then(info => console.log(`${info.width}x${info.height} ${info.size} bytes`));
