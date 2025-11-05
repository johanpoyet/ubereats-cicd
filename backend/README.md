# UberEats Clone - Backend API

Backend API pour le clone UberEats avec Node.js, Express et MongoDB.

## Installation

1. Installer les dépendances :
```bash
cd backend
npm install
```

2. Créer un fichier `.env` (un exemple existe déjà) :
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ubereats
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

3. Installer MongoDB localement ou utiliser MongoDB Atlas

4. Peupler la base de données avec des données de test :
```bash
node seed.js
```

5. Lancer le serveur :
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:5000`

## Routes API

### Authentication
- `POST /api/auth/register` - Créer un nouveau compte
- `POST /api/auth/login` - Se connecter

### Restaurants
- `GET /api/restaurants` - Obtenir tous les restaurants
- `GET /api/restaurants/:id` - Obtenir un restaurant par ID
- `POST /api/restaurants` - Créer un restaurant (Admin)
- `PUT /api/restaurants/:id` - Mettre à jour un restaurant (Admin)
- `DELETE /api/restaurants/:id` - Supprimer un restaurant (Admin)

### Orders
- `GET /api/orders` - Obtenir toutes les commandes de l'utilisateur (Auth)
- `GET /api/orders/:id` - Obtenir une commande par ID (Auth)
- `POST /api/orders` - Créer une nouvelle commande (Auth)
- `PUT /api/orders/:id` - Mettre à jour le statut d'une commande (Auth)

### Users
- `GET /api/users/me` - Obtenir le profil utilisateur (Auth)
- `PUT /api/users/me` - Mettre à jour le profil utilisateur (Auth)

## Modèles de données

### User
- name, email, password, phone, address, role (user/admin/restaurant)

### Restaurant
- name, description, cuisine, image, rating, reviews, deliveryTime, deliveryFee, address, menu, badge, promo

### Order
- user, restaurant, items, totalAmount, deliveryFee, deliveryAddress, status, paymentMethod

## Sécurité

- Les mots de passe sont hashés avec bcrypt
- Authentication JWT avec token valide 7 jours
- Middleware d'authentification pour les routes protégées
