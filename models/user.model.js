const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uuidv1 = require("uuidv1");
const crypto = require("crypto");
const Product = require("./product.model");
const Address = require("./address.model");
const Order = require("./order.model");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  cart: [
    {
      product: { type: ObjectId, ref: Product },
      quantity: { type: Number, default: 1 },
    },
  ],
  wishlist: [
    {
      type: ObjectId,
      ref: Product,
    },
  ],
  address: [
    {
      type: ObjectId,
      ref: Address,
    },
  ],
  recentAddress: {
    type: ObjectId,
    ref: Address,
  },
  orders: [
    {
      type: ObjectId,
      ref: Order,
    },
  ],
});

/**
 * Virtual fields are additional fields for a given model.
 * Their values can be set manually or automatically with defined functionality.
 * Keep in mind: virtual properties (password) don’t get persisted in the database.
 * They only exist logically and are not written to the document’s collection.
 */

// virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    // create temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = uuidv1();
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
