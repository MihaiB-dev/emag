import { GraphQLObjectType, GraphQLList } from 'graphql';
// import productType from './productType.js'; 
import userType from './userType.js';

const producerType = new GraphQLObjectType({
  name: 'Producer',
  fields: {
    user: { 
      type: userType,
      resolve: async (producer) => {
        const user = await producer.getUser();
        return user;
      }
    },
    // products: { 
    //   type: new GraphQLList(productType),
    //   resolve: async (producer) => {
    //     const products = await producer.getProducts();
    //     return products;
    //   }
    // }
  }
});

export default producerType;
