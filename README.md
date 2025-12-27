# Summarize

The `summarize` script returns a summary of the URL provided as a parameter. Extracting the content of web page is done with [Readability](https://github.com/mozilla/readability) and the summary is created with [Gemini 2.5 Flash](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash).

Example

```bash
$ ./summarize https://react.dev/learn/you-might-not-need-an-effect
React Effects should primarily synchronize components with external systems. Avoid unnecessary Effects for data transformation, event handling, or state adjustments within React, as these can lead to inefficiencies and bugs.
Character count: 224.
```
