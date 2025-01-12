import db from '../../models/index.js';

export const isConsumer = async (context) => {
    if (!context.user_id) {
        throw new Error('You are not authorized to perform this action.');
    }

    const consumer = await db.Consumer.findOne({
        where: { userId: context.user_id },
    });

    if (!consumer) {
        throw new Error('You are not a consumer.');
    }

    return true;
};
