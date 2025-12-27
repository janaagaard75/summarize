import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { summarizeWithOpenRouter } from "./summarizeWithOpenRouter.js";

const url = "https://henrikleth.com/ironman/";

const main = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  const html = await response.text();

  const dom = new JSDOM(html, { url: url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (article === null) {
    console.log(html.substring(0, 1_000));
    throw new Error(`Could not extract the content of ${url}.`);
  }

  const summary = await summarizeWithOpenRouter(
    article.textContent ?? "",
    "google/gemini-2.5-flash",
  );

  console.log(summary);
  console.log(`Character count: ${summary.length}.`);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
