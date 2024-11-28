const UserService = require("../user");
const OrderModel = require("../../models/order");
const PaymentService = require("../payments");
const schedulesService = require("../schedules");
const productService = require("../product");
const preOrderService = require("../preOrder");

module.exports = async (newOrder) => {
  try {
    const user = await UserService.findById(newOrder.userId);

    const paymentData = {
      payment_mode: "payment",
      success_url: newOrder.successUrl,
      cancel_url: newOrder.cancelUrl,
      email: user.email,
      products: await Promise.all(
        newOrder.products.map(async (product) => {
          const productData = await productService.getById(product.product);
          return {
            price: productData.stripe.id,
            quantity: product.quantity,
          };
        })
      ),
      classSchedules: await Promise.all(
        newOrder.classSchedules.map(async (classSchedule) => {
          const scheduleData = await schedulesService.getById(
            classSchedule.classSchedule
          );
          return {
            price: scheduleData.classActivity.stripe.id,
            quantity: classSchedule.students.length,
          };
        })
      ),
      orderCode: newOrder.orderCode,
      currency: newOrder.currency,
      totalPrice: newOrder.totalPrice,
    };

    
    const paymentSession = await PaymentService.createSession(paymentData);
    const paymentLink = paymentSession.url;
    const paymentId = paymentSession.id;
    newOrder.paymentLink = paymentLink;
    newOrder.paymentId = paymentId;
    
    const order = await OrderModel.create(newOrder);
    await preOrderService.updateByOrderCode(newOrder.orderCode, { status: "completed" });

    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
