# ============================================================
# FutureFlix Frontend — Dockerfile de Producao
# ============================================================
# Stage 1: Build do React com Vite
FROM node:20-alpine AS builder

LABEL stage="builder"

WORKDIR /app

# Build arg para a URL da API (injetado em tempo de build pelo Vite)
# Em producao via proxy Nginx: /api
# Em desenvolvimento local: http://localhost:8000/api
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}

# Copia manifests de dependencias primeiro (melhor cache de layers)
COPY package*.json ./
RUN npm ci --prefer-offline

# Copia o codigo e faz o build
COPY . .
RUN npm run build

# ============================================================
# Stage 2: Servidor Nginx com o build estatico
FROM nginx:1.27-alpine

LABEL maintainer="FutureFlix Team"
LABEL description="FutureFlix React SPA servida pelo Nginx"

# Remove config padrao do nginx e usa a nossa
RUN rm -f /etc/nginx/conf.d/default.conf

# Config nginx para SPA React (com suporte a client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build estatico do stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Permissoes corretas para o nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Healthcheck para o Portainer/Docker saber se o container esta saudavel
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
