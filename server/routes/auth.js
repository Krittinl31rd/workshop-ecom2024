const express = require("express");
const router = express.Router();
const { authCheck, authAdmin } = require('../middlewares/authCheck')

const {
  Register,
  Login,
  currentUser,
} = require("../controllers/auth");

router.post("/register", Register);
router.post("/login", Login);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, authAdmin, currentUser);

module.exports = router;
