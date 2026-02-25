import express from "express";
import multer from "multer";
import { convert } from "./routes/convert";
import { home } from "./routes/home";
import { preview } from "./routes/preview";

const app = express();
const upload = multer({ limits: { fileSize: 500 * 1024 } });

const PORT = process.env.PORT || 3000;

// Configuração para aceitar JSON e URL-encoded grandes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rota da Interface Web
app.get("/", home);

// Rota de Preview
app.post("/preview", preview);

// Rota da API
app.post("/convert", upload.single("file"), convert);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Servidor Bun rodando na porta ${PORT}`);
});
