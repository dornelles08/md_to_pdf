import markdownIt from "markdown-it";
import markdownItTaskLists from "markdown-it-task-lists";
import markdownItFootnote from "markdown-it-footnote";

export const md = markdownIt({
  html: true,
  linkify: true,
  breaks: true,
})
  .use(markdownItTaskLists, { enabled: true, label: true })
  .use(markdownItFootnote);
