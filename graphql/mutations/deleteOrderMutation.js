import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const deleteOrderMutationResolver = async (_, { orderId }, context) => {

    try {
      await isConsumer(context);

      const order = await db.Order.findOne({
        where: { id: orderId, userId: context.user_id },
      });
  
      if (!order) {
        throw new Error('Order not found');
      }

      await db.OrderProduct.destroy({
        where: { orderId: order.id },
      });

      await order.destroy();
      
      return true;  
    } 
    catch (error) 
    {
      throw new Error(error.message);  
    }
}

const deleteOrderMutation = {
    type: GraphQLBoolean,  
    args: {
        orderId: { type: GraphQLInt },  
    },
    resolve: deleteOrderMutationResolver,
};

export default deleteOrderMutation;