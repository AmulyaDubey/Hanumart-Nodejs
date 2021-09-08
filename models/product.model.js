const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Review = require("./review.model");

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
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
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
  // seller: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = mongoose.model("Product", productSchema);
