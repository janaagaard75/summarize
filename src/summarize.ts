import { getPageText } from "./getPageText.js";
import { summarizeWithOpenRouter } from "./summarizeWithOpenRouter.js";
import { toInteger } from "./toInteger.js";

const summaryLength = toInteger(process.argv[2]);
if (summaryLength === undefined) {
  console.error("Please provide a valid summary length as the first argument.");
  process.exit(1);
}

const url = process.argv[3];
if (url === undefined) {
  console.error(
    "Please provide the URL of the page to summarize as the second argument.",
  );
  process.exit(1);
}

const main = async () => {
  const textContent = await getPageText(url);

  const summary = await summarizeWithOpenRouter(
    textContent,
    summaryLength,
    "google/gemini-2.5-flash",
  );

  console.log(`Character counts: ${textContent.length} -> ${summary.length}.`);
  console.log(summary);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
