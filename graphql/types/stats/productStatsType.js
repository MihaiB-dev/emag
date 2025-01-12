import { GraphQLObjectType, GraphQLInt } from 'graphql';
import productType from '../productType.js';
import db from '../../../models/index.js';  // <-- Adjust path to your models

const ProductStatsType = new GraphQLObjectType({
  name: 'ProductStats',
  fields: {
    product: {
      type: productType,
      resolve: async (_) => {
        return db.Product.findByPk(_.productId);
      },
    },

    quantitySold: { type: GraphQLInt },
    income: { type: GraphQLInt },
    quantityRemaining: { type: GraphQLInt },
    quantityInOrder: { type: GraphQLInt },
  },
});

export default ProductStatsType;
