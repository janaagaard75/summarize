const webpageUrl = "https://henrikleth.com/ironman/";

const response = await fetch(webpageUrl);
if (!response.ok) {
  throw new Error(`Failed to fetch the webpage: ${response.statusText}.`);
}

const content = await response.text();
console.log(content);

export {};
