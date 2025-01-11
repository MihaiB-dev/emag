import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import messageType from '../types/messageType.js';

const messageQueryResolver = async (_, { id }) => {
 
  const message = await db.Message.findOne({
    where: { id },
    include: [
      {
        model: db.User, 
        as: 'User', 
      },
    ],
  });

  if (!message) {
    return null;
  }

  return message;
};

const messageQuery = {
  type: messageType,
  args: {
    id: { type: GraphQLInt }, 
  },
  resolve: messageQueryResolver, 
};

export default messageQuery;
