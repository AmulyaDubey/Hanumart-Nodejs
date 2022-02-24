const express = require("express");
const {
  createProduct,
  productById,
  viewProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  searchProducts,
} = require("../controllers/product/product.controller");

const {
  postProductReview,
  reviewById,
  getProductReviews,
  deleteReview,
} = require("../controllers/product/review.product.controller");

const { requireSignin } = require("../controllers/auth.controller");


const router = express.Router();

//product routes
router.post("/create-product", requireSignin, createProduct);
router.get("/view-product/:productId", viewProduct);
router.put("/update-product/:productId", updateProduct);
router.delete("/delete-product/:productId", deleteProduct);
router.get("/products-list", listProducts);
router.post("/search/products", searchProducts);

//product review and rating routes
router.post("/product/:productId/post-review", postProductReview);
router.get("/product/:productId/reviews", getProductReviews);
router.delete("/product/:productId/delete-review/:reviewId", deleteReview);

router.param("productId", productById);
router.param("reviewId", reviewById);

module.exports = router;
