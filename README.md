# MarkDocument — Conversor Markdown para PDF

Conversor de documentos Markdown para PDF com interface web elegante e API REST. Desenvolvido com Bun, Express e Puppeteer.

![Preview](https://img.shields.io/badge/Bun-1.3.6-black?logo=bun)
![License](https://img.shields.io/badge/License-MIT-green)

## Recursos

- 📝 **Editor Markdown** com preview em tempo real
- 📄 **Upload de arquivos** .md, .markdown, .txt
- ✅ **Suporte a task lists** e notas de rodapé
- 🎨 **Estilo editorial** no PDF gerado
- ⚡ **API REST** para integração
- 🐳 **Docker ready** para deploy

## Quick Start

### Docker (Recomendado)

```bash
# Build e execução
docker-compose up -d

# Acesse em http://localhost:3000
```

### Desenvolvimento Local

```bash
# Instalação
bun install

# Execução
bun run start

# Acesse em http://localhost:3000
```

## Interface Web

Acesse `http://localhost:3000` para usar a interface:

1. Digite ou cole seu Markdown no editor
2. Visualize o preview em tempo real
3. Clique em "Gerar PDF" para baixar

Também é possível carregar arquivos `.md` via botão "Carregar arquivo".

## API REST

### `POST /convert`

Converte Markdown para PDF.

**Headers:**
```
Content-Type: multipart/form-data
```

**Body (form-data):**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `markdown` | string | Conteúdo Markdown (texto) |
| `file` | file | Arquivo .md/.txt (alternativo) |

**Response:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="documento.pdf"
```

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:3000/convert \
  -F "markdown=# Título\n\nConteúdo em **negrito**."
```

---

### `POST /preview`

Gera preview HTML do Markdown (para integração customizada).

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "markdown": "# Título\n\nConteúdo..."
}
```

**Response:**
```json
{
  "html": "<h1>Título</h1><p>Conteúdo...</p>"
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/preview \
  -H "Content-Type: application/json" \
  -d '{"markdown": "# Hello World"}'
```

## Configuração

### Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|---------|-----------|
| `PORT` | `3000` | Porta do servidor |
| `PUPPETEER_EXECUTABLE_PATH` | — | Caminho para Chromium (Docker: `/usr/bin/chromium`) |

### Docker Compose

```yaml
services:
  md-to-pdf:
    ports:
      - "3000:3000"
    environment:
      - PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
    volumes:
      - ./src:/app/src  # hot-reload durante desenvolvimento
```

## Markdown Suportado

O conversor suporta:

- **Títulos** — `#` até `######`
- **Negrito/Itálico** — `**bold**`, `*italic*`
- **Código inline** — `` `code` ``
- **Blocos de código** — ``` ```lang ```
- **Listas** — `- item` ou `1. item`
- **Task lists** — `- [ ] tarefa`
- **Tabelas** — sintaxe padrão
- **Notas de rodapé** — `[^1]`
- **Links e imagens** — `[text](url)`
- **Blockquotes** — `> citação`
- **HTML inline** — tags raw permitidas

## Stack Técnica

- **Runtime:** [Bun](https://bun.sh) v1.3+
- **Servidor:** Express.js v5
- **Markdown:** markdown-it + plugins
- **PDF:** Puppeteer (Chromium headless)
- **Fonts:** Cormorant Garamond, DM Sans, JetBrains Mono

## Estrutura do Projeto

```
md_to_pdf/
├── src/
│   ├── routes/
│   │   ├── convert.ts    # Endpoint de conversão PDF
│   │   ├── home.ts       # Interface web
│   │   └── preview.ts    # Endpoint de preview
│   ├── lib/
│   │   └── markdownIt.ts # Configuração markdown-it
│   └── server.ts         # Servidor principal
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## Limites

- **Tamanho máximo:** 500KB por documento
- **Timeout:** ~30s para conversão

## Licença

MIT © 2024
