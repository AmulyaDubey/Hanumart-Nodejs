const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uuidv1 = require("uuidv1");
const crypto = require("crypto");

const Address = require("./address.model");

const sellerSchema = new mongoose.Schema({
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
  shopName: {
    type: String,
    trim: true,
    required: true,
  },
  shopAddress: {
    type: ObjectId,
    ref: Address,
  },
  phone: {
    type: String,
  },
  orders: [
    {
      type: ObjectId,
      ref: "Order",
    },
  ],
});

sellerSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
sellerSchema.methods = {
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

module.exports = mongoose.model("Seller", sellerSchema);
