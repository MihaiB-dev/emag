import ProductType from '../types/productType.js';
import { GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql';
import db from '../../models/index.js'; 
import { isProducer } from '../../core/services/isProducerService.js';

const updateProductStockMutationResolver = async (_, { productCode, stock }, context) => {
  await isProducer(context);

  const producer = await db.Producer.findOne({ where: { userId: context.user_id } });
  if (!producer) {
    throw new Error('Producer not found');
  }

  const product = await db.Product.findOne({ where: { productCode: productCode, producerId: producer.id } });

  if (!product) {
    throw new Error('Product not found or you do not have permission to update this product');
  }

  product.stock = stock;
  await product.save();

  return product;
};

const updateProductStockMutation = {
  type: ProductType,
  args: {
    productCode: { type: new GraphQLNonNull(GraphQLString) },
    stock: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: updateProductStockMutationResolver,
};

export default updateProductStockMutation;
