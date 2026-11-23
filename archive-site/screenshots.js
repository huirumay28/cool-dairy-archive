const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  const page = await context.newPage();
  
  // Homepage desktop
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/opt/cursor/artifacts/homepage-desktop.png', fullPage: true });
  
  // Moments listing
  await page.goto('http://localhost:3000/moments');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/opt/cursor/artifacts/moments-listing-desktop.png', fullPage: true });
  
  // Tavi moment detail
  await page.goto('http://localhost:3000/moments/tavi-dior-couture-hat-2010');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/opt/cursor/artifacts/tavi-hatgate-desktop.png', fullPage: true });
  
  // Angela Davis moment
  await page.goto('http://localhost:3000/moments/angela-davis-refusing-the-leather-jacket-1974');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/opt/cursor/artifacts/angela-davis-moment-desktop.png', fullPage: true });
  
  // Mobile viewport
  await context.setViewportSize({ width: 375, height: 667 });
  
  // Homepage mobile
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/opt/cursor/artifacts/homepage-mobile.png', fullPage: true });
  
  // Moments listing mobile
  await page.goto('http://localhost:3000/moments');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/opt/cursor/artifacts/moments-listing-mobile.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshots saved to /opt/cursor/artifacts/');
})();
