import {GraphQLBoolean} from 'graphql';
import db from '../../models/index.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const deleteConsumerResolver = async (_, {}, context) => {
     try {
        if (!context.user_id) {
            throw new Error('You must be logged in to update your information.');
        }
        await isConsumer(context);

        const userId = context.user_id; 
        
        const existingOrders = await db.Order.findOne({ where: { userId } });
        if (existingOrders) {
            throw new Error('Cannot delete consumer with active orders.');
        }

        const cart = await db.Cart.findOne({ where: { userId: userId } });
        
        if (cart) {
            await db.CartProduct.destroy({ where: { CartId: cart.id } });
            await cart.destroy();
        }

        await db.Message.destroy({ where: { userId: userId } });

        await db.Consumer.destroy({where: { userId: userId }});
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
        throw new Error('User not found.');
        }
        await user.destroy();
        return true;
     
        } 
        catch (error) 
        {
          throw new Error(error.message);  
        }
}

const deleteConsumerMutation = {
    type: GraphQLBoolean,
    resolve: deleteConsumerResolver,
};

export default deleteConsumerMutation;