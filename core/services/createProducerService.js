import db from '../../models/index.js';
import bcrypt from 'bcrypt';

export const createProducer = async (user, context) => {
    const password = await bcrypt.hash(user.password, 5);

    const createdUser = await db.User.create({
        name: user.name,
        password: password,
    });

    const createdProducer = await db.Producer.create({
        userId: createdUser.id,
    });

    return createdProducer;
}