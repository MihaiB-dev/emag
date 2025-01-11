import { GraphQLObjectType, GraphQLList } from 'graphql';
import userType from './userType.js';

const producerType = new GraphQLObjectType({
  name: 'Producer',
  fields: {
    user: { 
      type: userType,
      resolve: async (producer) => {
        const user = await producer.getUser();
        return user;
      }
    }
  }
});

export default producerType;
