import { GraphQLObjectType } from 'graphql';
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import messagesQuery from '../queries/messagesQuery.js';
import allProductsQuery from '../queries/allProductsQuery.js';
import singleProductQuery from '../queries/singleProductQuery.js';
import producersWithProductsQuery from '../queries/producersWithProductsQuery.js';
import salesByCategoryQuery from '../queries/SalesByCategory.js'; 
import producerStatsQuery from '../queries/producerStatsQuery.js';
import productFilterQuery from '../queries/productFilterQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,
        messages: messagesQuery,
        allProducts: allProductsQuery,
        singleProduct: singleProductQuery,
        producersWithProducts: producersWithProductsQuery,
        salesByCategory: salesByCategoryQuery,
        producerStats: producerStatsQuery,
        productFilter: productFilterQuery,
    },
});


export default queryType;