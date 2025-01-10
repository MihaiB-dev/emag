import {GraphQLInputObjectType, GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import {GraphQLList} from 'graphql';
import userType from './userType.js';
import productType from './productType.js';


const orderType = new GraphQLObjectType({ //GraphQLInputObjectType
    name: 'Order',
    fields: {
        user: { 
            type: userType,
            resolve: async (order) => {
                const user = await order.getuser();

                return user;
            }
        },

        products: { 
                    type: new GraphQLList(productType),
                    resolve: async (order) => {
                        const products = await order.getProducts();
                        return products;
                    }
                },
        totalPrice: { type: GraphQLInt },
        status: { type: GraphQLString },
        comingDate: { type: GraphQLString },
        orderDate: { type: GraphQLString },
    }
});

export default orderType;