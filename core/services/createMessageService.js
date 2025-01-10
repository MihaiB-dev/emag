import db from '../../models/index.js';

export const createMessage = async (message, context) => {
    if (message.reviewStars < 0 || message.reviewStars > 5 || message.reviewStars % 0.5 !== 0) {
        throw new Error('Review stars must be between 0 and 5 and divisible by 0.5');
    }

    const createdMessage = await db.Message.create({
        title: message.title,
        description: message.description,
        reviewStars: message.reviewStars,
        userId: context.user_id,
        productId: message.productId
    });
    console.log(createdMessage);
    return createdMessage;
}