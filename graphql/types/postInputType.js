import {GraphQLInputObjectType, GraphQLString} from 'graphql'

const postInputType = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: {
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    }
});

export default postInputType;