import type { Request, Response } from "express";
import { md } from "../lib/markdownIt";

const MAX_PREVIEW_SIZE = 500 * 1024;

export async function preview(req: Request, res: Response) {
  try {
    const markdownText = (req.body.markdown || "").toString();

    if (!markdownText || markdownText.length > MAX_PREVIEW_SIZE) {
      return res.status(400).json({ error: "Texto inválido ou muito grande" });
    }

    const htmlContent = md.render(markdownText);

    res.json({ html: htmlContent });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error?.message || "Erro interno" });
  }
}
