import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteerExtra.use(StealthPlugin());

export const getHtmlContent = async (url: string): Promise<string> => {
  const browser = await puppeteerExtra.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const htmlContent = await page.content();
  await browser.close();

  return htmlContent;
};
