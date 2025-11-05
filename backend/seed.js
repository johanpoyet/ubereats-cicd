const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant');
const User = require('./models/User');

dotenv.config();

const restaurants = [
  {
    name: 'Carrefour XL',
    description: 'Supermarché avec livraison rapide',
    cuisine: 'Courses',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=180&fit=crop',
    rating: 4.0,
    reviews: '1,500+',
    deliveryTime: '43 min',
    deliveryFee: '4.99 €',
    deliveryInfo: 'Frais de livraison',
    badge: 'Des articles en promotion',
    address: {
      street: '123 Avenue des Courses',
      city: 'Paris',
      postalCode: '75001'
    },
    menu: [
      { name: 'Pain frais', description: 'Pain de campagne', price: 1.50, category: 'Boulangerie' },
      { name: 'Fromage', description: 'Camembert AOP', price: 3.20, category: 'Produits laitiers' }
    ]
  },
  {
    name: 'Chamas Tacos',
    description: 'Tacos mexicains authentiques',
    cuisine: 'Mexicain',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=180&fit=crop',
    rating: 4.5,
    reviews: '3,000+',
    deliveryTime: '23 min',
    deliveryFee: '3.99 €',
    badge: 'Article gratuit (commande sup à 15 €)',
    promo: '1 € d\'avantage',
    address: {
      street: '45 Rue des Tacos',
      city: 'Paris',
      postalCode: '75002'
    },
    menu: [
      { name: 'Tacos Poulet', description: 'Tacos avec poulet grillé', price: 8.50, category: 'Tacos' },
      { name: 'Tacos Boeuf', description: 'Tacos avec boeuf épicé', price: 9.50, category: 'Tacos' },
      { name: 'Burrito', description: 'Burrito californien', price: 10.00, category: 'Burritos' }
    ]
  },
  {
    name: 'iStrada Ristorante',
    description: 'Restaurant italien traditionnel',
    cuisine: 'Italien',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=180&fit=crop',
    rating: 4.4,
    reviews: '2,000+',
    deliveryTime: '40 min',
    deliveryFee: '5.49 €',
    address: {
      street: '78 Boulevard Italien',
      city: 'Paris',
      postalCode: '75003'
    },
    menu: [
      { name: 'Pizza Margherita', description: 'Tomate, mozzarella, basilic', price: 12.00, category: 'Pizza' },
      { name: 'Pasta Carbonara', description: 'Pâtes à la carbonara', price: 14.50, category: 'Pasta' },
      { name: 'Tiramisu', description: 'Dessert italien classique', price: 6.50, category: 'Desserts' }
    ]
  },
  {
    name: 'Chez BABA',
    description: 'Cuisine orientale et méditerranéenne',
    cuisine: 'Oriental',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=180&fit=crop',
    rating: 4.1,
    reviews: '61',
    deliveryTime: '48 min',
    deliveryFee: '5.49 €',
    badge: '3 offres disponibles',
    promo: '1 € d\'avantage',
    address: {
      street: '12 Rue de l\'Orient',
      city: 'Paris',
      postalCode: '75004'
    },
    menu: [
      { name: 'Couscous Royal', description: 'Couscous avec viandes variées', price: 16.00, category: 'Plats' },
      { name: 'Tajine Poulet', description: 'Tajine aux olives et citron', price: 15.00, category: 'Plats' }
    ]
  },
  {
    name: 'Pizza Palace',
    description: 'Pizzas cuites au feu de bois',
    cuisine: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=180&fit=crop',
    rating: 4.3,
    reviews: '850',
    deliveryTime: '25 min',
    deliveryFee: '2.50 €',
    address: {
      street: '56 Avenue des Pizzas',
      city: 'Paris',
      postalCode: '75005'
    },
    menu: [
      { name: 'Pizza Reine', description: 'Jambon, champignons, fromage', price: 13.00, category: 'Pizza' },
      { name: 'Pizza 4 Fromages', description: '4 fromages fondants', price: 14.00, category: 'Pizza' }
    ]
  },
  {
    name: 'Sushi Roll',
    description: 'Sushi frais et sashimi',
    cuisine: 'Japonais',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=180&fit=crop',
    rating: 4.6,
    reviews: '1,200',
    deliveryTime: '35 min',
    deliveryFee: '3.00 €',
    address: {
      street: '89 Rue du Japon',
      city: 'Paris',
      postalCode: '75006'
    },
    menu: [
      { name: 'Menu Sushi 12 pièces', description: 'Assortiment de sushis', price: 18.00, category: 'Sushi' },
      { name: 'Sashimi Saumon', description: '8 tranches de saumon frais', price: 15.00, category: 'Sashimi' }
    ]
  },
  {
    name: 'Le Burger',
    description: 'Burgers gourmets',
    cuisine: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=180&fit=crop',
    rating: 4.2,
    reviews: '920',
    deliveryTime: '20 min',
    deliveryFee: '1.50 €',
    address: {
      street: '34 Place du Burger',
      city: 'Paris',
      postalCode: '75007'
    },
    menu: [
      { name: 'Classic Burger', description: 'Burger classique avec frites', price: 11.50, category: 'Burgers' },
      { name: 'Bacon Burger', description: 'Burger avec bacon croustillant', price: 13.00, category: 'Burgers' }
    ]
  },
  {
    name: 'Wok Express',
    description: 'Cuisine asiatique au wok',
    cuisine: 'Asiatique',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=180&fit=crop',
    rating: 4.4,
    reviews: '1,800',
    deliveryTime: '30 min',
    deliveryFee: '4.00 €',
    address: {
      street: '67 Rue de l\'Asie',
      city: 'Paris',
      postalCode: '75008'
    },
    menu: [
      { name: 'Pad Thai', description: 'Nouilles sautées thaï', price: 12.50, category: 'Nouilles' },
      { name: 'Bo Bun', description: 'Salade vietnamienne', price: 11.00, category: 'Salades' }
    ]
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@ubereats.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+33612345678',
    address: {
      street: '123 Rue Example',
      city: 'Paris',
      postalCode: '75001'
    }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected');

    // Clear existing data
    await Restaurant.deleteMany({});
    await User.deleteMany({});

    console.log('Existing data cleared');

    // Insert restaurants
    await Restaurant.insertMany(restaurants);
    console.log('Restaurants seeded');

    // Insert users with create() to trigger pre-save hook for password hashing
    for (const userData of users) {
      await User.create(userData);
    }
    console.log('Users seeded');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
