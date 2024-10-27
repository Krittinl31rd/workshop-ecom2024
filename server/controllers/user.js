exports.getUser = async (req, res) => {
  try {
    res.status(200).send("getUser");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.changeStatus = async (req, res) => {
  try {
    res.status(200).send("changeStatus");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.changeRole = async (req, res) => {
  try {
    res.status(200).send("changeRole");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.createCart = async (req, res) => {
  try {
    res.status(200).send("createCart");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    res.status(200).send("getCart");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    res.status(200).send("deleteCart");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.createAddress = async (req, res) => {
  try {
    res.status(200).send("createAddress");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.createOrder = async (req, res) => {
  try {
    res.status(200).send("createOrder");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getOrder = async (req, res) => {
  try {
    res.status(200).send("getOrder");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};
