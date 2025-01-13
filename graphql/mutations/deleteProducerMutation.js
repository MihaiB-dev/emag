import { GraphQLBoolean } from 'graphql';
import db from '../../models/index.js';
import { isProducer } from '../../core/services/isProducerService.js';
import deleteProductMutation from './deleteProductMutation.js'; 

const deleteProducerResolver = async (_, {}, context) => {
  try {
    if (!context.user_id) {
      throw new Error('You must be logged in to perform this action.');
    }

    await isProducer(context);

    const producer = await db.Producer.findOne({ where: { userId: context.user_id } });
    if (!producer) {
      throw new Error('Producer not found.');
    }
    
    const producerId = producer.id;
    const products = await db.Product.findAll({ where: { producerId: producerId } });

    for (const product of products) {
      await deleteProductMutation.resolve(
        null, 
        { productCode: product.productCode }, 
        context 
      );
    }

    await producer.destroy();
    const user = await db.User.findOne({ where: { id: context.user_id} });
    if (!user) {
        throw new Error('User not found.');
    }
    await user.destroy();
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProducerMutation = {
  type: GraphQLBoolean,
  resolve: deleteProducerResolver,
};

export default deleteProducerMutation;
