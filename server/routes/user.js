const express = require("express");
const router = express.Router();

const {
  getUser,
  changeStatus,
  changeRole,
  createCart,
  getCart,
  deleteCart,
  createAddress,
  getOrder,
  createOrder,
} = require("../controllers/user");

router.get("/users", getUser);
router.post("/change-status", changeStatus);
router.post("/change-role", changeRole);
router.post("/user/cart", createCart);
router.get("/user/cart", getCart);
router.delete("/user/cart", deleteCart);
router.post("/user/address", createAddress);
router.post("/user/order", createOrder);
router.get("/user/order", getOrder);

module.exports = router;
