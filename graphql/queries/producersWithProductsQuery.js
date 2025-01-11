import { GraphQLList } from 'graphql';
import producerType from '../types/producerType.js';  
import db from '../../models/index.js';

const producersWithProductsQuery = {
  type: new GraphQLList(producerType),  
  resolve: async () => {
    try {
      // Fetch all producers
      const producers = await db.Producer.findAll({
        include: {
          model: db.Product,  
          as: 'products'   
        }
      });
      return producers;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default producersWithProductsQuery;
