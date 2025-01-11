import { GraphQLInputObjectType, GraphQLInt, GraphQLList } from 'graphql';


// Definim CartInputType
const cartInputType = new GraphQLInputObjectType({
    name: 'CartInput', 
    fields: {
        userId: { type: GraphQLInt }, 
        products: { 
            type: new GraphQLList(  
                new GraphQLInputObjectType({
                    name: 'ProductInputInCart',
                    fields: {
                        id: { type: GraphQLInt },
                        quantity: { type: GraphQLInt },
                    }
                })
            ) 
        },
    }
});

export default cartInputType;
