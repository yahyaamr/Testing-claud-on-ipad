// Renders PNG app icons and iOS launch screens from icons/icon.svg + icons/mark.svg,
// then writes the <link rel="apple-touch-startup-image"> tags into index.html.
//
//   node scripts/generate-assets.mjs
//
// Requires Playwright (uses whatever Chromium Playwright is configured with).
import { chromium } from 'playwright';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconSvg = await readFile(path.join(root, 'icons/icon.svg'), 'utf8');
const markSvg = await readFile(path.join(root, 'icons/mark.svg'), 'utf8');
const dataUri = (svg) => 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

const BG = 'linear-gradient(#1a1a1c, #050505)';
const icons = [
  // file, size, glyph scale (fraction of canvas), rounded
  { file: 'icon-192.png', size: 192, rounded: true },
  { file: 'icon-512.png', size: 512, rounded: true },
  // iOS applies its own mask, so the touch icon must be full-bleed and opaque.
  { file: 'apple-touch-icon.png', size: 180, scale: 1 },
  // Maskable: keep the glyph inside the 80% safe zone.
  { file: 'maskable-512.png', size: 512, scale: 0.8 },
];

// Portrait CSS sizes + pixel ratios of current iPhones and iPads.
const devices = [
  [440, 956, 3], [402, 874, 3], [430, 932, 3], [393, 852, 3], [420, 912, 3],
  [390, 844, 3], [428, 926, 3], [375, 812, 3], [414, 896, 3], [414, 896, 2],
  [414, 736, 3], [375, 667, 2],
  [1032, 1376, 2], [1024, 1366, 2], [834, 1210, 2], [834, 1194, 2],
  [820, 1180, 2], [810, 1080, 2], [744, 1133, 2],
];
const isTablet = (w) => w >= 700;

const themes = {
  light: { bg: '#ffffff', fg: '#1d1d1f' },
  dark: { bg: '#000000', fg: '#f5f5f7' },
};

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

async function shoot({ width, height, scale = 1, html, out }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  await page.setContent(`<!doctype html><html><body style="margin:0">${html}</body></html>`);
  await page.screenshot({ path: out, omitBackground: true });
  await page.close();
}

for (const { file, size, rounded, scale } of icons) {
  const html = rounded
    ? `<img src="${dataUri(iconSvg)}" style="width:${size}px;height:${size}px;display:block">`
    : `<div style="width:${size}px;height:${size}px;background:${BG};display:grid;place-items:center">
         <img src="${dataUri(markSvg)}" style="width:${size * scale}px;height:${size * scale}px;display:block">
       </div>`;
  await shoot({ width: size, height: size, html, out: path.join(root, 'icons', file) });
  console.log('icon', file);
}

const splashDir = path.join(root, 'icons/splash');
await rm(splashDir, { recursive: true, force: true });
await mkdir(splashDir, { recursive: true });
const tags = [];

for (const [w, h, dpr] of devices) {
  const orientations = isTablet(w) ? [['portrait', w, h], ['landscape', h, w]] : [['portrait', w, h]];
  for (const [orientation, vw, vh] of orientations) {
    for (const [name, t] of Object.entries(themes)) {
      const file = `splash-${vw}x${vh}@${dpr}x-${name}.png`;
      const html = `
        <div style="width:${vw}px;height:${vh}px;background:${t.bg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;font-family:-apple-system,'SF Pro Display','Inter','Helvetica Neue',Arial,sans-serif">
          <img src="${dataUri(iconSvg)}" style="width:88px;height:88px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,${name === 'dark' ? 0.6 : 0.18})">
          <div style="font-size:22px;font-weight:700;letter-spacing:-0.025em;color:${t.fg}">Kernel</div>
        </div>`;
      await shoot({ width: vw, height: vh, scale: dpr, html, out: path.join(splashDir, file) });
      tags.push(
        `  <link rel="apple-touch-startup-image" href="icons/splash/${file}" media="(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: ${orientation}) and (prefers-color-scheme: ${name})">`,
      );
    }
  }
}
console.log('splash screens', tags.length);

await browser.close();

const indexPath = path.join(root, 'index.html');
const index = await readFile(indexPath, 'utf8');
const updated = index.replace(
  /( *)<!--splash:start-->[\s\S]*?<!--splash:end-->/,
  (_, indent) => `${indent}<!--splash:start-->\n${tags.join('\n')}\n${indent}<!--splash:end-->`,
);
await writeFile(indexPath, updated);
console.log('index.html updated');
