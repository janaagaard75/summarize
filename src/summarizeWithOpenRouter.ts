import OpenAI from "openai";
import { getEnvironmentVariableValue } from "./getEnvironmentVariableValue";

export const summarizeWithOpenRouter = async (
  articleText: string,
  model: "google/gemini-2.5-flash" | "openai/gpt-4o",
): Promise<string> => {
  const openRouterApiKey = getEnvironmentVariableValue("OPEN_ROUTER_API_KEY");

  const openai = new OpenAI({
    apiKey: openRouterApiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });

  const prompt =
    "Summarize the following news article in a few sentences with a maximum of 300 characters. Avoid line breaks and markdown formatting. Maintain a neutral and informative tone, focusing on the main message without unnecessary details. Do not translate the article to English, but keep the summary in the same language as the article. It is important that the summary is at most 300 characters long. Here is the text:\n\n";

  const completion = await openai.completions.create({
    model: model,
    prompt: `${prompt}\n\n${articleText}`,
  });

  const summary = completion.choices[0]?.text.trim() ?? "";
  return summary;
};
