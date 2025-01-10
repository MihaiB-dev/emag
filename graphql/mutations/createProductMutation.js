import ProductType from '../types/productType.js';
import ProductInputType from '../types/ProductInputType.js';
import { createProduct } from '../../core/services/createProductService.js';

const createProductMutationResolver = async (_, { Product }, context) => {
    // const isAuthorized = !!context.user_id
   
    // if(!isAuthorized) {
    //     return false;
    // }
    
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