

```graphql

# mutation {
#   login(credentials: { username: "Mihai", password: "123" }) {
#     token
#   }
# }


# mutation {
#   createConsumer(user: {
#     name: "Mihai"
#     password:"123"
#   }) {
#     user {
#       id
#       name
#     }
#     cart {

#       totalPrice
#     }

#   }
# }

# mutation {
#   createProduct(Product: {
#     name: "masinna de spalat2"
#     description: "o masina misto rau"
#     picture: "random.png"
#     price: 10
#     productCode: "Afg5hK"
#     stock: 100
#     tag: "electrocasnice"
#   }) {
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
    
#     tag {
#       id
#       name
#     }
#   }
# }

# mutation {
#   createProducer(user: {
#     name: "MihaiProducer"
#     password: "123"
#   }) {
#     user {
#       id
#       name
#     }
#   }
# }

# mutation {
#   createMessage(message: {
#     title: "haah"
#     description: "baa"
#     reviewStars: 2.5
#     productId: 2
#   }) {
#     title
#     description
#     reviewStars
#     user {
#       id
#       name
#     }
#   }
# }

# query {
#   allProducts {
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
#     tag {
#       id
#       name
#     }
#   }
# }

# query {
#   singleProduct(id: 50) { 
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
#     tag {
#       id
#       name
#     }
#   }
# }


# query {
#   producersWithProducts {
#     producerType {
#       user {
#         id
#         name
#       }
#     }
#     products {
#       id
#       name
#       description
#       picture
#       price
#       productCode
#       stock
#     }
#   }
# }

# mutation {
#   createProducer(user: {
#     name: "producer",
#     password: "1234"
#   }) {
#     user {
#       id
#       name
#     }
#   }
# }

# mutation {
#   login(credentials: { username: "producer", password: "1234" }) 
#   {
#     token
#   }
# }

# mutation {
# createProduct(Product: {
# name: "masinna de spalat3"
# description: "o masina misto rau"
# picture: "random.png"
# price: 10
# productCode: "Afg5hK55"
# stock: 100
# tag: "electrocasnice"
# }) {
# id
# name
# description
# picture
# price
# productCode
# stock
# tag {
# id
# name
# }
# }
# }


# mutation {
#   updateProductStock(productCode: "Afg5hK55", stock: 6) {
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
#   }
# }


# query {
#   ratingProduct(productCode: "P3AU73")
# }

# query {
#   showProductsForProducer {
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
#     tag {
#       id
#       name
#     }
#   }
# }

# query {
#   showOrderedProductsByRating {
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
#     averageRating
#   }
# }




```