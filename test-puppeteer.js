const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  await page.goto('http://localhost:5173/contactlist', { waitUntil: 'networkidle0' });
  
  console.log('Page loaded. Clicking delete button...');
  try {
    await page.waitForSelector('.btn-danger');
    const deleteButtons = await page.$$('.btn-danger');
    if (deleteButtons.length > 0) {
      await deleteButtons[0].click();
      await new Promise(r => setTimeout(r, 2000));
      console.log('Clicked delete button, waiting...');
      
      const bodyText = await page.evaluate(() => document.body.innerText);
      if (bodyText.includes('This is Error component')) {
        console.log('ERROR COMPONENT DETECTED ON SCREEN!');
      } else {
        console.log('No error component. Rendered successfully!');
      }
    } else {
      console.log('No delete buttons found!');
    }
  } catch(e) {
    console.log('Error during test:', e);
  }
  
  await browser.close();
})();
