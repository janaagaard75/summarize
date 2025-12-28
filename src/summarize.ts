import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { summarizeWithOpenRouter } from "./summarizeWithOpenRouter.js";

const arg1 = process.argv[2];

const getInteger = (value: string | undefined): number | undefined => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
};

const [url, maxLength] = (() => {
  const maxLength = getInteger(arg1);

  if (maxLength === undefined) {
    return [arg1, 280] as const;
  }

  return [process.argv[3], maxLength] as const;
})();

if (url === undefined) {
  console.error("Please provide the URL of the page to summarize.");
  process.exit(1);
}

const main = async () => {
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
    console.log(html.substring(0, 1_000));
    throw new Error(`Could not extract the content of ${url}.`);
  }

  const summary = await summarizeWithOpenRouter(
    textContent,
    maxLength,
    "google/gemini-2.5-flash",
  );

  console.log(summary);
  console.log(`Character count: ${summary.length}.`);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
