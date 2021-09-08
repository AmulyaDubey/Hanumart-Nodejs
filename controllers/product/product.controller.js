const Product = require("../../models/product.model");

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
  req.product.delete();
  res.json({ message: "Product deleted successfully!" });
};

exports.listProducts = async (req, res) => {
  const list = await Product.find(req.query);
  res.json(list);
};

exports.searchProducts = async (req, res) => {
  const { words } = req.body;

  Product.find({ $text: { $search: words } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .exec((err, list) => {
      res.json(list);
    });
};
