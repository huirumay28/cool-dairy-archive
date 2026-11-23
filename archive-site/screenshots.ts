import { chromium } from 'playwright';

const pages = [
  { name: 'home', url: 'http://localhost:3000' },
  { name: 'icons', url: 'http://localhost:3000/icons' },
  { name: 'tavi-gevinson', url: 'http://localhost:3000/icons/tavi-gevinson' },
  { name: 'olivia-rodrigo', url: 'http://localhost:3000/icons/olivia-rodrigo' },
  { name: 'moment-virginia-woolf', url: 'http://localhost:3000/moments/virginia-woolf-dreadnought-1910' },
];

const viewports = [
  { name: 'desktop', width: 1280, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  for (const viewport of viewports) {
    for (const page of pages) {
      const browserPage = await context.newPage();
      await browserPage.setViewportSize({ width: viewport.width, height: viewport.height });
      
      console.log(`Capturing ${page.name} at ${viewport.name}...`);
      await browserPage.goto(page.url, { waitUntil: 'networkidle' });
      await browserPage.waitForTimeout(1000); // Extra wait for any animations
      
      const filename = `/opt/cursor/artifacts/${page.name}-${viewport.name}.png`;
      await browserPage.screenshot({ path: filename, fullPage: true });
      console.log(`✓ Saved ${filename}`);
      
      await browserPage.close();
    }
  }
  
  await browser.close();
  console.log('\nAll screenshots captured!');
})();
