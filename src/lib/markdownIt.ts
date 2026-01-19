import markdownIt from "markdown-it";

export const md = markdownIt({
  html: true, // Permite tags HTML dentro do Markdown
  linkify: true, // Transforma URLs em links automaticamente
  breaks: true, // Transforma quebras de linha (enter) em <br>
});
