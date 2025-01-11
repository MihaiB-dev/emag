import { GraphQLObjectType, GraphQLInt } from 'graphql';
import cartType from './cartType.js';  // Importă tipul pentru Cart
import productType from './productType.js';  // Importă tipul pentru Product

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

    // Răspuns cu informațiile detaliate despre coș
    cart: { 
      type: cartType,
      resolve: async (cartProduct) => {
        const cart = await cartProduct.getCart();
        return cart;
      }
    },

    // Răspuns cu informațiile detaliate despre produs
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
