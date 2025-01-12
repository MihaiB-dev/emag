import { GraphQLBoolean, GraphQLString } from 'graphql';
import db from '../../models/index.js';
import { isProducer } from '../../core/services/isProducerService.js';

const deleteProductMutation = {
  type: GraphQLBoolean,  
  args: {
    productCode: { type: GraphQLString },  
  },
  resolve: async (_, { productCode }, context) => {
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

      await product.destroy();

      return true;  
    } catch (error) {
      throw new Error(error.message);  
    }
  },
};

export default deleteProductMutation;
