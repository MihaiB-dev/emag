import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import ProductProducersOutputType from '../types/productProducersOutputType.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const producersWithProductsResolver = async (_,{},context) => {
  const isConsumer2 = await isConsumer(context);
  try {
    const producers = await db.Producer.findAll();
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

const producersWithProductsQuery = {
  type: new GraphQLList(ProductProducersOutputType),
  resolve: producersWithProductsResolver,
};

export default producersWithProductsQuery;
