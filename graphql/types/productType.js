import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import producerType from './producerType.js';
import messageType from './messageType.js';

const productType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        picture: { type: GraphQLString },
        price: { type: GraphQLInt },
        productCode: { type: GraphQLString },
        stock: { type: GraphQLInt },
        producer: { 
            type: producerType,
            resolve: async (product) => {
                const user = await product.getProducer();

                return user;
            }
        },
        messages: { 
            type: new GraphQLList(messageType),
            resolve: async (product) => {
                const messages = await product.getMessages();
                return messages;
            }
        },
    }
});

export default productType;