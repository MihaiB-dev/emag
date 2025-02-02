import {GraphQLInputObjectType, GraphQLObjectType,  GraphQLInt, GraphQLString} from 'graphql'
import producerType from './producerType.js';
import messageType from './messageType.js';
import tagType from './tagType.js';
import {GraphQLList} from 'graphql';

const productType = new GraphQLObjectType({ //GraphQLInputObjectType
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
                console.log('product', product);
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
        
        tag: {
            type: tagType,
            resolve: async (product) => {
                const tag = await product.getTag();

                return tag;
            }
        }
    }
});

export default productType;