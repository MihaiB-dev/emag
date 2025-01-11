import { GraphQLObjectType } from 'graphql';
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import postQuery from '../queries/postQuery.js';
import allProductsQuery from '../queries/allProductsQuery.js';
import singleProductQuery from '../queries/singleProductQuery.js';
import producersWithProductsQuery from '../queries/producersWithProductsQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,
        post: postQuery,
        allProducts: allProductsQuery,
        singleProduct: singleProductQuery,
        producersWithProducts: producersWithProductsQuery,
    },
});


export default queryType;