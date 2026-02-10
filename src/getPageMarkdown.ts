import puppeteer from "puppeteer";
import TurndownService from "turndown";

export const getPageMarkdown = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });

  const content = await page.content();

  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(content);

  await browser.close();
  return markdown;
};
