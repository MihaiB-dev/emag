import db from '../../models/index.js'; 

export const createOrderProduct = async (cartId, orderId) => {
  
  const cartProducts = await db.CartProduct.findAll({
    where: { cartId: cartId },
    include: [db.Product], 
  });

  if (!cartProducts || cartProducts.length === 0) {
    throw new Error('No products found in the cart');
    
  }

  const orderProducts = await Promise.all(
    cartProducts.map(async (cartProduct) => 
      {
      if (!orderId || !cartProduct.ProductId || !cartProduct.quantity) {
            throw new Error('Invalid orderId, productId, or quantity');
        }
      const orderProduct = await db.OrderProduct.create({
        orderId: orderId, 
        productId: cartProduct.ProductId,
        quantity: cartProduct.quantity,
      });

      const product = await db.Product.findOne({
        where: { id: cartProduct.ProductId }
      });

      if (!product) {
        throw new Error('Product not found');
      }

      const newStock = product.stock - cartProduct.quantity;

      if (newStock < 0) {
        throw new Error('Not enough stock for product ' + product.productCode);
      }

      await product.update({
        stock: newStock
      });

      return orderProduct;
    })
  );

  await db.CartProduct.destroy({
    where: { cartId: cartId },
  });

  const cart = await db.Cart.findOne({
    where: { id: cartId }
  });

  if (cart) {
    cart.totalPrice = 0;
    await cart.save(); 
  }

  return orderProducts;
};
