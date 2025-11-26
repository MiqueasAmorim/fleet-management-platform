# Estágio 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação
RUN pnpm build

# Estágio 2: Produção
FROM node:24-alpine AS production

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Instalar apenas dependências de produção
RUN pnpm install --prod --frozen-lockfile

# Copiar arquivos compilados do estágio de build
COPY --from=builder /app/dist ./dist

# Copiar diretório de dados
COPY --from=builder /app/data ./data

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]

