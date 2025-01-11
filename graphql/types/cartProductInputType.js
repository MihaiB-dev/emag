import {GraphQLInputObjectType, GraphQLObjectType,  GraphQLInt, GraphQLString} from 'graphql'
import {GraphQLList} from 'graphql';

const cartProductInputType = new GraphQLInputObjectType({ //GraphQLInputObjectType
    name: 'CartProductInput',
    fields: {
        quantity: { type: GraphQLInt },
        productCode: { type: GraphQLString },
        
    }
});

export default cartProductInputType;