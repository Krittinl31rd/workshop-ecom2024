const prisma = require("../config/prisma");

exports.getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        enabled: enabled,
      },
    });
    res.status(200).json({ message: "Updated status successfully." });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
    });
    res.status(200).json({ message: "Updated role successfully." });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.createCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        id: Number(req.user.id),
      },
    });
    //check quantity
    for (const item of cart) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.id,
        },
        select: {
          quantity: true,
          title: true,
        },
      });
      // item.count = user want || product.quantity = stock have
      if (!product || item.count > product.quantity) {
        return res.status(400).json({
          status: false,
          message: `Sorry, ${product?.title || "This product"} out of stock.`,
        });
      }
    }
    // delete old cart product
    await prisma.productOnCart.deleteMany({
      where: {
        cart: {
          orderbyId: user.id,
        },
      },
    });
    // delete old cart
    await prisma.cart.deleteMany({
      where: {
        orderbyId: user.id,
      },
    });
    // Prepare products
    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price,
    }));
    // sum total price
    let cartTotal = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    // new cart
    await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        cartTotal: cartTotal,
        orderbyId: user.id,
      },
    });
    res.status(200).json({ message: "Created cart successfully." });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderbyId: Number(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res
      .status(200)
      .json({ products: cart?.products, cartTotal: cart?.cartTotal });
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
