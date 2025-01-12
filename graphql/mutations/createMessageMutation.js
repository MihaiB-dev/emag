import messageType from '../types/messageType.js';
import messageInputType from '../types/messageInputType.js';
import { createMessage } from '../../core/services/createMessageService.js';
import db from '../../models/index.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const createMessageMutationResolver = async (_, { message }, context) => {
    const isConsumer2 = await isConsumer(context);
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
