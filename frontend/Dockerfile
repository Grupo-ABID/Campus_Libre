# Etapa 1: Build de Angular
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN ng build --configuration=production

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist/campus-libre/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar script para generar env.js al iniciar
COPY set-env.sh /docker-entrypoint.d/

# Dar permisos de ejecución al script
RUN chmod +x /docker-entrypoint.d/set-env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
