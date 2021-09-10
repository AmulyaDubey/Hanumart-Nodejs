const Order = require("../models/order.model");
const Address = require("../models/address.model");

exports.orderById = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
    if (err || !order) {
      return res.status(400).json({
        error: "Address not found",
      });
    }
    req.order = order;
    next();
  });
};

exports.createOrder = async (req, res) => {
  //create order
  const order = new Order(req.body);
  await order.save();
  //add order id to user and update recent address
  req.user.orders.push(order._id);
  req.user.recentAddress = order.address;
  //make address active
  Address.findByIdAndUpdate(order.address, { isActive: true }, (err, doc) => {
    if (err) return res.json({ error: "Could not place order" });
  });
  await req.user.save();
  res.json(order);
};

exports.updateOrder = async (req, res) => {
  const entry = Object.entries(req.body)[0];
  req.order[entry[0]] = entry[1];
  req.order.save();
  res.json(req.order);
};
