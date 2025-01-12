import { GraphQLList } from 'graphql';
import productType from '../types/productType.js';
import db from '../../models/index.js'; 

const allProductsQuery = {
  type: new GraphQLList(productType), 
  resolve: async () => {
    try {
      const products = await db.Product.findAll(); 
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Could not fetch products.');
    }
  }
};

export default allProductsQuery;
