import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'
import productType from './productType.js';
import userType from './userType.js';
import cartType from './cartType.js';
import orderType from './orderType.js';
import {GraphQLList} from 'graphql';


const consumerType = new GraphQLObjectType({
    name: 'Consumer',
    fields: {
        user: { 
            type: userType,
            resolve: async (consumer) => {
                console.log(consumer); 
                const user = await consumer.getUser();

                return user;
            }
        },
        cart: { 
            type: cartType,
            resolve: async (consumer) => {
                const cart = await consumer.getCart();

                return cart;
            }
        },
        orders: { 
            type: new GraphQLList(orderType),
            resolve: async (consumer) => {
                const orders = await consumer.getOrders();
                return orders;
            }
        }

    }
});

export default consumerType;