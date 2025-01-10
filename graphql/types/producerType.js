import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'
import productType from './productType.js';
import userType from './userType.js';
import {GraphQLList} from 'graphql';

const producerType = new GraphQLObjectType({
    name: 'Producer',
    fields: {
        user: { 
            type: userType,
            resolve: async (producer) => {
                const user = await producer.getUser();

                return user;
            }
        },
    }
});

export default producerType;