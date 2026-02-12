import TurndownService from "turndown";
import { getHtmlContent } from "./getHtmlContent";

export const getPageMarkdown = async (url: string): Promise<string> => {
  const htmlContent = await getHtmlContent(url);
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(htmlContent);

  return markdown;
};
