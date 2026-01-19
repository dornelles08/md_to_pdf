import type { Request, Response } from "express";
import puppeteer from "puppeteer-core";
import { md } from "../lib/markdownIt";

export async function convert(req: Request, res: Response) {
  try {
    const markdownText = req.body.markdown || "";

    if (!markdownText) {
      return res.status(400).send("Nenhum texto Markdown fornecido.");
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
    res.status(500).send(error?.message);
  }
}
