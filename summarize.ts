import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const url = "https://henrikleth.com/ironman/";

async function main() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the webpage: ${response.statusText}.`);
  }

  const html = await response.text();

  const dom = new JSDOM(html, { url: url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (article === null) {
    console.error("Readability could not extract an article from the page.");
    console.log(html.substring(0, 1_000));
    return;
  }

  console.log("Successfully extracted by Readability:\n");
  console.log(article.title);
  console.log();
  console.log(article.textContent?.substring(0, 1_000));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

export {};
