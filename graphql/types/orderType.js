import {GraphQLInputObjectType, GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import {GraphQLList} from 'graphql';
import userType from './userType.js';
import orderProductType from './orderProductType.js';


const orderType = new GraphQLObjectType({ 
    name: 'Order',
    fields: {
        user: { 
            type: userType,
            resolve: async (order) => {
                const user = await order.getUser();
                return user;
            }
        },
        totalPrice: { type: GraphQLInt },
        status: { type: GraphQLString },
        comingDate: { type: GraphQLString },
        orderDate: { type: GraphQLString },
    }
});

export default orderType;