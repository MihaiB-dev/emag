import db from '../../models/index.js';  


export const createCartProduct = async (productCode, quantity, context) => {

    console.log(context);
    const userCart = await db.Cart.findOne({
                where: {
                    userId: context.user_id

                }
            });
   
    let cart;
    if (userCart) {
        cart = userCart;
    } 

    const product = await db.Product.findOne({
        where: {
            productCode: productCode,
        },
    });

    if (!product) {
        throw new Error('Product not found');
    }

    const cartProduct = await db.CartProduct.findOne({
        where: {
            cartId: cart.id,
            productId: product.id,
        },
    });

    let totalPrice = cart.totalPrice;

    if (cartProduct) {
        cartProduct.quantity += quantity; 
        await cartProduct.save(); 

        
        totalPrice += product.price * quantity;
    } else {
        
        await db.CartProduct.create({
            cartId: cart.id, 
            productId: product.id, 
            quantity: quantity, 
        });

        totalPrice += product.price * quantity;
    }

    cart.totalPrice = totalPrice;
    await cart.save(); 

    const updatedCart = await cart.reload({ include: db.Product });

    console.log(updatedCart);
    return updatedCart;



};
