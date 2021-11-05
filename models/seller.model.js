const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Address = require("./address.model");

const sellerSchema = new mongoose.Schema({
  shopName: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: ObjectId,
    ref: Address,
  },
  products: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
  orders: [
    {
      type: ObjectId,
      ref: 'Order',
    },
  ],
});

module.exports = mongoose.model("Seller", sellerSchema);
