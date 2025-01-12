import { GraphQLInt, GraphQLList } from 'graphql';
import { createOrder } from '../../core/services/createOrderService.js';  
import orderType from '../types/orderType.js';
import db from '../../models/index.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const createOrderMutationResolver = async (_, {}, context) => {
    
    const isConsumer2 = await isConsumer(context);
    const order = await createOrder(context);  
    return order;
};

const createOrderMutation = {
    type: orderType,  
    resolve: createOrderMutationResolver,
};

export default createOrderMutation;
