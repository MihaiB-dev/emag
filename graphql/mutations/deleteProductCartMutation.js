import { GraphQLBoolean, GraphQLString } from 'graphql';
import db from '../../models/index.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const deleteProductCartMutationResolver = async (_, { productCode }, context) => {

    try {
      await isConsumer(context);

      const product = await db.Product.findOne({
        where: { productCode: productCode },
      });

      if (!product) {
        throw new Error('Product not found');
      }

      const cart = await db.Cart.findOne({
        where: { userId: context.user_id },
      });
  
      if (!cart) {
        throw new Error('Cart not found');
      }

      const cartProduct = await db.CartProduct.findOne({
        where: { CartId: cart.id, ProductId: product.id },
      });
  
      if (!cartProduct) {
        throw new Error('Product is not in the cart');
      }

      const totalPriceUpdate = cart.totalPrice - product.price * cartProduct.quantity;
      await cart.update({ totalPrice: totalPriceUpdate });

      await cartProduct.destroy();
      
      return true;  
    } 
    catch (error) 
    {
      throw new Error(error.message);  
    }
}

const deleteProductCartMutation = {
    type: GraphQLBoolean,  
    args: {
        productCode: { type: GraphQLString },  
    },
    resolve: deleteProductCartMutationResolver,
};

export default deleteProductCartMutation;