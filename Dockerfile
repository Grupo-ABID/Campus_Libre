# Etapa 1: Build de Angular
FROM node:20-alpine AS build

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json y demás archivos necesarios
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar el proyecto Angular
RUN ng build --configuration=production

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Copiar los archivos compilados desde la etapa de build
COPY --from=build /app/dist/campus-libre/browser/ /usr/share/nginx/html

# Elimina configuración default y copia la tuya (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
