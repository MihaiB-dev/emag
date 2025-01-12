import { GraphQLList } from 'graphql';
import productType from '../types/productType.js';
import db from '../../models/index.js'; 
import { isConsumer } from '../../core/services/isConsumerService.js';

const allProductsResolver = async(_,{}, context) => {

  const isConsumer2 = await isConsumer(context);
  try {
    const products = await db.Product.findAll(); 
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products.');
  }
}

const allProductsQuery = {
  type: new GraphQLList(productType), 
  resolve: allProductsResolver,
};

export default allProductsQuery;
