import { GraphQLObjectType, GraphQLInt, GraphQLList } from 'graphql';
import producerType from '../producerType.js';
import ProductStatsType from './productStatsType.js';
import db from '../../../models/index.js';

const ProducerStatsType = new GraphQLObjectType({
  name: 'ProducerStats',
  fields: {
    producer: {
      type: producerType,
      resolve: async (_) => {
        return db.Producer.findByPk(_.producerId, {
          include: [db.User],
        });
      },
    },

    monthlyIncome: { type: GraphQLInt },
    productStats: {
      type: new GraphQLList(ProductStatsType),
    },
  },
});

export default ProducerStatsType;
