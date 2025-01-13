import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import { GraphQLFloat, GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';

const ProductWithRatingType = new GraphQLObjectType({
  name: 'ProductWithRating',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    picture: { type: GraphQLString },
    price: { type: GraphQLInt },
    productCode: { type: GraphQLString },
    stock: { type: GraphQLInt },
    averageRating: { type: GraphQLFloat },
  },
});

const showOrderedProductsByRatingQueryResolver = async () => {
  try {
    const products = await db.Product.findAll();

    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const messages = await db.Message.findAll({ where: { productId: product.id } });

        const totalStars = messages.reduce((sum, message) => sum + message.reviewStars, 0);
        const averageStars = messages.length > 0 ? totalStars / messages.length : 0;

        return {
          ...product.toJSON(),
          averageRating: parseFloat(averageStars.toFixed(1)), 
        };
      })
    );

    productsWithRatings.sort((a, b) => b.averageRating - a.averageRating);

    return productsWithRatings;
  } catch (error) {
    console.error('Error fetching products by rating:', error);
    throw new Error('Could not fetch products by rating.');
  }
};

const showOrderedProductsByRatingQuery = {
  type: new GraphQLList(ProductWithRatingType),
  resolve: showOrderedProductsByRatingQueryResolver,
};

export default showOrderedProductsByRatingQuery;
