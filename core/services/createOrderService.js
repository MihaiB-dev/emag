import db from '../../models/index.js'; 
import { createOrderProduct } from './createOrderProductService.js';

export const createOrder = async (context) => {

  const cart = await db.Cart.findOne({
    where: { userId: context.user_id }
  });
  
  const orderDate = new Date(); 
  const randomDays = Math.floor(Math.random() * 10) + 1;
  const comingDate = orderDate;
  comingDate.setDate(orderDate.getDate() + randomDays);

  const order = await db.Order.create({
    userId: context.user_id,
    totalPrice: cart.totalPrice, 
    status: 'PENDING', 
    comingDate: comingDate,
    orderDate: orderDate
  });
  const {noProducts, notEnoughStock} = await createOrderProduct(cart.id, order.id);

  if(noProducts === true)
  {
    await db.OrderProduct.destroy({
      where: { orderId: order.id }
    });
    await order.destroy();
    throw new Error('No products found in the cart');
  }

  if(notEnoughStock === true)
  {
    await db.OrderProduct.destroy({
      where: { orderId: order.id }
    });
    await order.destroy();
    throw new Error('Not enough stock for product');
  }
  return order;
};
