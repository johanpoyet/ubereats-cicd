# Multi-stage Dockerfile pour le backend Node.js

# Stage 1: Installer les dépendances (builder)
FROM node:18-alpine AS builder
WORKDIR /app

# Copier package.json et package-lock pour installer les dépendances
COPY package*.json ./

# Installer toutes les dépendances (inclut dev si nécessaire)
RUN npm ci --silent

# Copier le code source
COPY . .

# Optional: construire/transpiler si besoin (ex: TypeScript)
# RUN npm run build


# Stage 2: image finale allégée
FROM node:18-alpine AS runtime
WORKDIR /app

# Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copier uniquement les dépendances de production depuis le builder
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production --silent

# Copier le code source
COPY --from=builder /app .

# Changer la propriété des fichiers vers l'utilisateur non-root
RUN chown -R appuser:appgroup /app

USER appuser

# Exposer le port d'écoute de l'API
EXPOSE 5000

# Démarrer l'application
CMD ["node", "server.js"]
