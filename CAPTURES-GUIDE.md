# Guide pour Capturer les Exécutions du Workflow CI/CD

Ce document explique comment capturer les exécutions réussies du workflow GitHub Actions pour le TP.

## 📸 Captures d'écran requises

Selon le TP, vous devez fournir **2 captures d'écran d'exécutions réussies** du workflow.

### Où trouver les workflows ?

1. Allez sur votre dépôt GitHub : https://github.com/johanpoyet/ubereats-cicd
2. Cliquez sur l'onglet **"Actions"**
3. Vous verrez la liste de toutes les exécutions du workflow

## 🎯 Ce qu'il faut capturer

### Capture 1 : Vue d'ensemble du workflow

**Que montrer :**
- Liste des exécutions avec statut ✅ (vert)
- Au moins 2 exécutions réussies visibles
- Horodatage de chaque exécution
- Nom de la branche (main/master)

**Comment faire :**
1. Allez dans l'onglet **Actions**
2. Assurez-vous que plusieurs workflows sont visibles
3. Prenez une capture d'écran complète de la page

**Exemple de ce qui doit être visible :**
```
✅ CI/CD Pipeline - Commit message 1 - main - 5 minutes ago
✅ CI/CD Pipeline - Commit message 2 - main - 1 hour ago
✅ CI/CD Pipeline - Commit message 3 - main - 2 hours ago
```

---

### Capture 2 : Détails d'une exécution complète

**Que montrer :**
- Tous les jobs du workflow (8 jobs au total)
- Statut ✅ pour chaque job
- Durée d'exécution de chaque job
- Artefacts générés (frontend-build, coverage reports)

**Comment faire :**
1. Cliquez sur une exécution réussie
2. Attendez que la page charge tous les détails
3. Faites défiler pour voir tous les jobs
4. Prenez une capture d'écran complète

**Jobs qui doivent être visibles :**
```
✅ Lint Code                    (45s)
✅ Security Audit               (30s)
✅ Test Backend                 (1m 20s)
✅ Test Frontend                (50s)
✅ Build Frontend               (1m 10s)
✅ Build Docker Images          (2m)
✅ Deploy to Production         (10s)
✅ Notify on Failure           (skipped)
```

---

## 🚀 Comment déclencher des exécutions

### Méthode 1 : Push de code

```bash
# Faites un changement mineur
echo "# Update" >> README.md

# Commit et push
git add .
git commit -m "docs: update README"
git push origin main
```

### Méthode 2 : Déclenchement manuel

1. Allez dans **Actions**
2. Sélectionnez **CI/CD Pipeline**
3. Cliquez sur **"Run workflow"**
4. Choisissez la branche **main**
5. Cliquez sur **"Run workflow"**

---

## 📋 Checklist avant de capturer

- [ ] Au moins 2 exécutions réussies visibles
- [ ] Les 8 jobs sont affichés dans le détail
- [ ] Tous les jobs ont le statut ✅
- [ ] Les artefacts sont visibles (frontend-build, coverage)
- [ ] Les durées d'exécution sont affichées
- [ ] Le badge de statut est vert dans le README
- [ ] La date et l'heure sont visibles

---

## 🎨 Outils de capture recommandés

### Windows
- **Snipping Tool** (Outil Capture d'écran)
  - Appuyez sur `Win + Shift + S`
  - Sélectionnez la zone à capturer

- **ShareX** (gratuit, avancé)
  - Télécharger : https://getsharex.com/
  - Permet des captures scrollantes

### Mac
- **Screenshot** (natif)
  - Appuyez sur `Cmd + Shift + 4`
  - Sélectionnez la zone

### Extensions navigateur
- **Awesome Screenshot**
- **Nimbus Screenshot**
- **FireShot**

---

## 📊 Exemple de rapport de couverture

Si vous voulez montrer les artefacts téléchargés :

1. Cliquez sur une exécution réussie
2. En bas de la page, section **Artifacts**
3. Vous verrez :
   - `frontend-build` (dist/ compilé)
   - `backend-coverage` (rapport de tests backend)
   - `frontend-coverage` (rapport de tests frontend)

**Capture optionnelle :** Téléchargez et montrez le contenu d'un rapport

---

## 🔍 Détails à mettre en évidence

Dans vos captures, assurez-vous que ces éléments sont **clairement visibles** :

### Sur la vue d'ensemble
- ✅ Statut de succès
- 🕒 Horodatage
- 👤 Auteur du commit
- 📝 Message de commit
- 🌿 Nom de la branche

### Sur la vue détaillée
- ⏱️ Durée totale du workflow
- 📊 Durée de chaque job
- ✅ Statut individuel de chaque job
- 🔄 Ordre d'exécution (parallèle vs séquentiel)
- 📦 Artefacts générés

---

## 💡 Astuces

### Pour des captures nettes
1. **Utilisez un navigateur en plein écran** (F11)
2. **Zoomez si nécessaire** (Ctrl + +)
3. **Attendez le chargement complet** avant de capturer
4. **Mode clair vs sombre** : Choisissez celui qui est le plus lisible

### Pour montrer le parallélisme
1. Cliquez sur le graphique de visualisation
2. GitHub Actions affiche un diagramme des jobs
3. Vous verrez clairement quels jobs s'exécutent en parallèle

**Exemple du graphique :**
```
     Lint ──┬──> Test Backend ──┬──> Build Frontend
            │                    │
            └──> Test Frontend ──┴──> Build Docker ──> Deploy
```

---

## 📝 Nommage des fichiers

Nommez vos captures de manière claire :

```
workflow_overview.png      - Vue d'ensemble avec plusieurs exécutions
workflow_details.png       - Détails d'une exécution complète
workflow_artifacts.png     - (optionnel) Liste des artefacts
workflow_logs.png          - (optionnel) Logs d'un job spécifique
```

---

## ✅ Validation finale

Avant de soumettre vos captures, vérifiez :

- [ ] Les 2 captures sont en **haute résolution** (min 1920x1080)
- [ ] Le texte est **lisible** (pas flou)
- [ ] Les statuts sont **clairement ✅ verts**
- [ ] Les **8 jobs** sont visibles dans la capture détaillée
- [ ] Les **durées** sont affichées
- [ ] Le **nom du repo** est visible (johanpoyet/ubereats-cicd)
- [ ] La **date** est récente (novembre 2025)

---

## 🎓 Pour le rendu du TP

### Fichiers à inclure

1. **Captures d'écran** (PNG ou JPG, max 5 MB chacune)
   - `workflow_overview.png`
   - `workflow_details.png`

2. **Document PDF** (1-2 pages)
   - `ARCHITECTURE.md` converti en PDF
   - Explications de vos choix architecturaux

3. **Code source**
   - `.github/workflows/ci-cd.yml`
   - `docker-compose.yml`
   - `Dockerfile` (frontend et backend)

4. **Rapport de couverture** (optionnel)
   - Téléchargé depuis les artifacts
   - Zip du dossier `coverage/`

---

## 🔗 Liens utiles

- GitHub Actions Docs : https://docs.github.com/en/actions
- Docker Hub : https://hub.docker.com/
- Votre repo : https://github.com/johanpoyet/ubereats-cicd

---

**Bon courage pour le TP ! 🚀**
