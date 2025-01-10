import userInputType from '../types/userInputType.js';
import db from '../../models/index.js';
import consumerType from '../types/consumerType.js';
import bcrypt from 'bcrypt';
import { createConsumer } from '../../core/services/createConsumerService.js';

const createConsumerMutationResolver = async (_, { user }, context) => {
    const createConsumer1 = await createConsumer(user, context);

    return createConsumer1;
    
}

const createConsumerMutation = {
    type: consumerType,
    args: {
        user: {type: userInputType},
    },
    resolve: createConsumerMutationResolver,
};

export default createConsumerMutation;