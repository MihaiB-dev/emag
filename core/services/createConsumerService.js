import db from '../../models/index.js';

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
    await createdConsumer.addCart(cart);

    const consumerWithAssociations = await db.Consumer.findByPk(createdConsumer.id, {
        include: [
            { model: db.User, as: 'user' }, // Include the user
            { model: db.Cart, as: 'cart' }, // Include the cart
        ],
    });
    console.log(consumerWithAssociations);
    return consumerWithAssociations;
}