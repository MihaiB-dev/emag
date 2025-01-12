import ProductType from '../types/productType.js';
import ProductInputType from '../types/ProductInputType.js';
import { createProduct } from '../../core/services/createProductService.js';
import db from '../../models/index.js';
import { isProducer } from '../../core/services/isProducerService.js';

const createProductMutationResolver = async (_, { Product }, context) => {

    const isProducer2 = await isProducer(context);
    const createdProduct = await createProduct(Product, context);
    return createdProduct;
}

const createProductMutation = {
    type: ProductType,
    args: {
        Product: {type: ProductInputType},
    },
    resolve: createProductMutationResolver,
};

export default createProductMutation;