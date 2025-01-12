import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import messageType from '../types/messageType.js';

const messagesQueryResolver = async () => {
  
  const messages = await db.Message.findAll({
    include: [
      {
        model: db.User,
        as: 'User', 
      },
    ],
  });

  return messages;
};

const messagesQuery = {
  type: new GraphQLList(messageType), 
  resolve: messagesQueryResolver,
};

export default messagesQuery;