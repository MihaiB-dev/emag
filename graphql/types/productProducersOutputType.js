import {GraphQLObjectType, GraphQLList, GraphQLString} from 'graphql';
import productType from './productType.js';
import producerType from './producerType.js';

const ProductProducersOutputType = new GraphQLObjectType({
    name: 'ProductProducersOutput',
    fields: {
        products: { type: new GraphQLList(productType) },
        producerType: { type: producerType }
    }
});

export default ProductProducersOutputType;