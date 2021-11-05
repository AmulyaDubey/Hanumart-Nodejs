const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Product = require("./product.model");
const Address = require("./address.model");

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: ObjectId, ref: 'Product' },
      quantity: { type: Number },
    },
  ],
  address: {
    type: ObjectId,
    ref: Address,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  orderedBy: {
    type: ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "Order Placed",
  },
  deliveryDate: {
    type: Date,
  },
  expectedDeliveryDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 10),
  },
  priceDetails: {
    shipping: {
      type: Number,
    },
    insurance: {
      type: Number,
    },
    others: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
