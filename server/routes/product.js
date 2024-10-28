const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductBy,
  deleteProduct,
  filterProduct,
  searchProduct,
  updateProduct,
} = require("../controllers/product");
const { authCheck, authAdmin } = require("../middlewares/authCheck");

router.post("/product", authCheck, authAdmin, createProduct);
router.get("/product/:count", authCheck, authAdmin, getProductBy);
router.put("/product/:id", authCheck, authAdmin, updateProduct);
router.delete("/product/:id", authCheck, authAdmin, deleteProduct);
router.post("/productby", authCheck, authAdmin, filterProduct);
router.post("/search/filters", authCheck, authAdmin, searchProduct);

module.exports = router;
