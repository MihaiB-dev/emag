import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'
import productType from './productType.js';

const producerType = new GraphQLInputObjectType({
    name: 'Producer',
    fields: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },

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