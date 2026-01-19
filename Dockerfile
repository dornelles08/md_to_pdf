# Usa a imagem oficial do Bun
FROM oven/bun:1

# Instala o Chromium e as dependências necessárias
# Isso é necessário porque o Bun é leve e não traz libs gráficas
RUN apt-get update && apt-get install -y \
  chromium \
  fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst-one fonts-freefont-ttf \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Define variáveis de ambiente para o Puppeteer
# 1. Pula o download do Chromium pelo script de instalação (já instalamos via apt)
# 2. Diz ao Puppeteer onde está o executável do Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Copia e instala dependências
COPY package.json ./
RUN bun install

# Copia o código
COPY src ./src

EXPOSE 3000

CMD ["bun", "src/server.ts"]
