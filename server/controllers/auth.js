const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    // Check email and password in database
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "Email is already exits." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });
    res.status(200).json({ message: "Register successfully." });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user || !user.enabled) {
      return res
        .status(400)
        .json({ message: "User not found or not enalbled." });
    }
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Password invalid, Please login again." });
    }
    // create payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    // generate token
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Server Error" });
      }
      res.status(200).json({ payload, token });
    });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.currentUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    res.status(200).send("currentUser");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.currentAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    res.status(200).send("currentAdmin");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};
