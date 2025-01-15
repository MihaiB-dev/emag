# mutation {
#   login(credentials: { username: "testConsumer1", password: "1234" }) {
#     token
#   }
# }

# mutation {
#   createCartProduct(input: {
#     quantity: 10
#     productCode: "OK6CYV"
#   }) {
#     user {
#       id
#       name
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
#     totalPrice
#   }
# }

# mutation {
#   deleteProductCart(productCode: "OK6CYV")
# }

# mutation {
#   createMessage(message: {
#     title: "Un mesaj nou."
#     description: "Un mesaj nou creat instantaneu."
#     reviewStars: 5
#     productId: 1
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
#   deleteMessage(id: 7680)
# }



# mutation {
#   createOrder {
#     user {
#       id
#       name
#     }
#     totalPrice
#     status
#     comingDate
#     orderDate
#   }
# }

# mutation {
#   deleteOrder(orderId: 1341)
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
#     producer {
#       user {
#         id
#         name
#       }
#     }
#     messages {
#       title
#       description
#       reviewStars
#       user {
#         id
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
#   messages {
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
#   singleProduct(productCode: "OK6CYV") {
#     id
#     name
#     description
#     picture
#     price
#     productCode
#     stock
#     producer {
#       user {
#         id
#         name
#       } 
#     }
#     messages {
#       title
#       description
#       reviewStars
#       user {
#         id
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
#   producersWithProducts {
#     products {
#       id
#       name
#       description
#       picture
#       price
#       productCode
#       stock
#       producer {
#         user {
#           id
#           name
#         }
#       } 
#       messages {
#         title
#         description
#         reviewStars
#         user {
#           id
#           name
#         }
#       } 
#       tag {
#         id
#         name
#       } 
#     }
#     producerType {
#       user {
#         id
#         name
#       } 
#     }
#   }
# }


# query {
#   showCategory(categoryName: "electrocasnice") {
#     categoryName
#     products {
#       id
#       name
#       description
#       picture
#       price
#       productCode
#       stock
#       averageRating
#     }
#   }
# }

# query {
#   allCategories {
#     name
#     productCount
#   }
# }
