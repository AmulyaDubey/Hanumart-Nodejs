const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Seller = require("../models/seller.model");

const offerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  offerType: {
    type: String,
  },
  maxAmount: {
    type: Number,
  },
  minAmount: {
    type: Number,
  },
  percentage: {
    type: Number,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  sellerId: {
    type: ObjectId,
    ref: Seller,
  },
});

module.exports = mongoose.model("Offer", offerSchema);
