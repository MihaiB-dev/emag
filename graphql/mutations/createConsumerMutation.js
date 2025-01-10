import userInputType from '../types/userInputType.js';
import db from '../../models/index.js';
import consumerType from '../types/consumerType.js';
import bcrypt from 'bcrypt';
import { createConsumer } from '../../core/services/createConsumerService.js';

const createConsumerMutationResolver = async (_, { user }, context) => {
    const isAuthorized = !!context.user_id;

    if(!isAuthorized) {
        return false;
    }
    
    const createConsumer = await createConsumer(user, context);

    return createConsumer;
    
}

const createConsumerMutation = {
    type: consumerType,
    args: {
        user: {type: userInputType},
    },
    resolve: createConsumerMutationResolver,
};

export default createConsumerMutation;