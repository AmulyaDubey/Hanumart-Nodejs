const express = require("express");
const {
  userById,
  getUserData,
} = require("../controllers/user/user.controller");

const {
  addToCart,
  viewCart,
  removeFromCart,
  updateQuantity,
  emptyCart,
} = require("../controllers/user/cart.controller");

const {
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/user/wishlist.controller");

const {
  addUserAddress,
  removeAddress,
  addressById,
  getUserAddress
} = require("../controllers/user/address.controller");

const router = express.Router();

//User Routes
router.get("/get-user/:userId/", getUserData);

//Cart Routes
router.post("/user/:userId/add-to-cart/:itemId", addToCart);
router.get("/user/:userId/cart", viewCart);
router.delete("/user/:userId/remove-from-cart/:itemId", removeFromCart);
router.put("/user/:userId/update-quantity/:itemId", updateQuantity);
router.delete("/user/:userId/empty-cart", emptyCart);

//Wishlist Routes
router.post("/user/:userId/add-to-wishlist/:itemId", addToWishlist);
router.delete("/user/:userId/remove-from-wishlist/:itemId", removeFromWishlist);

//Address Routes
router.get("/user/:userId/address", getUserAddress);
router.post("/user/:userId/add-address", addUserAddress);
router.delete("/remove-address/:addressId", removeAddress);

router.param("userId", userById);
router.param("addressId", addressById);

module.exports = router;
