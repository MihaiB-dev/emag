import {GraphQLInputObjectType, GraphQLObjectType,  GraphQLInt, GraphQLString} from 'graphql'
import producerType from './producerType.js';
import messageType from './messageType.js';
import tagType from './tagType.js';
import {GraphQLList} from 'graphql';

const productInputType = new GraphQLInputObjectType({ //GraphQLInputObjectType
    name: 'ProductInput',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        picture: { type: GraphQLString },
        price: { type: GraphQLInt },
        productCode: { type: GraphQLString },
        stock: { type: GraphQLInt },
        tag: { type: GraphQLString }
    }
});

export default productInputType;