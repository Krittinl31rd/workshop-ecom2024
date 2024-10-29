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
    const cart = await prisma.cart.findFirst({
      where: {
        orderbyId: Number(req.user.id)
      }
    })
    if (!cart) {
      return res.status(400).json({ message: "Cart not found." })
    }
    await prisma.productOnCart.deleteMany({
      where: { cartId: cart.id }
    })
    const result = await prisma.cart.deleteMany({
      where: { orderbyId: Number(req.user.id) }
    })
    res.status(200).json({
      message: "Deleted cart successfully.",
      deletedCount: result.count
    })
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.createAddress = async (req, res) => {
  try {
    const { address } = req.body;
    await prisma.user.update({
      where: {
        id: Number(req.user.id)
      },
      data: {
        address: address
      }
    })
    res.status(200).json({ message: "Updated address successfully." });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        orderbyId: Number(req.user.id)
      },
      include: {
        products: true
      }
    })
    // check cart empty
    if (!userCart || userCart.products.length == 0) {
      return res.status(400).json({ status: false, message: "Cart is empty." })
    }
    // check quantity
    for (const item of userCart.products) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId
        },
        select: {
          quantity: true,
          title: true
        }
      })
      if (!product || item.count > product.quantity) {
        return res.status(400).json({ status: false, message: `${product?.title || "Product"} out of stock.` })
      }
    }
    // create new order
    const order = await prisma.order.create({
      data: {
        products: {
          create:
            userCart.products.map((item) => ({
              productId: item.productId,
              count: item.count,
              price: item.price
            }))
        },
        orderById: Number(req.user.id),
        cartTotal: userCart.cartTotal
      }
    })
    // update product
    const updateProduct = await userCart.products.map((item) => ({
      where: {
        id: item.productId
      },
      data: {
        quantity: { decrement: item.count },
        sold: { increment: item.count }
      }
    }))

    await Promise.all(
      updateProduct.map((updated) => prisma.product.update(updated))
    )

    await prisma.cart.deleteMany({
      where: {
        orderbyId: Number(req.user.id)
      }
    })

    res.status(200).json({ status: true, message: `Created order successfully, total price ${order?.cartTotal}` })
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await prisma.order.findMany({
      where: {
        orderById: Number(req.user.id)
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    })
    if (order.length == 0) {
      return res.status(400).json({ message: "Order not found." })
    }
    res.status(200).json(order)
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};
