import { GraphQLInt, GraphQLObjectType } from 'graphql';
import productType from '../types/productType.js';  
import db from '../../models/index.js'; 

const singleProductQuery = {
  type: productType, 
  args: {
    id: { type: GraphQLInt },  
  },
  resolve: async (_, { id }) => {
    try {
      const product = await db.Product.findByPk(id); 
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default singleProductQuery;