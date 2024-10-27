exports.createProduct = async (req, res) => {
  try {
    res.status(200).send("createProduct");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getProduct = async (req, res) => {
  try {
    res.status(200).send("getProduct");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    res.status(200).send("deleteProduct");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.filterProduct = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send("filterProduct");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.searchProduct = async (req, res) => {
  try {
    res.status(200).send("searchProduct");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};
