import { GraphQLBoolean, GraphQLString } from 'graphql';
import db from '../../models/index.js';
import { isProducer } from '../../core/services/isProducerService.js';

const deleteProductMutationResolver = async (_, { productCode }, context) => {
    try {
      await isProducer(context);

      const product = await db.Product.findOne({
        where: { productCode: productCode },
      });

      if (!product) {
        throw new Error('Product not found');
      }

      if (product.producerId !== context.user_id) {
        throw new Error('You are not authorized to delete this product');
      }

      const orders = await db.OrderProduct.findAll({
        where: { productId: product.id },
      });

      if (orders.length > 0) {
        throw new Error('Product is part of an active order and cannot be deleted');
      }

      const cartProducts = await db.CartProduct.findAll({
        where: { productId: product.id },
      });

      if (cartProducts.length > 0) {
        for (const cartProduct of cartProducts) {
          const cart = await cartProduct.getCart();
          const productInCart = await cartProduct.getProduct();

          const newTotalPrice = cart.totalPrice - (productInCart.price * cartProduct.quantity);

          await cart.update({ totalPrice: newTotalPrice });

          await cartProduct.destroy();
        }
      }

      await product.destroy();

      return true;  
    } catch (error) {
      throw new Error(error.message);  
    }
}

const deleteProductMutation = {
    type: GraphQLBoolean,  
    args: {
        productCode: { type: GraphQLString },  
    },
    resolve: deleteProductMutationResolver,
};

export default deleteProductMutation;