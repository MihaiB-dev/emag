import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'
import userType from './userType.js';
import {GraphQLFloat} from 'graphql';

const messageType = new GraphQLObjectType({ //GraphQLInputObjectType
    name: 'Message',
    fields: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        reviewStars: { type: GraphQLFloat },
        date: { type: GraphQLString },
        //add user
        user: { 
            type: userType,
            resolve: async (message) => {
                const user = await message.getUser();
                return user;
            }
        },
    }

});

export default messageType;