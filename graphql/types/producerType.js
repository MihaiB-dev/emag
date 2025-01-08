import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'
import productType from './productType.js';
import userType from './userType.js';
import {GraphQLList} from 'graphql';

const producerType = new GraphQLInputObjectType({
    name: 'Producer',
    fields: {
        user: { 
            type: userType,
            resolve: async (producer) => {
                const user = await producer.getuser();

                return user;
            }
        },

        products: { 
                    type: new GraphQLList(productType),
                    resolve: async (producer) => {
                        const products = await producer.getProducts();
                        return products;
                    }
                }
    }
});

export default producerType;