const cartType = new GraphQLObjectType({
    name: 'Cart',
    fields: {
        user: { 
            type: userType,
            resolve: async (cart) => {
                const user = await cart.getuser();

                return user;
            }
        },

        products: { 
                    type: new GraphQLList(productType),
                    resolve: async (cart) => {
                        const products = await cart.getProducts();
                        return products;
                    }
                },
        totalPrice: { type: GraphQLInt },
    }
});