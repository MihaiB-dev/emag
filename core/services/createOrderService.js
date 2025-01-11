import db from '../../models/index.js'; 
import { createOrderProduct } from './createOrderProductService.js';

export const createOrder = async (context) => {
  
  const cart = await db.Cart.findOne({
    where: { userId: context.user_id },
    include: [{ model: db.CartProduct, include: [db.Product] }], 
  });

  if (!cart || cart.CartProducts.length === 0) {
    throw new Error('Cart is empty or does not exist');
  }
  
  const orderDate = new Date(); 
  const randomDays = Math.floor(Math.random() * 10) + 1;
  const comingDate = orderDate;
  comingDate.setDate(today.getDate() + randomDays);

  const order = await db.Order.create({
    userId: context.user_id,
    totalPrice: cart.totalPrice, 
    status: 'PENDING', 
    comingDate: comingDate,
    orderDate: orderDate
  });

  const orderProduct = await createOrderProduct(cart.id, order.id);

  await order.addOrderProducts(orderProduct);

  const createdOrder = await db.Order.findOne({
    where: { id: order.id },
    include: [db.OrderProduct], 
  });

  return createdOrder;
};
