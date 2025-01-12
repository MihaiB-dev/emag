import graphql from 'graphql';
import createUserMutation from '../mutations/createUserMutation.js';
import updateUserMutation from '../mutations/updateUserMutation.js';
import deleteUserMutation from '../mutations/deleteUserMutation.js';
import loginMutation from '../mutations/loginMutation.js';
import createPostMutation from '../mutations/createPostMutation.js';
import createConsumerMutation from '../mutations/createConsumerMutation.js';
import createProducerMutation from '../mutations/createProducerMutation.js';
import createProductMutation from '../mutations/createProductMutation.js';
import createCartProductMutation from '../mutations/createCartProductMutation.js';
import createMessageMutation from '../mutations/createMessageMutation.js';
import createOrderMutation from '../mutations/createOrderMutation.js';
import deleteMessageMutation from '../mutations/deleteMessageMutation.js';

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation,
        login: loginMutation,
        createPost: createPostMutation,
        createConsumer: createConsumerMutation,
        createProducer: createProducerMutation,
        createProduct: createProductMutation,
        createCartProduct: createCartProductMutation,
        createOrder: createOrderMutation,
        createMessage: createMessageMutation,
        deleteMessage: deleteMessageMutation,

    }
});


export default queryType;