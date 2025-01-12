import { GraphQLList } from 'graphql';
import userType from '../types/userType.js';
import db from '../../models/index.js';
import { isProducer } from '../../core/services/isProducerService.js';

const usersQueryResolver = async (_,{}, context) => {
    if (!context.user_id) {
        throw new Error('You are not authorized to perform this action.');
    }
    const isProducer2 = await isProducer(context);
    const users = await db.User.findAll();

    return users;
}

const usersQuery = {
    type: new GraphQLList(userType),
    resolve: usersQueryResolver,
};

export default usersQuery;