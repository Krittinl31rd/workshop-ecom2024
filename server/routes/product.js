const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  deleteProduct,
  filterProduct,
  searchProduct,
} = require("../controllers/product");

router.post("/product", createProduct);
router.get("/product/:id", getProduct);
router.delete("/product/:id", deleteProduct);
router.post("/productby", filterProduct);
router.post("/search/filters", searchProduct);

module.exports = router;
