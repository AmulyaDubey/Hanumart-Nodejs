const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Review = require("./review.model");
const Seller = require("./seller.model");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  unitDescription: {
    type: String,
    trim: true,
  },
  unit: {
    type: String,
  },
  marketPrice: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: ObjectId,
      ref: Review,
    },
  ],
  image: {
    type: ObjectId,
  },
  thumbnail: {
    type: ObjectId,
  },
  seller: {
    type: ObjectId,
    ref: Seller,
    // required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
