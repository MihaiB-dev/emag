import {GraphQLInt} from 'graphql';
import userType from '../types/userType.js';
import db from '../../models/index.js';

const userQueryResolver = async (_,{}, context) => {
    if (!context.user_id) {
        throw new Error('You are not authorized to perform this action.');
    }
    const user = await db.User.findOne({
        where: { id: context.user_id },
    });
    

    if(!user) {
        return null;
    }

    return user;
}

const userQuery = {
    type: userType,
    resolve: userQueryResolver,
};

export default userQuery;