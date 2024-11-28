const CartModel = require("../../models/cart.model");

module.exports = async (userId) => {
  try {
    const activeCarts = await CartModel.findOne({
      user: userId,
      status: "Active",
    })
      .populate({
        path: "classSchedules.ClassSchedule",
        model: "ClassSchedule",
        populate: [
          {
            path: "classActivity",
            model: "ClassActivity",
            populate: {
              path: "zone",
              model: "ClassZone",
            },
          },
          {
            path: "coaches",
            model: "CoachProfile",
          },
          {
            path: "enrollments",
            model: "ClassEnrollment",
          },
        ],
      })
      .populate({ path: "products.product", model: "Product" });

    if (activeCarts) {
      const totalClassPrice = activeCarts.classSchedules.reduce(
        (
          acc,
          {
            ClassSchedule: {
              classActivity: { price },
            },
          }
        ) => acc + price,
        0
      );
      const totalProductPrice =
        activeCarts.products && activeCarts.products.length > 0
          ? activeCarts.products.reduce(
              (acc, { product, quantity }) => acc + product.price * quantity,
              0
            )
          : 0;
      const totalPrice = totalClassPrice + totalProductPrice;
      const totalClassCart = activeCarts.classSchedules.length;
      const totalProductQuantity = activeCarts.products.reduce((acc, { quantity }) => acc + quantity, 0); // Calcular la cantidad total de productos

      return {
        total: totalPrice,
        totalClassPrice,
        totalProductPrice,
        totalClassCart,
        totalProductQuantity, // Agregar el total de productos al resultado
        status: activeCarts.status,
        id: activeCarts.id,
        createdAt: activeCarts.createdAt,
        updatedAt: activeCarts.updatedAt,
        class: activeCarts.classSchedules,
        products: activeCarts.products || [], // Devolver un array vacío si no hay productos
      };
    } else {
      return {
        activeCarts: null,
        totalPrice: 0,
        totalClassPrice: 0,
        totalProductPrice: 0,
        totalClassCart: 0,
        totalProductQuantity: 0, // Agregar el total de productos al resultado
        products: [],
      };
    }
  } catch (error) {
    console.log("Error finding active carts:", error);
    throw new Error("Error finding active carts: ", error);
  }
};
