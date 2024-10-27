const express = require("express");
const { getAllOrder, updateOrderStatus } = require("../controllers/admin");
const router = express.Router();

router.put("/user/order", updateOrderStatus);
router.get("/admin/orders", getAllOrder);

module.exports = router;
