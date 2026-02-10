import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export const getPageText = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  const html = await response.text();

  const dom = new JSDOM(html, { url: url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  const textContent = article?.textContent?.trim();

  if (textContent === undefined || textContent === "") {
    throw new Error(`Could not extract the content of ${url}.`);
  }

  return textContent;
};
