import graphql from 'graphql';
import updateUserMutation from '../mutations/updateUserMutation.js';
import deleteUserMutation from '../mutations/deleteUserMutation.js';
import loginMutation from '../mutations/loginMutation.js';
import createConsumerMutation from '../mutations/createConsumerMutation.js';
import createProducerMutation from '../mutations/createProducerMutation.js';
import createProductMutation from '../mutations/createProductMutation.js';
import createCartProductMutation from '../mutations/createCartProductMutation.js';
import createMessageMutation from '../mutations/createMessageMutation.js';
import createOrderMutation from '../mutations/createOrderMutation.js';
import deleteMessageMutation from '../mutations/deleteMessageMutation.js';
import deleteProductMutation from '../mutations/deleteProductMutation.js';
import deleteProductCartMutation from '../mutations/deleteProductCartMutation.js';
import deleteOrderMutation from '../mutations/deleteOrderMutation.js';
import deleteConsumerMutation from '../mutations/deleteConsumerMutation.js';
import deleteProducerMutation from '../mutations/deleteProducerMutation.js';
import updateProductStockMutation from '../mutations/updateProductStockMutation.js';

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        updateUser: updateUserMutation,
        login: loginMutation,
        createConsumer: createConsumerMutation,
        createProducer: createProducerMutation,
        createProduct: createProductMutation,
        createCartProduct: createCartProductMutation,
        createOrder: createOrderMutation,
        createMessage: createMessageMutation,
        deleteMessage: deleteMessageMutation,
        deleteProduct: deleteProductMutation,
        deleteProductCart: deleteProductCartMutation,
        deleteOrder: deleteOrderMutation,
        deleteConsumer: deleteConsumerMutation,
        deleteProducer: deleteProducerMutation,
        updateProductStock: updateProductStockMutation,
    }
});


export default queryType;