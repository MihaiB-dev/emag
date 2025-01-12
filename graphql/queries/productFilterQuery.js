import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import { Op } from 'sequelize';
import productType from '../types/productType.js'; // Use productType directly
import db from '../../models/index.js';

// Resolver for filtering products by producer and tags
const productFilterResolver = async (_, { tagString, tagStrings, maxStock }, context) => {

  const isProducer2 = await isProducer(context);
  const producerId = await db.Producer.findOne({
    where: { userId: context.user_id },
  });

  if (!producerId) {
    throw new Error('You must provide a producerId.');
  }

  // Build the `where` conditions dynamically
  const whereConditions = { producerId };

  // Step 1: Filter by tag strings
  //first letter is uppercase
  if (tagString) {
    tagString = tagString.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    const tag = await db.Tag.findOne({
      where: { name: tagString  }, // Case-insensitive search
    });

    if (!tag) {
      throw new Error(`Tag "${tagString}" not found.`);
    }
    whereConditions.tagId = tag.id;
  }
  if (tagStrings && tagStrings.length > 0) {
    tagStrings = tagStrings.map((tagString) => tagString.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase()));
    const tags = await db.Tag.findAll({
      where: { name: { [Op.in]: tagStrings } },
      attributes: ['id'],
    });

    const tagIds = tags.map((tag) => tag.id);

    if (tagIds.length === 0) {
      throw new Error(`No tags found for the provided list: ${tagStrings.join(', ')}`);
    }
    whereConditions.tagId = { [Op.in]: tagIds };
  }

  if (maxStock !== undefined) {
    whereConditions.stock = { [Op.lt]: maxStock };
  }

  const filteredProducts = await db.Product.findAll({
    where: whereConditions,
    include: [
      { model: db.Producer },
      { model: db.Tag },
    ],
  });

  return filteredProducts;
};


const productFilterQuery = {
  type: new GraphQLList(productType),
  args: {
    tagString: { type: GraphQLString }, // Optional
    tagStrings: { type: new GraphQLList(GraphQLString) }, // Optional
    maxStock: { type: GraphQLInt }, // Optional
  },
  resolve: productFilterResolver,
};

export default productFilterQuery;
