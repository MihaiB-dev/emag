import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';

const deleteMessageMutationResolver = async (_, { id }, context) => {
  try {
    const message = await db.Message.findByPk(id);

    if (!message) {
      throw new Error('Message not found');
    }

    if (message.userId !== context.user_id) {
      throw new Error('You are not authorized to delete this message');
    }

    await message.destroy();

    return true;
  } catch (error) {
    return false;
  }
};

const deleteMessageMutation = {
    type: GraphQLBoolean, 
    args: {
      id: { type: GraphQLInt },
    },
    resolve: deleteMessageMutationResolver,
};

export default deleteMessageMutation;