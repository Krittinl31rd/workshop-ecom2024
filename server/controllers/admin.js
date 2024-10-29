const prisma = require("../config/prisma");

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body
    const orderUpdate = await prisma.order.update({
      where: {
        id: Number(orderId)
      },
      data: {
        orderStatus: orderStatus
      }
    })
    res.status(200).json({ message: `Update status orderId ${orderUpdate?.id || orderId} to ${orderUpdate?.orderStatus || orderStatus}.` });
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true
          }
        },
        orderBy: {
          select: {
            id: true,
            email: true,
            address: true
          }
        }
      }
    })
    res.status(200).json(orders)
  } catch (err) {
    res.status(500).send("Internet server error");
    console.log(err);
  }
};
