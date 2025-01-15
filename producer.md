# mutation {
#   login(credentials: { username: "testProducer", password: "1234" }) {
#     token
#   }
# }

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
#     name: "masinna de spalat15"
#     description: "o masina misto rau"
#     picture: "random.png"
#     price: 10
#     productCode: "Afg5hKKK"
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
#   deleteProduct(productCode: "Afg5hKKK")
# }

# query {
#   producerStats {
#     producer {
#       user{
#         name
#       }
#     }
#     monthlyIncome
#     productStats {
#       product {
#         name
#       }
#       quantitySold
#       income
#       quantityRemaining
#       quantityInOrder
#     }
#   }
# }

# query {
#   productFilter(tagStrings: ["abbas", "terga", "triduana", "sustineo", "electrocasnice"], maxStock: 101) {
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
#     producer {
#       user{
#         name
#       }
#     }
#     messages {
#       title
#       description
#       reviewStars
#       user {
#         name
#       }
#     }
#     tag {
#       id
#       name
#     }
#   }
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

# mutation {
#   updateProductStock(productCode: "Afg5hK", stock: 10) {
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
#   }
# }

# mutation {
#   createMessage(message: {
#     title: "haah"
#     description: "baa"
#     reviewStars: 2.5
#     productId: 1532
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

# mutation {
#   createMessage(message: {
#     title: "haah"
#     description: "baa"
#     reviewStars: 3
#     productId: 1532
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

