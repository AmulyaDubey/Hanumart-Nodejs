const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const User = require("./user.model");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  contact: {
    type: Number,
    trim: true,
    required: true,
  },
  fullAddress: {
    type: String,
    trim: true,
    required: true,
  },
  pincode: {
    type: Number,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  isActive:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Address", addressSchema);
