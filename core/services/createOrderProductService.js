import db from '../../models/index.js'; 

export const createOrderProduct = async (cartId, orderId) => {
  
  const cartProducts = await db.CartProduct.findAll({
    where: { cartId: cartId },
    include: [db.Product], 
  });
  let bool1=false;
  let bool2=false;
  if (!cartProducts || cartProducts.length === 0) {
    bool1 = true;
  }
  if(bool1 === false)
  {
  const orderProducts = await Promise.all(
    cartProducts.map(async (cartProduct) => 
      {
        if (!orderId || !cartProduct.ProductId || !cartProduct.quantity) {
            throw new Error('Invalid orderId, productId, or quantity');
        }
        const product = await db.Product.findOne({
          where: { id: cartProduct.ProductId }
        });
  
        if (!product) {
          throw new Error('Product not found');
        }
        
        const newStock = product.stock - cartProduct.quantity;

        if (newStock < 0) {
          bool2 = true;
        }
        else
        {
          await product.update({
            stock: newStock
          });

          const orderProduct = await db.OrderProduct.create({
            orderId: orderId, 
            productId: cartProduct.ProductId,
            quantity: cartProduct.quantity,
          });
          return orderProduct;
        }
        
        })
    );
  }
  if(bool2 === false)
  {
    await db.CartProduct.destroy({
      where: { cartId: cartId },
    });
  
    const cart = await db.Cart.findOne({
      where: { id: cartId }
    });
  
    
    if (cart ) {
      cart.totalPrice = 0;
      await cart.save(); 
    }
  }
  
  return {noProducts: bool1,notEnoughStock: bool2};
};
