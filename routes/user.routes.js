const express = require("express");
const { userById } = require("../controllers/user/user.controller");

const {
  addToCart,
  viewCart,
  removeFromCart,
  updateQuantity,
  emptyCart,
} = require("../controllers/user/cart.controller");

const { addToWishlist, removeFromWishlist } = require("../controllers/user/wishlist.controller");

const router = express.Router();

//Cart Routes
router.post("/user/:userId/add-to-cart/:itemId", addToCart);
router.get("/user/:userId/cart", viewCart);
router.delete("/user/:userId/remove-from-cart/:itemId", removeFromCart);
router.put("/user/:userId/update-quantity/:itemId", updateQuantity);
router.delete("/user/:userId/empty-cart", emptyCart);

//Wishlist Routes
router.post("/user/:userId/add-to-wishlist/:itemId", addToWishlist);
router.delete("/user/:userId/remove-from-wishlist/:itemId", removeFromWishlist);

router.param("userId", userById);

module.exports = router;
