const prisma = require("../config/prisma");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => {
            asset_id: item.asset_id;
            public_id: item.public_id;
            url: item.url;
            secure_url: item.secure_url;
          }),
        },
      },
    });
    res.status(200).json({ message: "Created product successfully" });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getProductBy = async (req, res) => {
  try {
    const count = req.params.count;
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: {
        createdAt: "asc",
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const Id = req.params.id;
    const { title, description, price, quantity, categoryId, images } =
      req.body;

    await prisma.image.deleteMany({
      where: {
        productId: Number(Id),
      },
    });

    await prisma.product.update({
      where: {
        id: Number(Id),
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => {
            asset_id: item.asset_id;
            public_id: item.public_id;
            url: item.url;
            secure_url: item.secure_url;
          }),
        },
      },
    });
    res.status(200).json({ message: "Updated product successfully" });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const Id = req.params.id;
    await prisma.product.delete({
      where: {
        id: Number(Id),
      },
    });
    res.status(200).json({ message: "Delete product successfully." });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.filterProduct = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: { category: true },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

const handleQuery = async (req, res, query) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internet server error");
  }
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: price[0],
          lte: price[1],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internet server error");
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: category.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internet server error");
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { query, category, price } = req.body;
    if (query) {
      console.log("query-->", query);
      await handleQuery(req, res, query);
    }
    if (category) {
      console.log("category-->", category);
      await handleCategory(req, res, category);
    }
    if (price) {
      console.log("price-->", price);
      handlePrice(req, res, price);
    }
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};
