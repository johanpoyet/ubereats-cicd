const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: String,
    default: '0'
  },
  deliveryTime: {
    type: String,
    required: true
  },
  deliveryFee: {
    type: String,
    required: true
  },
  deliveryInfo: {
    type: String,
    default: 'Frais de livraison'
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  badge: {
    type: String
  },
  promo: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  menu: [{
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
