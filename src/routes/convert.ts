import type { Request, Response } from "express";
import puppeteer from "puppeteer-core";
import { md } from "../lib/markdownIt";

const MAX_MARKDOWN_SIZE = 500 * 1024; // 500KB

function sanitizeMarkdown(input: string): string {
  const dummy = document.createElement('div');
  dummy.textContent = input;
  return dummy.innerHTML;
}

function validateInput(markdown: string): string | null {
  if (!markdown || typeof markdown !== "string") {
    return "Nenhum texto Markdown fornecido.";
  }
  if (markdown.length > MAX_MARKDOWN_SIZE) {
    return `Texto muito grande. Limite: ${MAX_MARKDOWN_SIZE / 1024}KB`;
  }
  return null;
}

export async function convert(req: Request, res: Response) {
  try {
    let markdownText = "";

    if (req.file) {
      markdownText = req.file.buffer.toString("utf-8");
    } else if (req.body.markdown) {
      markdownText = req.body.markdown.toString();
    }

    const validationError = validateInput(markdownText);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const htmlContent = md.render(markdownText);

    const finalHtml = `
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 12px; padding: 40px; line-height: 1.5; color: #24292e; }
            
            /* Títulos */
            h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: .3em; margin-top: 24px; }
            h1 { font-size: 2em; }
            h2 { font-size: 1.5em; }
            
            /* Tabelas (Estilo GitHub) */
            table { border-collapse: collapse; width: 100%; margin-bottom: 16px; display: table; }
            th, td { border: 1px solid #dfe2e5; padding: 6px 13px; font-size: 10px; line-height: 1.2; }
            th { background-color: #f6f8fa; font-weight: 600; }
            tr:nth-child(2n) { background-color: #f8f8f8; }
            
            /* Código e Blocos */
            code { background-color: rgba(27,31,35,.05); padding: .2em .4em; border-radius: 3px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; font-size: 85%; }
            pre { background-color: #f6f8fa; padding: 16px; overflow: auto; border-radius: 3px; line-height: 1.45; }
            pre code { background-color: transparent; padding: 0; font-size: 100%; }
            blockquote { border-left: .25em solid #dfe2e5; color: #6a737d; padding: 0 1em; margin: 0 0 16px 0; }
            
            /* Task Lists */
            .task-list-item { list-style-type: none; margin-left: -20px; }
            .task-list-item input { margin-right: 8px; }
            
            /* Footnotes */
            .footnote-ref { font-size: 0.75em; vertical-align: super; }
            .footnotes { margin-top: 24px; border-top: 1px solid #eaecef; padding-top: 12px; font-size: 0.85em; }
            .footnotes-list { padding-left: 16px; }
            
            /* Outros */
            img { max-width: 100%; box-sizing: content-box; background-color: #fff; }
            a { color: #0366d6; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `;

    // Lança o navegador
    // IMPORTANTE: executablePath aponta para onde o Chromium está no Docker ou no seu PC
    const browser = await puppeteer.launch({
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH ||
        "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(finalHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "20mm", right: "20mm" },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition": 'attachment; filename="documento.pdf"',
    });

    res.send(pdfBuffer);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error?.message || "Erro interno" });
  }
}
