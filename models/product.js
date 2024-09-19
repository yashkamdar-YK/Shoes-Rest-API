const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  about: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  featured: {
    type: Boolean,
    default: false
  },

  reating: {
    type: Number,
    default: 4.4
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  brand: {
    type: String,
    valuse: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Converse', ]
    
  },

  coverImage: {
    type: String, // Single image URL as a string
    required: true
  },

  description: {
    type: String,
    required: true
  },

  images: {
    type: [String], // Array of image URLs
    validate: [arrayLimit, 'You can upload a maximum of 5 images'], // Custom validator for limiting array size
    required: true
  },

  sizes: {
    type: [String], // Corrected capitalization
    required: true
  },
  
  colors: {
    type: [String], // Array of color names or codes
    required: true
  }
  
});

function arrayLimit(val) {
    return val.length <= 5;
}
module.exports = mongoose.model('Product', productSchema)   