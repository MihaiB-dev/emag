import db from '../../models/index.js';

export const isProducer = async (context) => {
    if (!context.user_id) {
        throw new Error('You are not authorized to perform this action.');
    }

    const producer = await db.Producer.findOne({
        where: { id: context.user_id },
    });

    if (!producer) {
        throw new Error('You are not a producer.');
    }

    return true;
};
