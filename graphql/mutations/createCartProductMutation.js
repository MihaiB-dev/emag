import { GraphQLInt, GraphQLList } from 'graphql';
import cartProductInputType from '../types/cartProductInputType.js';
import cartProductType from '../types/cartProductType.js';  
import cartType from '../types/cartType.js';

import { createCartProduct } from '../../core/services/createCartProductService.js';  

const createCartProductMutationResolver = async (_, { input }, context) => {
    // const isAuthorized = !!context.user_id
   
    // if(!isAuthorized) {
    //     return false;
    // }

    const cart = await createCartProduct(input.productCode, input.quantity, context);  
    return cart;
};

const createCartProductMutation = {
    type: cartType,  
    args: {
        input: { type: cartProductInputType }, 
    },
    resolve: createCartProductMutationResolver,
};

export default createCartProductMutation;
