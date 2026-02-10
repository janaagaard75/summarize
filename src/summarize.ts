import { getPageText } from "./getPageText.js";
import { summarizeWithOpenRouter } from "./summarizeWithOpenRouter.js";

const arg1 = process.argv[2];

const getInteger = (value: string | undefined): number | undefined => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
};

const [url, summaryLength] = (() => {
  const summaryLength = getInteger(arg1);

  if (summaryLength === undefined) {
    return [arg1, 280] as const;
  }

  return [process.argv[3], summaryLength] as const;
})();

if (url === undefined) {
  console.error("Please provide the URL of the page to summarize.");
  process.exit(1);
}

const main = async () => {
  const textContent = await getPageText(url);

  const summary = await summarizeWithOpenRouter(
    textContent,
    summaryLength,
    "google/gemini-2.5-flash",
  );

  console.log(summary);
  console.log(`Character count: ${summary.length}.`);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
