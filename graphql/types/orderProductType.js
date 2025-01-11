import { GraphQLObjectType, GraphQLInt } from 'graphql';
import orderType from './orderType.js';  
import productType from './productType.js';  

const orderProductType = new GraphQLObjectType({
  name: 'OrderProduct',
  fields: {
    orderId: { 
      type: GraphQLInt, 
      resolve: (orderProduct) => orderProduct.orderId 
    },
    
    productId: { 
      type: GraphQLInt, 
      resolve: (orderProduct) => orderProduct.productId 
    },
    
    quantity: { 
      type: GraphQLInt, 
      resolve: (orderProduct) => orderProduct.quantity 
    },
  
    product: { 
      type: productType,
      resolve: async (orderProduct) => {
        const product = await orderProduct.getProduct();
        return product;
      }
    }
  }
});

export default orderProductType;
