// import { GraphQLList, GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
// import db from '../../models/index.js'; 
// import { isConsumer } from '../../core/services/isConsumerService.js';

// const tagWithProductCountType = new GraphQLObjectType({
//   name: 'TagWithProductCount',
//   fields: {
//     tagName: { type: GraphQLString },
//     productCount: { type: GraphQLInt },
//   },
// });

// const allTagsResolver = async (_, {}, context) => {

//   await isConsumer(context);

//   const tags = await db.Tag.findAll({
//     attributes: [
//       'name', 
//       [db.Sequelize.fn('COUNT', db.Sequelize.col('Products.id')), 'productCount'], 
//     ],
//     include: [
//       {
//         model: db.Product,
//         attributes: [], 
//       },
//     ],
//     group: ['Tag.id'], 
//   });

//   return tags.map(tag => ({
//     tagName: tag.name,
//     productCount: tag.dataValues.productCount,
//   }));
// };

// const allCategoriesQuery = {
//   type: new GraphQLList(tagWithProductCountType), 
//   resolve: allTagsResolver,
// };

// export default allCategoriesQuery;
