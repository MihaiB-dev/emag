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

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation,
        login: loginMutation,
        createConsumer: createConsumerMutation,
        createProducer: createProducerMutation,
        createProduct: createProductMutation,
        createCartProduct: createCartProductMutation,
        createOrder: createOrderMutation,
        createMessage: createMessageMutation,
        deleteMessage: deleteMessageMutation,
        deleteProduct: deleteProductMutation,

    }
});


export default queryType;