import { GraphQLList } from 'graphql';
import productType from '../types/productType.js';
import db from '../../models/index.js';
import { isProducer } from '../../core/services/isProducerService.js';

const showProductsForProducerResolver = async (_, __, context) => {
    try {
        await isProducer(context);
        const producer = await db.Producer.findOne({
            where: { userId: context.user_id },
        });

        if (!producer) {
            throw new Error('Producer not found for the logged-in user.');
        }

        const products = await db.Product.findAll({
            where: { producerId: producer.id },
        });

        return products;
    } catch (error) {
        console.error('Error fetching products for producer:', error);
        throw new Error('Could not fetch products.');
    }
};

const showProductsForProducerQuery = {
    type: new GraphQLList(productType),
    resolve: showProductsForProducerResolver,
};

export default showProductsForProducerQuery;
