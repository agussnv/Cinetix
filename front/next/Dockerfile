# Usa una imagen base ligera de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias (si hay cambios en package.json)
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Expone el puerto donde Next se ejecutará
EXPOSE 3000

# Comando para iniciar Next.js en modo desarrollo
CMD ["npm", "run", "dev"]
