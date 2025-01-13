import { GraphQLFloat, GraphQLNonNull, GraphQLString } from 'graphql';
import db from '../../models/index.js';

// Resolver function for the query
const ratingProductQueryResolver = async (_, { productCode }) => {
  try {
    // Fetch the product based on productCode
    const product = await db.Product.findOne({ where: { productCode } });

    if (!product) {
      throw new Error('Product not found');
    }

    console.log(db.Message);

    // Fetch messages associated with the product
    const messages = await db.Message.findAll({ where: { productId: product.id } });

    if (messages.length === 0) {
      throw new Error('No reviews found for this product');
    }

    // Calculate the average review stars
    const totalStars = messages.reduce((sum, message) => sum + message.reviewStars, 0);
    const averageStars = totalStars / messages.length;

    // Return the result rounded to one decimal place
    return parseFloat(averageStars.toFixed(1));
  } catch (error) {
    console.error('Error calculating product rating:', error);
    throw new Error('Could not calculate product rating');
  }
};

// Define the GraphQL query
const ratingProductQuery = {
  type: GraphQLFloat, // Return type is Float
  args: {
    productCode: { type: new GraphQLNonNull(GraphQLString) }, // Input argument: productCode
  },
  resolve: ratingProductQueryResolver, // Resolver function
};

export default ratingProductQuery;