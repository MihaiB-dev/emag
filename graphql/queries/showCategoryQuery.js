import { GraphQLList, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLFloat } from 'graphql';
import db from '../../models/index.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const ProductWithRatingType = new GraphQLObjectType({
  name: 'ProductWithRating2',
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

const CategoryWithProductsType = new GraphQLObjectType({
  name: 'CategoryWithProducts',
  fields: {
    categoryName: { type: GraphQLString },
    products: { type: new GraphQLList(ProductWithRatingType) },
  },
});

const showCategoryResolver = async (_, { categoryName }, context) => {
  try {
    await isConsumer(context); 

    const tag = await db.Tag.findOne({
      where: { name: categoryName },
    });

    if (!tag) {
      throw new Error(`Category '${categoryName}' not found`);
    }

    const products = await db.Product.findAll({
      where: { tagId: tag.id },
    });

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

    return {
      categoryName: tag.name,
      products: productsWithRatings,
    };
  } catch (error) {
    throw new Error('Error fetching category: ' + error.message);
  }
};

const showCategoryQuery = {
  type: CategoryWithProductsType,
  args: {
    categoryName: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: showCategoryResolver,
};

export default showCategoryQuery;
