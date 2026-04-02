# front_end_future_flix

Estrutura inicial em React com Vite, Docker e pipelines de CI/CD no GitHub Actions.

## Requisitos

- Node.js 20+
- npm 10+
- Docker (opcional)

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Docker

Build da imagem:

```bash
docker build -t future-flix-frontend .
```

Executar container:

```bash
docker run --rm -p 8080:80 future-flix-frontend
```

Ou com Compose:

```bash
docker compose up --build
```

## CI/CD

- CI: instala dependências e gera build a cada push/PR.
- CD: em push na branch `main`, gera e publica imagem Docker no GHCR.