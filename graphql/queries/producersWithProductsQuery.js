import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import ProductProducersOutputType from '../types/productProducersOutputType.js';

const producersWithProductsQuery = {
  type: new GraphQLList(ProductProducersOutputType),
  resolve: async () => {
    try {
      // Fetch all producers
      const producers = await db.Producer.findAll();

      // Map over producers and fetch their associated products
      const producersWithProducts = await Promise.all(
        producers.map(async (producer) => {
          const products = await db.Product.findAll({ where: { producerId: producer.id } });

          return {
            producerType: producer,
            products,
          };
        })
      );

      return producersWithProducts;
    } catch (error) {
      console.error('Error fetching producers:', error);
      throw new Error('Could not fetch producers.');
    }
  }
};

export default producersWithProductsQuery;
