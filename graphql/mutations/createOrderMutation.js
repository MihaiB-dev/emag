import { GraphQLInt, GraphQLList } from 'graphql';
import { createOrder } from '../../core/services/createOrderService.js';  
import orderType from '../types/orderType.js';
import db from '../../models/index.js';

const createOrderMutationResolver = async (_, {}, context) => {
    
    const order = await createOrder(context);  
    return order;
};

const createOrderMutation = {
    type: orderType,  
    resolve: createOrderMutationResolver,
};

export default createOrderMutation;
