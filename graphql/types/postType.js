import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import userType from './userType.js';

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        author: { 
            type: userType,
            resolve: async (post) => {
                const user = await post.getUser();

                return user;
            }
        },
    }
});

export default postType;