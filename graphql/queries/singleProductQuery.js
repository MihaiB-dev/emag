import { GraphQLInt, GraphQLObjectType } from 'graphql';
import productType from '../types/productType.js';  
import db from '../../models/index.js'; 
import { isConsumer } from '../../core/services/isConsumerService.js';

const singleProductResolver = async (_, { id },context) => {
  const isConsumer2 = await isConsumer(context);
  try {
    const product = await db.Product.findByPk(id); 
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

const singleProductQuery = {
  type: productType, 
  args: {
    id: { type: GraphQLInt },  
  },
  resolve: singleProductResolver,
};

export default singleProductQuery;