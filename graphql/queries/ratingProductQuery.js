import { GraphQLFloat, GraphQLNonNull, GraphQLString } from 'graphql';
import db from '../../models/index.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const ratingProductQueryResolver = async (_, { productCode }, context) => {
  try {
    await isConsumer(context);
    const product = await db.Product.findOne({ where: { productCode } });

    if (!product) {
      throw new Error('Product not found');
    }

    console.log(db.Message);

    const messages = await db.Message.findAll({ where: { productId: product.id } });

    if (messages.length === 0) {
      throw new Error('No reviews found for this product');
    }

    const totalStars = messages.reduce((sum, message) => sum + message.reviewStars, 0);
    const averageStars = totalStars / messages.length;

    return parseFloat(averageStars.toFixed(1));
  } catch (error) {
    console.error('Error calculating product rating:', error);
    throw new Error('Could not calculate product rating');
  }
};

const ratingProductQuery = {
  type: GraphQLFloat, 
  args: {
    productCode: { type: new GraphQLNonNull(GraphQLString) }, 
  },
  resolve: ratingProductQueryResolver, 
};

export default ratingProductQuery;