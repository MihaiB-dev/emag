import { GraphQLObjectType } from 'graphql';
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import postQuery from '../queries/postQuery.js';
import messageQuery from '../queries/messageQuery.js';
import messagesQuery from '../queries/messagesQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,
        post: postQuery,
        message: messageQuery,
        messages: messagesQuery,

    },
});


export default queryType;