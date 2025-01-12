import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../models/index.js';

const deleteUserResolver = async (_, {}, context) => {
    if (!context.user_id) {
        throw new Error('You must be logged in to update your information.');
    }
    
    const userId = context.user_id; 
    
    const user = await db.User.findOne({
        where: {
            id: userId,
        },
    });
    
    if (!user) {
       throw new Error('User not found.');
    }

    await user.destroy();
    return true;
}

const deleteUserMutation = {
    type: GraphQLBoolean,
    resolve: deleteUserResolver,
};

export default deleteUserMutation;