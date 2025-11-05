# Étape 1: Build de l'application Vue.js
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer toutes les dépendances (y compris devDependencies) avec legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Étape 2: Servir avec nginx
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
