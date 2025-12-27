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

  // Using value slightly below 300 to account for any minor discrepancies in character counting.
  const maxLength = 280;

  const completion = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: "system",
        content: `You are a concise news summarizer. IMPORTANT: Your response must be EXACTLY under ${maxLength} characters. No exceptions.`,
      },
      {
        role: "user",
        content: `Summarize this news article in 1-2 sentences. Maximum ${maxLength} characters. No line breaks, no markdown. Neutral tone. Same language as the article.\n\nArticle:\n${articleText}`,
      },
    ],
    temperature: 0.5,
  });

  const summary = completion.choices[0]?.message.content?.trim() ?? "";
  return summary;
};
