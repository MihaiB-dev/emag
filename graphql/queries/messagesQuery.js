import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import messageType from '../types/messageType.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const messagesQueryResolver = async (_, {}, context) => {

  const isConsumer2 = await isConsumer(context);
  const messages = await db.Message.findAll({
    where: { userId: context.user_id }, 
  });

  return messages;
};


const messagesQuery = {
  type: new GraphQLList(messageType), 
  resolve: messagesQueryResolver,
};

export default messagesQuery;