import express from "express";
import { convert } from "./routes/convert";
import { home } from "./routes/home";

const app = express();

const PORT = process.env.PORT || 3000;

// Configuração para aceitar JSON e URL-encoded grandes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rota da Interface Web
app.get("/", home);

// Rota da API
app.post("/convert", convert);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Servidor Bun rodando na porta ${PORT}`);
});
