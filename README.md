# Uber Eats Clone - Application Dockerisée

Clone de l'application Uber Eats développé avec Vue.js, Node.js/Express et MongoDB.

## 🚀 Démarrage rapide avec Docker

### Prérequis
- Docker Desktop installé
- Docker Compose installé

### Démarrage de l'application

**Windows (PowerShell) :**
```powershell
# 1. Démarrer tous les conteneurs
docker-compose up -d

# 2. Initialiser la base de données
docker-compose exec backend node seed.js
```

**Linux/Mac :**
```bash
# Utiliser le script automatique
chmod +x init-db.sh
./init-db.sh
```

### Accès à l'application

- **Frontend** : http://localhost:8080
- **Backend API** : http://localhost:5000
- **MongoDB** : localhost:27017

### Identifiants de test

- **Admin** : `admin@ubereats.com` / `admin123`
- **Utilisateur** : `john@example.com` / `password123`

## 📦 Architecture Docker

L'application est composée de 3 services :

1. **frontend** : Application Vue.js servie par Nginx (port 8080)
2. **backend** : API Node.js/Express (port 5000)
3. **mongodb** : Base de données MongoDB (port 27017)

## 🛠️ Commandes Docker utiles

```bash
# Démarrer l'application
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend

# Arrêter l'application
docker-compose down

# Arrêter et supprimer les volumes (supprime la base de données)
docker-compose down -v

# Reconstruire les images
docker-compose build

# Redémarrer un service
docker-compose restart backend
```

## 🔧 Développement local (sans Docker)

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run serve
```

### MongoDB

Assurez-vous que MongoDB est installé et en cours d'exécution localement.

```bash
# Initialiser la base de données
cd backend
node seed.js
```

## 📝 Fonctionnalités

- ✅ Authentification JWT
- ✅ Liste des restaurants
- ✅ Détail d'un restaurant avec menu
- ✅ Panier d'achat
- ✅ Gestion des quantités
- ✅ Calcul automatique du total (sous-total + frais de livraison + taxes)
- ✅ Design responsive inspiré d'Uber Eats

## 🏗️ Technologies utilisées

### Frontend
- Vue.js 2.6
- Vuetify 2.6
- Vue Router 3
- Vuex 3
- Axios

### Backend
- Node.js
- Express 4
- MongoDB avec Mongoose
- JWT pour l'authentification
- bcryptjs pour le hashage des mots de passe

## 📂 Structure du projet

```
app-vue2/
├── src/                    # Code source frontend
│   ├── components/         # Composants Vue
│   ├── router/            # Configuration du routeur
│   ├── store/             # Store Vuex
│   └── services/          # Services API
├── backend/               # Code source backend
│   ├── models/           # Modèles Mongoose
│   ├── routes/           # Routes Express
│   ├── middleware/       # Middlewares
│   └── config/           # Configuration
├── docker-compose.yml    # Configuration Docker Compose
├── Dockerfile           # Dockerfile frontend
└── backend/Dockerfile   # Dockerfile backend
```

## 🔐 Variables d'environnement

Le fichier `backend/.env` contient les variables d'environnement :

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ubereats
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

⚠️ **Important** : Changez `JWT_SECRET` en production !

## 🐛 Dépannage

### Les conteneurs ne démarrent pas
```bash
# Vérifier les logs
docker-compose logs

# Vérifier l'état des conteneurs
docker-compose ps
```

### La base de données est vide
```bash
# Réinitialiser la base de données
docker-compose exec backend node seed.js
```

### Erreur de connexion au backend
Assurez-vous que le backend est démarré :
```bash
docker-compose logs backend
```

## 📄 Licence

MIT
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
