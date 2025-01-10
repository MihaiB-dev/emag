import messageType from '../types/messageType.js';
import messageInputType from '../types/messageInputType.js';
import { createMessage } from '../../core/services/createMessageService.js';
const createMessageMutationResolver = async (_, { message }, context) => {
    // const isAuthorized = !!context.user_id
   
    // if(!isAuthorized) {
    //     return false;
    // }
    
    const createdMessage = await createMessage(message, context);

    return createdMessage;
}
const createMessageMutation = {
    type: messageType,
    args: {
        message: {type: messageInputType},
    },
    resolve: createMessageMutationResolver,
};

export default createMessageMutation;
