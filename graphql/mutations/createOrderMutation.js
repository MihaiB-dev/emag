import { GraphQLInt, GraphQLList } from 'graphql';

import { createOrder } from '../../core/services/createOrderService.js';  
import orderType from '../types/orderType.js';

const createOrderMutationResolver = async (_, context) => {
    // const isAuthorized = !!context.user_id
   
    // if(!isAuthorized) {
    //     return false;
    // }

    const order = await createOrder(context);  
    return order;
};

const createOrderMutation = {
    type: orderType,  
    args: {},
    resolve: createOrderMutationResolver,
};

export default createOrderMutation;
