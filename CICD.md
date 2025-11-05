# Configuration GitHub Actions - CI/CD

Ce document explique comment configurer et utiliser le workflow GitHub Actions pour votre application Uber Eats.

## 📋 Architecture du Workflow

Le workflow CI/CD est divisé en 6 jobs qui s'exécutent dans cet ordre :

```
Code Push → Lint Check → Tests Backend + Tests Frontend → Build Frontend + Build Docker → Deploy
```

### 1. **Lint** (Vérification du code)
- Vérifie la qualité du code backend et frontend
- Utilise ESLint pour détecter les erreurs de syntaxe
- S'exécute sur chaque push et pull request

### 2. **Test Backend**
- Démarre un service MongoDB pour les tests
- Exécute les tests unitaires du backend
- Vérifie la connexion à la base de données

### 3. **Test Frontend**
- Exécute les tests unitaires du frontend
- Vérifie la compilation des composants Vue.js

### 4. **Build Frontend**
- Compile l'application Vue.js pour la production
- Génère les fichiers statiques dans `dist/`
- Sauvegarde l'artifact pour 7 jours

### 5. **Build Docker** (uniquement sur main/master)
- Construit les images Docker backend et frontend
- Publie les images sur Docker Hub
- Utilise le cache pour accélérer les builds

### 6. **Deploy** (uniquement sur main/master)
- Déploie l'application en production
- Nécessite une configuration serveur

## 🔧 Configuration Requise

### Secrets GitHub à configurer

Allez dans **Settings → Secrets and variables → Actions** et ajoutez :

| Secret | Description | Exemple |
|--------|-------------|---------|
| `DOCKER_USERNAME` | Nom d'utilisateur Docker Hub | `monuser` |
| `DOCKER_PASSWORD` | Token d'accès Docker Hub | `dckr_pat_xxxxx` |

### Optionnel (pour le déploiement)

| Secret | Description |
|--------|-------------|
| `SSH_PRIVATE_KEY` | Clé SSH pour se connecter au serveur |
| `SERVER_HOST` | Adresse IP ou nom de domaine du serveur |
| `SERVER_USER` | Nom d'utilisateur SSH |

## 📁 Structure des Fichiers

```
.github/
└── workflows/
    └── ci-cd.yml          # Workflow principal
```

## 🚀 Déclenchement du Workflow

Le workflow se déclenche automatiquement sur :

- **Push** sur les branches : `main`, `master`, `develop`
- **Pull Request** vers : `main`, `master`

### Déclenchement manuel

Vous pouvez aussi déclencher manuellement le workflow :

1. Allez dans **Actions** sur GitHub
2. Sélectionnez le workflow **CI/CD Pipeline**
3. Cliquez sur **Run workflow**

## 📊 Visualisation

Vous pouvez voir l'état du workflow :

- Badge de status : Ajoutez ce badge dans votre README.md

```markdown
![CI/CD](https://github.com/VOTRE_USERNAME/VOTRE_REPO/workflows/CI%2FCD%20Pipeline/badge.svg)
```

## 🛠️ Scripts NPM Disponibles

### Frontend
```bash
npm run serve    # Développement
npm run build    # Production
npm run lint     # Vérification du code
npm test         # Tests (à configurer)
```

### Backend
```bash
npm start        # Production
npm run dev      # Développement avec nodemon
npm run lint     # Vérification du code
npm test         # Tests (à configurer)
```

## 🐳 Images Docker

Après un build réussi, les images sont disponibles sur Docker Hub :

```bash
# Backend
docker pull VOTRE_USERNAME/ubereats-backend:latest

# Frontend
docker pull VOTRE_USERNAME/ubereats-frontend:latest
```

## 🔄 Workflow de Développement Recommandé

1. **Créer une branche** :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```

2. **Faire vos modifications**

3. **Commit et push** :
   ```bash
   git add .
   git commit -m "feat: ajout de ma fonctionnalité"
   git push origin feature/ma-fonctionnalite
   ```

4. **Créer une Pull Request** vers `main`
   - Le workflow CI s'exécute automatiquement
   - Vérifie le lint et les tests

5. **Merger la PR** :
   - Le workflow complet s'exécute (avec build Docker)
   - Déploiement automatique en production

## 🚨 Troubleshooting

### Le workflow échoue au lint
```bash
# Corriger localement
npm run lint -- --fix

# Commit et push
git add .
git commit -m "fix: correction lint"
git push
```

### Le build Docker échoue
- Vérifiez que Docker Hub est accessible
- Vérifiez que les secrets sont correctement configurés
- Vérifiez les logs dans l'onglet Actions

### Les tests échouent
- Exécutez les tests localement : `npm test`
- Corrigez les erreurs
- Push les corrections

## 📝 Améliorations Futures

- [ ] Ajouter des tests unitaires réels
- [ ] Ajouter des tests E2E avec Cypress
- [ ] Configurer le déploiement automatique
- [ ] Ajouter des notifications (Slack, Discord)
- [ ] Configurer les environnements de staging
- [ ] Ajouter l'analyse de sécurité (Snyk, SonarCloud)

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub](https://hub.docker.com/)
- [Vue.js Testing](https://vuejs.org/guide/scaling-up/testing.html)
- [Jest Documentation](https://jestjs.io/)
