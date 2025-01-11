import {GraphQLInputObjectType, GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import {GraphQLList} from 'graphql';
import userType from './userType.js';
import orderProductType from './orderProductType.js';


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
        orderProducts: { 
                    type: new GraphQLList(orderProductType),
                    resolve: async (order) => {
                        const orderProducts = await order.getOrderProducts();
                        return orderProducts;
                    }
                },
        totalPrice: { type: GraphQLInt },
        status: { type: GraphQLString },
        comingDate: { type: GraphQLString },
        orderDate: { type: GraphQLString },
    }
});

export default orderType;