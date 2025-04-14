# Etapa 1: Compilar la aplicación Angular
FROM node:18-alpine as build

WORKDIR /usr/local/app

# Copiar archivos de dependencias primero para aprovechar caché de Docker
COPY package.json package-lock.json ./

# Instalar dependencias (incluyendo devDependencies)
RUN npm ci

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN npm run build -- --configuration=production

# Etapa 2: Servir la aplicación
FROM nginx:1.23-alpine

# Eliminar configuración por defecto de nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copiar nuestra configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /usr/local/app/dist/mf-user /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
