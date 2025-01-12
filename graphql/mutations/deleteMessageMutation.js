import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';

const deleteMessageMutation = {
  type: GraphQLBoolean, 
  args: {
    id: { type: GraphQLInt }, 
  },
  resolve: async (_, { id }) => {
    try {
      const message = await db.Message.findByPk(id);
      if (!message) {
        return false; 
      }

      await message.destroy();
      return true; 
    } catch (error) {
      return false; 
    }
  },
};

export default deleteMessageMutation;
