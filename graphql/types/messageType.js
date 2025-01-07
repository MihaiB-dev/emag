import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'
import userType from './userType.js';

const messageType = new GraphQLInputObjectType({
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