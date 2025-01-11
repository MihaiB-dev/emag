import { GraphQLObjectType, GraphQLInt } from 'graphql';
import cartType from './cartType.js';  
import productType from './productType.js';  

const cartProductType = new GraphQLObjectType({
  name: 'CartProduct',
  fields: {
    cartId: { 
      type: GraphQLInt, 
      resolve: (cartProduct) => cartProduct.cartId 
    },
    
    productId: { 
      type: GraphQLInt, 
      resolve: (cartProduct) => cartProduct.productId 
    },
    
    quantity: { 
      type: GraphQLInt, 
      resolve: (cartProduct) => cartProduct.quantity 
    },

  
    cart: { 
      type: cartType,
      resolve: async (cartProduct) => {
        const cart = await cartProduct.getCart();
        return cart;
      }
    },

  
    product: { 
      type: productType,
      resolve: async (cartProduct) => {
        const product = await cartProduct.getProduct();
        return product;
      }
    }
  }
});

export default cartProductType;
