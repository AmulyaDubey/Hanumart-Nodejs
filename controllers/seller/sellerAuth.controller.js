const jwt = require("jsonwebtoken");
require("dotenv").config();

const Seller = require("../../models/seller.model");
const User = require("../../models/user.model");

exports.sellerById = (req, res, next, id) => {
  Seller.findById(id).exec((err, seller) => {
    if (err || !seller) {
      return res.status(400).json({
        error: "Seller not found",
      });
    }
    req.seller = seller;
    next();
  });
};

exports.registerSeller = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  const sellerExists = await Seller.findOne({ email: req.body.email });

  if (userExists || sellerExists)
    return res.status(403).json({
      error: "Email is taken!",
    });
  const seller = await new Seller(req.body);
  await seller.save();
  res.status(200).json({ message: "Signup success! Please login." });
};

exports.sellerLogin = (req, res) => {
  const { email, password } = req.body;
  Seller.findOne({ email }, (err, seller) => {
    // if err or no user
    if (err || !seller) {
      return res.status(401).json({
        error: "Seller with that email does not exist. Please signup.",
      });
    }

    if (!seller.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: seller._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email } = seller;
    return res.json({
      token,
      seller: { _id, name, email },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout success!" });
};
