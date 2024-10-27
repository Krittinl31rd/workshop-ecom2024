exports.updateOrderStatus = async (req, res) => {
  try {
    res.status(200).send("updateOrderStatus");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    res.status(200).send("getAllOrder");
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};
