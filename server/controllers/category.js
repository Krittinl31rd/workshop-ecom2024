const prisma = require("../config/prisma");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.status(200).json({ message: "Created category success." });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const products = await prisma.category.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const Id = req.params.id;
    await prisma.category.delete({
      where: {
        id: Number(Id),
      },
    });
    res.status(200).json({ message: "Deleted category success." });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.updatedCategory = async (req, res) => {
  try {
    const Id = req.params.id;
    const { name } = req.body;
    await prisma.category.update({
      where: {
        id: Number(Id),
      },
      data: {
        name: name,
      },
    });
    res.status(200).json({ message: "Updated category success." });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internet server error");
  }
};
