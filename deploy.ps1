# Script de déploiement automatique vers GitHub (PowerShell)
# Ce script commit et push le code pour déclencher le workflow CI/CD

Write-Host "🚀 Déploiement automatique vers GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si git est initialisé
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initialisation du dépôt Git..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Vérifier si le remote existe
$remotes = git remote
if ($remotes -notcontains "origin") {
    Write-Host "🔗 Configuration du remote origin..." -ForegroundColor Yellow
    $repoUrl = Read-Host "Entrez l'URL de votre dépôt GitHub (ex: https://github.com/user/repo.git)"
    git remote add origin $repoUrl
} else {
    Write-Host "✅ Remote origin déjà configuré" -ForegroundColor Green
}

# Afficher les fichiers modifiés
Write-Host ""
Write-Host "📝 Fichiers modifiés:" -ForegroundColor Cyan
git status --short

# Ajouter tous les fichiers
Write-Host ""
Write-Host "📦 Ajout de tous les fichiers..." -ForegroundColor Yellow
git add .

# Demander le message de commit
Write-Host ""
$commitMsg = Read-Host "💬 Message de commit (défaut: 'feat: add CI/CD pipeline')"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "feat: add CI/CD pipeline"
}

# Commit
Write-Host ""
Write-Host "💾 Commit des changements..." -ForegroundColor Yellow
git commit -m $commitMsg

# Push
Write-Host ""
Write-Host "🚀 Push vers GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ Déploiement terminé!" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 Vérifiez le workflow sur:" -ForegroundColor Cyan

# Extraire l'URL du repo
$originUrl = git config --get remote.origin.url
$repoPath = $originUrl -replace '.*github.com[:/](.*?)(.git)?$', '$1'
Write-Host "   https://github.com/$repoPath/actions" -ForegroundColor Blue
Write-Host ""
Write-Host "📊 N'oubliez pas de:" -ForegroundColor Yellow
Write-Host "   1. Configurer les secrets GitHub (DOCKER_USERNAME, DOCKER_PASSWORD)" -ForegroundColor White
Write-Host "   2. Prendre 2 captures d'écran d'exécutions réussies" -ForegroundColor White
Write-Host "   3. Convertir ARCHITECTURE.md en PDF pour le rendu" -ForegroundColor White
Write-Host ""

# Pause pour lire les messages
Write-Host "Appuyez sur Entrée pour fermer..." -ForegroundColor Gray
Read-Host
