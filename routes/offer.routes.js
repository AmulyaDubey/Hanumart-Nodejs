const express = require("express");
const {
  addOffer,
  updateOffer,
  offerById,
  deleteOffer,
  getSellerOffers
} = require("../controllers/offers/offers.controller");
const router = express.Router();

router.post("/add-offer", addOffer);
router.put("/update-offer/:offerId", updateOffer);
router.delete("/delete-offer/:offerId", deleteOffer);
router.get("/seller-offers/:sellerId", getSellerOffers);

router.param("offerId", offerById);

module.exports = router;
