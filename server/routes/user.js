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

const { authCheck, authAdmin } = require("../middlewares/authCheck");

router.get("/users", authCheck, authAdmin, getUser);
router.post("/change-status", authCheck, authAdmin, changeStatus);
router.post("/change-role", authCheck, authAdmin, changeRole);

router.post("/user/cart", authCheck, createCart);
router.get("/user/cart", authCheck, getCart);
router.delete("/user/cart", authCheck, deleteCart);

router.post("/user/address", authCheck, createAddress);

router.post("/user/order", authCheck, createOrder);
router.get("/user/order", authCheck, getOrder);

module.exports = router;
