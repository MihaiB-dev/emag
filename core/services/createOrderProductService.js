import db from '../../models/index.js'; 

export const createOrderProduct = async (cartId, orderId) => {
  
  const cartProducts = await db.CartProduct.findAll({
    where: { cartId },
    include: [db.Product], 
  });

  if (!cartProducts || cartProducts.length === 0) {
    throw new Error('No products found in the cart');
  }

  const orderProducts = await Promise.all(
    cartProducts.map(async (cartProduct) => {
      const orderProduct = await db.OrderProduct.create({
        orderId, 
        productId: cartProduct.productId,
        quantity: cartProduct.quantity,
      });

      return orderProduct;
    })
  );

  await db.CartProduct.destroy({
    where: { cartId },
  });

  return Promise.all(orderProducts);
};
