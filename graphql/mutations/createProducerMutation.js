import userInputType from '../types/userInputType.js';
import db from '../../models/index.js';
import producerType from '../types/producerType.js';
import bcrypt from 'bcrypt';
import { createProducer } from '../../core/services/createProducerService.js';

const createProducerMutationResolver = async (_, { user }, context) => {
    const createProducer1 = await createProducer(user, context);

    return createProducer1;
    
}

const createProducerMutation = {
    type: producerType,
    args: {
        user: {type: userInputType},
    },
    resolve: createProducerMutationResolver,
};

export default createProducerMutation;