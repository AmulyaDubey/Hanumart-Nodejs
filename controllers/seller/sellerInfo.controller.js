require("dotenv").config();
const Order = require("../../models/order.model");
const Product = require("../../models/product.model");

exports.updateSellerProfile = (req, res) => {
  Object.keys(req.body).map((key) => {
    req.seller[key] = req.body[key];
  });
  req.seller.save();
  res.json({ message: "Seller profile updated" });
};

exports.getSellerOrders = (req, res) => {
  const { sId } = req.params;

  Order.find({ sellerId: sId })
    .populate("address")
    .exec((err, result) => {
      if (err) {
        return res.status(403).json({
          error: err,
        });
      }
      return res.status(200).send(result);
    });
};

exports.getSellerProducts = (req, res) => {
  const { sId } = req.params;

  Product.find({ sellerId: sId }).exec((err, result) => {
    if (err) {
      return res.status(403).json({
        error: err,
      });
    }
    return res.send(result);
  });
};
