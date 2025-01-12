import { GraphQLInt } from 'graphql';
import { Op } from 'sequelize';
import ProducerStatsType from '../types/stats/producerStatsType.js';
import db from '../../models/index.js'; 
import { isProducer } from '../../core/services/isProducerService.js';

const producerStatsResolver = async (_, { producerId }) => {
    const isProducer2 = await isProducer(context);
    if (!producerId) {
      throw new Error('You must provide a producerId');
    }

    // ----------------------------------------------------------
    // 1) Calculate "monthly income" for this producer
    // ----------------------------------------------------------

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    //get all the orders with the products only for this producer
    const monthlyOrders = await db.Order.findAll({
      where: {
        orderDate: {
          [Op.gte]: startOfMonth, //greather and equal than start of month
          [Op.lte]: endOfMonth, //leser and equal than end of month
        },
      },
      include: [
        {
          model: db.Product,
          where: { producerId },
          through: { attributes: ['quantity'] },
        },
      ],
    });

    let monthlyIncome = 0;
    // ----------------------------------------------------------
    // 2) Build productStats for each product
    // ----------------------------------------------------------

    const producerProducts = await db.Product.findAll({
      where: { producerId },
    });

    const productStatsMap = {};
    producerProducts.forEach((product) => {
      productStatsMap[product.id] = { // all the fields that are in the ProductStatsType
        productId: product.id,
        quantitySold: 0,
        income: 0,
        quantityRemaining: product.stock,
        quantityInOrder: 0,
      };
    });

    // For each order, decide if it's "completed" (comingDate <= now) or "in transit", etc.
    monthlyOrders.forEach((order) => {
      const isCompleted = order.comingDate <= new Date();
      order.Products.forEach((product) => {
        const stats = productStatsMap[product.id];
        if (!stats) return;

        const qty = product.OrderProduct.quantity;
        if (isCompleted) {
          stats.quantitySold += qty;
          monthlyIncome += product.price * qty;
          stats.income += product.price * qty;
        }else{
            stats.quantityInOrder += qty;
        } 
      });
    });

    const productStatsArray = Object.values(productStatsMap);

    return {
      producerId,
      monthlyIncome,
      productStats: productStatsArray,
    };
  };

const producerStatsQuery = {
  type: ProducerStatsType,
  args: {
    producerId: { type: GraphQLInt },
  },
  resolve: producerStatsResolver,
};

export default producerStatsQuery;
