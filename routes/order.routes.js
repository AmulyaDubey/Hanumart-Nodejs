const express = require("express");
const {
  createOrder,
  updateOrder,
  orderById,
} = require("../controllers/order.controller");
const router = express.Router();

const { userById } = require("../controllers/user/user.controller");

router.post("/user/:userId/create-order", createOrder);
router.put("/order/:orderId/update", updateOrder);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
