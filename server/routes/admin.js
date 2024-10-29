const express = require("express");
const { getAllOrder, updateOrderStatus } = require("../controllers/admin");
const router = express.Router();
const { authCheck, authAdmin } = require("../middlewares/authCheck")

router.put("/admin/order-status", authCheck, authAdmin, updateOrderStatus);
router.get("/admin/orders", authCheck, authAdmin, getAllOrder);

module.exports = router;
