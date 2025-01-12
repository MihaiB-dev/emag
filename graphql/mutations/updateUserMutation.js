import graphql from 'graphql';
import userInputType from '../types/userInputType.js';
import userType from '../types/userType.js';
import db from '../../models/index.js';

const updateUserMutationResolver = async (_, args, context) => {
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


    const updatedUser = await user.update({
        ...args.user,
    });

    return updatedUser;
}

const updateUserMutation = {
    type: userType,
    args: {
        user: {type: userInputType},
    },
    resolve: updateUserMutationResolver,
};

export default updateUserMutation;