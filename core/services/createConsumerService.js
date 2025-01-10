import db from '../../models/index.js';
import bcrypt from 'bcrypt';
export const createConsumer = async (user, context) => {
    const password = await bcrypt.hash(user.password, 5);

    const createdUser = await db.User.create({
        name: user.name,
        password: password,
    });

    const cart = await db.Cart.create({
        userId: createdUser.id,
        totalPrice: 0,
    });
    const createdConsumer = await db.Consumer.create({
        userId: createdUser.id,
    });

    console.log(createdConsumer); 
    await createdConsumer.setCart(cart);

    return createdConsumer;
}