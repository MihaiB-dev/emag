import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import productType from '../types/productType.js';  
import db from '../../models/index.js'; 
import { isConsumer } from '../../core/services/isConsumerService.js';

const singleProductResolver = async (_, { productCode },context) => {
  const isConsumer2 = await isConsumer(context);
  try {
    const product = await db.Product.findOne({
      where: { productCode: productCode }
    }); 
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
    productCode: { type: GraphQLString },  
  },
  resolve: singleProductResolver,
};

export default singleProductQuery;