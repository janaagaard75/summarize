# :memo::scissors: Summarize

The `summarize` script returns a summary of the URL provided as a parameter.

Extracting the html content of a web page is done with [Puppeteer](https://pptr.dev/). [Readability](https://github.com/mozilla/readability) is then used to extract the main content. Finally the summary is created with [Gemini 2.5 Flash](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash) called through [OpenRouter](https://openrouter.ai/).

Example

```text
$ ./summarize 300 https://react.dev/learn/you-might-not-need-an-effect
Character counts: 33560 -> 288.
React Effects synchronize components with external systems. Avoid unnecessary Effects for data transformation, user events, or state adjustments to improve code clarity and performance. Use Effects primarily for synchronization with external systems and data fetching with proper cleanup.
```

## Run commands

`bun run build`: Build a standalone executable.
`bun run summarize <limit> <url>`: Run the summarize script with the provided character limit and URL as parameters.
