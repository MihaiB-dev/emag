import { GraphQLInt } from 'graphql';
import { Op } from 'sequelize';
import db from '../../models/index.js';

const salesByCategoryResolver = async (_, { tagId }) => {
 
  console.log(`Fetching products for tagId: ${tagId}`);
  const products = await db.Product.findAll({
    where: { tagId },
    attributes: ['id', 'price'],
  });

  if (products.length === 0) {
    throw new Error('No products found for this category');
  }

  const productMap = products.reduce((map, product) => {
    map[product.id] = product; 
    return map;
  }, {});

  console.log('Product Map:', productMap); 

  const productIds = products.map((product) => product.id);
  console.log('Product IDs:', productIds); 

  const salesData = await db.OrderProduct.findAll({
    where: {
      productId: { [Op.in]: productIds }, 
    },
    attributes: [
      'productId',
      [db.Sequelize.fn('SUM', db.Sequelize.col('quantity')), 'totalQuantity'],
    ],
    group: ['productId'], 
  });

  console.log('Sales Data:', salesData); 

  salesData.forEach((item, index) => {
    console.log(`SalesData item ${index}:`, item.get()); 
  });

  const totalSales = salesData.reduce((sum, item) => {
    const productId = item.get('productId'); 
    const totalQuantity = parseInt(item.get('totalQuantity'), 10) || 0;
    
    const product = productMap[productId];

    console.log(`Checking for productId ${productId}:`, product); 

    if (product && product.price !== undefined) {
      console.log(`Calculating sales for productId ${productId}:`, {
        quantity: totalQuantity,
        price: product.price,
      });
      return sum + totalQuantity * product.price;
    } else {
      console.log(`Product not found for productId ${productId}`);
      return sum;
    }
  }, 0);

  console.log('Total Sales:', totalSales);

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
