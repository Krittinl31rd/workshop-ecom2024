const express = require("express");
const router = express.Router();

const {
  Register,
  Login,
  currentUser,
  currentAdmin,
} = require("../controllers/auth");

router.post("/register", Register);
router.post("/login", Login);
router.post("/current-user", currentUser);
router.post("/current-admin", currentAdmin);

module.exports = router;
