# 🚗 Plataforma de Gestão de Frotas - Backend

API REST desenvolvida em NestJS para gerenciamento de frotas de veículos. A aplicação permite realizar operações CRUD completas sobre veículos, com validações robustas e arquitetura limpa seguindo os princípios de Clean Architecture e Domain-Driven Design (DDD).

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando a Aplicação](#-executando-a-aplicação)
- [Docker](#-docker)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testes](#-testes)
- [Scripts Disponíveis](#-scripts-disponíveis)

## ✨ Características

- ✅ CRUD completo de veículos
- ✅ Validação de dados com `class-validator`
- ✅ Arquitetura Clean/Hexagonal
- ✅ Domain-Driven Design (DDD)
- ✅ Value Objects para garantir integridade dos dados
- ✅ Tratamento de exceções customizado
- ✅ Testes unitários e de integração
- ✅ Docker e Docker Compose configurados
- ✅ Persistência em arquivo JSON

## 🛠 Tecnologias

- **Node.js** 24
- **NestJS** 11 - Framework Node.js progressivo
- **TypeScript** 5.7
- **pnpm** - Gerenciador de pacotes rápido e eficiente
- **class-validator** - Validação de DTOs
- **class-transformer** - Transformação de objetos
- **Jest** - Framework de testes
- **Docker** - Containerização
- **ESLint** + **Prettier** - Linting e formatação de código

## 🏗 Arquitetura

A aplicação segue os princípios de **Clean Architecture** e **DDD**, organizando o código em camadas bem definidas:

```
src/modules/vehicles/
├── domain/              # Camada de Domínio
│   ├── entities/        # Entidades de negócio
│   ├── value-objects/   # Objetos de valor (VIN, Placa, RENAVAM, etc.)
│   └── repositories/    # Interfaces de repositório
├── application/         # Camada de Aplicação
│   ├── use-cases/       # Casos de uso (Create, Get, List, Update, Delete)
│   └── exceptions/      # Exceções de domínio
└── infrastructure/      # Camada de Infraestrutura
    ├── http/            # Controllers, DTOs, Mappers, Filters
    └── persistence/     # Implementação de repositórios (File-based)
```

### Camadas

- **Domain**: Contém as regras de negócio puras, entidades e value objects
- **Application**: Contém os casos de uso e orquestração da lógica de negócio
- **Infrastructure**: Implementações concretas (HTTP, persistência, etc.)

## 📦 Pré-requisitos

- Node.js 24 ou superior
- pnpm 8 ou superior
- Docker e Docker Compose (opcional, para execução via containers)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd fleet-management-platform
```

2. Instale as dependências:
```bash
pnpm install
```

## ▶️ Executando a Aplicação

### Modo Desenvolvimento

```bash
pnpm start:dev
```

A aplicação estará disponível em `http://localhost:3000`

### Modo Produção

```bash
# Build
pnpm build

# Executar
pnpm start:prod
```

### Modo Debug

```bash
pnpm start:debug
```

## 🐳 Docker

### Build da Imagem

```bash
docker build -t fleet-management-backend .
```

### Executar com Docker Compose

```bash
docker-compose up -d
```

A aplicação estará disponível em `http://localhost:3000` (ou na porta configurada pela variável `PORT`)

### Parar os Containers

```bash
docker-compose down
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints Disponíveis

#### 1. Criar Veículo
```http
POST /vehicles
Content-Type: application/json

{
  "licensePlate": "ABC1234",
  "vin": "1HGBH41JXMN109186",
  "renavam": "12345678901",
  "model": "Civic",
  "make": "Honda",
  "modelYear": 2023
}
```

**Resposta:** `201 Created`
```json
{
  "id": "uuid-do-veiculo",
  "licensePlate": "ABC1234",
  "vin": "1HGBH41JXMN109186",
  "renavam": "12345678901",
  "model": "Civic",
  "make": "Honda",
  "modelYear": 2023
}
```

#### 2. Listar Todos os Veículos
```http
GET /vehicles
```

**Resposta:** `200 OK`
```json
[
  {
    "id": "uuid-1",
    "licensePlate": "ABC1234",
    "vin": "1HGBH41JXMN109186",
    "renavam": "12345678901",
    "model": "Civic",
    "make": "Honda",
    "modelYear": 2023
  },
  ...
]
```

#### 3. Buscar Veículo por ID
```http
GET /vehicles/:id
```

**Resposta:** `200 OK`
```json
{
  "id": "uuid-do-veiculo",
  "licensePlate": "ABC1234",
  "vin": "1HGBH41JXMN109186",
  "renavam": "12345678901",
  "model": "Civic",
  "make": "Honda",
  "modelYear": 2023
}
```

#### 4. Atualizar Veículo
```http
PUT /vehicles/:id
Content-Type: application/json

{
  "licensePlate": "XYZ9876",
  "vin": "1HGBH41JXMN109186",
  "renavam": "12345678901",
  "model": "Civic",
  "make": "Honda",
  "modelYear": 2024
}
```

**Resposta:** `200 OK`
```json
{
  "id": "uuid-do-veiculo",
  "licensePlate": "XYZ9876",
  "vin": "1HGBH41JXMN109186",
  "renavam": "12345678901",
  "model": "Civic",
  "make": "Honda",
  "modelYear": 2024
}
```

#### 5. Deletar Veículo
```http
DELETE /vehicles/:id
```

**Resposta:** `204 No Content`

### Validações

- **licensePlate**: String, 7-10 caracteres, obrigatório
- **vin**: String, exatamente 17 caracteres, obrigatório
- **renavam**: String, 9-11 caracteres, obrigatório
- **model**: String, 1-100 caracteres, obrigatório
- **make**: String, 1-100 caracteres, obrigatório
- **modelYear**: Número inteiro, entre 1900 e 2100, obrigatório

### Exceções

- `400 Bad Request`: Dados inválidos ou faltando
- `404 Not Found`: Veículo não encontrado
- `409 Conflict`: Veículo duplicado (placa, VIN ou RENAVAM já existentes)

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── modules/
│   │   └── vehicles/
│   │       ├── domain/              # Camada de domínio
│   │       │   ├── entities/        # VehicleEntity
│   │       │   ├── value-objects/   # VIN, LicensePlate, RENAVAM, etc.
│   │       │   └── repositories/    # IVehicleRepository (interface)
│   │       ├── application/         # Camada de aplicação
│   │       │   ├── use-cases/       # Casos de uso
│   │       │   └── exceptions/      # Exceções de domínio
│   │       ├── infrastructure/      # Camada de infraestrutura
│   │       │   ├── http/            # Controllers, DTOs, Mappers, Filters
│   │       │   └── persistence/     # FileVehicleRepository
│   │       └── vehicles.module.ts
│   ├── app.module.ts
│   └── main.ts
├── data/
│   └── vehicles.json                # Persistência em arquivo
├── test/                            # Testes E2E
├── dist/                            # Código compilado
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testes

### Executar Todos os Testes
```bash
pnpm test
```

### Executar Testes em Modo Watch
```bash
pnpm test:watch
```

### Executar Testes com Cobertura
```bash
pnpm test:cov
```

### Executar Testes E2E
```bash
pnpm test:e2e
```

### Executar Testes em Modo Debug
```bash
pnpm test:debug
```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm build` | Compila o projeto TypeScript |
| `pnpm start` | Inicia a aplicação em modo produção |
| `pnpm start:dev` | Inicia a aplicação em modo desenvolvimento (watch) |
| `pnpm start:debug` | Inicia a aplicação em modo debug |
| `pnpm start:prod` | Executa a aplicação compilada |
| `pnpm test` | Executa os testes unitários |
| `pnpm test:watch` | Executa os testes em modo watch |
| `pnpm test:cov` | Executa os testes com cobertura |
| `pnpm test:e2e` | Executa os testes end-to-end |
| `pnpm lint` | Executa o linter e corrige problemas |
| `pnpm format` | Formata o código com Prettier |

## 🔧 Variáveis de Ambiente

A aplicação suporta as seguintes variáveis de ambiente:

- `PORT`: Porta em que a aplicação será executada (padrão: 3000)
- `NODE_ENV`: Ambiente de execução (development, production, etc.)

---

