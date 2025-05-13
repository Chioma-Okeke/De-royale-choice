// import puppeteer from 'puppeteer';

// export const generatePDF = async (html: string): Promise<Buffer> => {
//   const browser = await puppeteer.launch({ headless: 'new' });
//   const page = await browser.newPage();
//   await page.setContent(html, { waitUntil: 'networkidle0' });
//   const buffer = await page.pdf({ format: 'A4' });
//   await browser.close();
//   return buffer;
// };
