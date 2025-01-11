

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
#     name: "masinna de spalat"
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

mutation {
  createMessage(message: {
    title: "haah"
    description: "baa"
    reviewStars: 2.5
    productId: 2
  }) {
    title
    description
    reviewStars
    user {
      id
      name
    }
  }
}
```