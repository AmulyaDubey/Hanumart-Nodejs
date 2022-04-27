const express = require("express");

const {
  registerSeller,
  sellerLogin,
  signout,
  sellerById,
} = require("../controllers/seller/sellerAuth.controller");

const {
  updateSellerProfile,
  getSellerOrders,
  getSellerProducts,
} = require("../controllers/seller/sellerInfo.controller");

const { requireSignin } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/seller/signup", registerSeller);
router.post("/seller/signin", sellerLogin);
router.get("/seller/signout", signout);

router.put(
  "/seller/:sellerId/profile/update",
  requireSignin,
  updateSellerProfile
); //TODO: add authorization fn

router.get("/seller/:sId/orders", getSellerOrders);
router.get("/seller/:sId/products", getSellerProducts);

router.param("sellerId", sellerById);

module.exports = router;
