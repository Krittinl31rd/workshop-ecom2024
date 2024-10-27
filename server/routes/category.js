const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategory,
  deleteCategory,
  updatedCategory,
} = require("../controllers/category");
const { authCheck, authAdmin } = require("../middlewares/authCheck");

router.post("/category", authCheck, authAdmin, createCategory);
router.get("/category", authCheck, authAdmin, getCategory);
router.put("/category/:id", authCheck, authAdmin, updatedCategory);
router.delete("/category/:id", authCheck, authAdmin, deleteCategory);

module.exports = router;
