# Etapa 1: Construcción de la aplicación
FROM node:20.11.1-alpine AS builder

WORKDIR /app

# Instalar pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de dependencias y luego instalarlas
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar el código fuente y construir la aplicación
COPY . .
RUN pnpm build

# Etapa 2: Servir los archivos estáticos con nginx
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar un archivo de configuración para nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]