import { GraphQLList, GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import db from '../../models/index.js';
import { isConsumer } from '../../core/services/isConsumerService.js';

const CategoryWithProductCountType = new GraphQLObjectType({
  name: 'CategoryWithProductCount',
  fields: {
    name: { type: GraphQLString },
    productCount: { type: GraphQLInt },
  },
});

const allCategoriesWithProductCountResolver = async (_,{},context) => {
  try {
    await isConsumer(context);
    const categories = await db.Tag.findAll({
      attributes: [
        'name', 
        [db.Sequelize.fn('COUNT', db.Sequelize.col('Products.id')), 'productCount'],
      ],
      include: [
        {
          model: db.Product,
          attributes: [], 
        },
      ],
      group: ['Tag.id'],
    });

    return categories.map((category) => ({
      name: category.name,
      productCount: category.dataValues.productCount,
    }));
  } catch (error) {
    throw new Error('Error fetching categories with product count: ' + error.message);
  }
};

const allCategoriesWithProductCountQuery = {
  type: new GraphQLList(CategoryWithProductCountType),
  resolve: allCategoriesWithProductCountResolver,
};

export default allCategoriesWithProductCountQuery;
