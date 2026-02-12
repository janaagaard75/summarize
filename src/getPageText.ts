import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getHtmlContent } from "./getHtmlContent";

puppeteerExtra.use(StealthPlugin());

export const getPageText = async (url: string): Promise<string> => {
  const htmlContent = await getHtmlContent(url);

  const dom = new JSDOM(htmlContent, { url: url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  const textContent = article?.textContent?.trim();

  if (textContent === undefined || textContent === "") {
    throw new Error(`Could not extract the content of ${url}.`);
  }

  return textContent;
};
