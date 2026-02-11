import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import TurndownService from "turndown";

puppeteerExtra.use(StealthPlugin());

export const getPageMarkdown = async (url: string): Promise<string> => {
  const browser = await puppeteerExtra.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });

  const content = await page.content();

  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(content);

  await browser.close();
  return markdown;
};
