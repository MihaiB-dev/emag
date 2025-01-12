import { GraphQLObjectType } from 'graphql';
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import postQuery from '../queries/postQuery.js';
import messageQuery from '../queries/messageQuery.js';
import messagesQuery from '../queries/messagesQuery.js';
import allProductsQuery from '../queries/allProductsQuery.js';
import singleProductQuery from '../queries/singleProductQuery.js';
import producersWithProductsQuery from '../queries/producersWithProductsQuery.js';
import salesByCategoryQuery from '../queries/SalesByCategory.js'; 
import producerStatsQuery from '../queries/producerStatsQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,
        post: postQuery,
        message: messageQuery,
        messages: messagesQuery,
        allProducts: allProductsQuery,
        singleProduct: singleProductQuery,
        producersWithProducts: producersWithProductsQuery,
        salesByCategory: salesByCategoryQuery,
        producerStats: producerStatsQuery,
    },
});


export default queryType;