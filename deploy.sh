#!/bin/bash

# Script de déploiement automatique vers GitHub
# Ce script commit et push le code pour déclencher le workflow CI/CD

echo "🚀 Déploiement automatique vers GitHub"
echo "========================================"
echo ""

# Vérifier si git est initialisé
if [ ! -d ".git" ]; then
    echo "📦 Initialisation du dépôt Git..."
    git init
    git branch -M main
fi

# Vérifier si le remote existe
if ! git remote | grep -q "origin"; then
    echo "🔗 Configuration du remote origin..."
    read -p "Entrez l'URL de votre dépôt GitHub (ex: https://github.com/user/repo.git): " REPO_URL
    git remote add origin "$REPO_URL"
else
    echo "✅ Remote origin déjà configuré"
fi

# Afficher les fichiers modifiés
echo ""
echo "📝 Fichiers modifiés:"
git status --short

# Ajouter tous les fichiers
echo ""
echo "📦 Ajout de tous les fichiers..."
git add .

# Demander le message de commit
echo ""
read -p "💬 Message de commit (défaut: 'feat: add CI/CD pipeline'): " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-"feat: add CI/CD pipeline"}

# Commit
echo ""
echo "💾 Commit des changements..."
git commit -m "$COMMIT_MSG"

# Push
echo ""
echo "🚀 Push vers GitHub..."
git push -u origin main

echo ""
echo "✅ Déploiement terminé!"
echo ""
echo "🔍 Vérifiez le workflow sur:"
echo "   https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
echo ""
echo "📊 N'oubliez pas de:"
echo "   1. Configurer les secrets GitHub (DOCKER_USERNAME, DOCKER_PASSWORD)"
echo "   2. Prendre 2 captures d'écran d'exécutions réussies"
echo "   3. Convertir ARCHITECTURE.md en PDF pour le rendu"
echo ""
