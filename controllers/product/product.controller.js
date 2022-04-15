const Product = require("../../models/product.model");
const Review = require("../../models/review.model");
const Seller = require("../../models/seller.model");

exports.productById = async (req, res, next, id) => {
  Product.findById(id)
    .populate("reviews")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product; // adds product object in req with user info
      next();
    });
};


exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  const sellerId = req.body.seller;
  Seller.findById(sellerId).exec((err, seller) => {
    if (err || !seller) {
      return res.status(400).json({
        error: "Seller not found",
      });
    }
    seller.products = [...seller.products, product._id];
    seller.save();
  });
  res.json({ message: "Product successfully created" });
};

exports.viewProduct = async (req, res) => {
  res.json(req.product);
};

exports.updateProduct = async (req, res) => {
  Object.entries(req.body).map((entry) => {
    req.product[entry[0]] = entry[1];
  });
  await req.product.save();
  res.json(req.product);
};

exports.deleteProduct = async (req, res) => {
  //delete associated reviews
  const reviewIds = req.product.reviews;
  Review.deleteMany({ _id: { $in: reviewIds } });

  //delete product
  await req.product.delete();
  res.json({ message: "Product deleted successfully!" });
};

exports.listProducts = async (req, res) => {
  const list = await Product.find(req.query);
  res.json(list);
};

exports.searchProducts = async (req, res) => {
  const { words } = req.body;

  var searchedString = words.replace(/ /g, "|");
  var regex = new RegExp(searchedString, "i");

  let exact = await Product.find(
    { $text: { $search: words } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .exec();

  let partial = await Product.find({
    name: { $regex: regex },
  }).exec();

  res.json(merge(exact, partial));
};

const merge = (A, B) => {
  let result = A;
  let ids = A.map((x) => x._id.toString());
  let extra = B.filter((x) => !ids.includes(x._id.toString()));
  return [...result, ...extra];
};
