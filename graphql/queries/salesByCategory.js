import { GraphQLInt } from 'graphql';
import { Op } from 'sequelize';
import db from '../../models/index.js';


const salesByCategoryResolver = async (_, { tagId }) => {
  const products = await db.Product.findAll({
    where: { tagId },
    attributes: ['id', 'price'], 
  });

  if (products.length === 0) {
    throw new Error('No products found for this category');
  }

  const productIds = products.map((product) => product.id);

  const salesData = await db.OrderProduct.findAll({
    where: {
      productId: { [Op.in]: productIds },
    },
    attributes: ['productId', [db.Sequelize.fn('SUM', db.Sequelize.col('quantity')), 'totalQuantity']],
    group: ['productId'], 
  });

  const totalSales = salesData.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + item.get('totalQuantity') * (product ? product.price : 0);
  }, 0);

  return totalSales;
};

const salesByCategory = {
  type: GraphQLInt, 
  args: {
    tagId: { type: GraphQLInt },
  },
  resolve: salesByCategoryResolver,
};

export default salesByCategory;
