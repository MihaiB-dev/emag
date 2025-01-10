//create message input type
import {GraphQLInputObjectType, GraphQLFloat, GraphQLInt, GraphQLString} from 'graphql';

const messageInputType = new GraphQLInputObjectType({
    name: 'MessageInput',
    fields: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        reviewStars: { type: GraphQLFloat },
        productId: { type: GraphQLInt }
    }
});

export default messageInputType;