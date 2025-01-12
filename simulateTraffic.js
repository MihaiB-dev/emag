import axios from 'axios';

// Replace with your actual GraphQL endpoint
const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

// Fake consumer accounts for simulation
const FAKE_CONSUMERS = [
  { username: 'testConsumer', password: '1234' },
  { username: 'testProducer', password: '1234' },
];

// Product codes for testing
const EXAMPLE_PRODUCT_CODES = ['GR9WWV', 'XY7ABC', 'LM5DEF'];

// Random helper functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Login a user to get their token
 */
async function loginUser(username, password) {
  const query = `
    mutation Login($username: String!, $password: String!) {
      login(credentials: { username: $username, password: $password }) {
        token
      }
    }
  `;
  const variables = { username, password };

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query, variables });
    const { data } = response;

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.login.token; // Return token
  } catch (error) {
    console.error(`Error logging in ${username}:`, error.message);
    return null;
  }
}

/**
 * Add a product to the cart
 */
async function addProductToCart(productCode, quantity, token) {
  const mutation = `
    mutation AddToCart($input: CartProductInput!) {
      createCartProduct(input: $input) {
        user {
          id
          name
        }
        products {
          id
          name
          description
          picture
          price
          productCode
          stock
        }
        totalPrice
      }
    }
  `;
  const variables = { input: { quantity, productCode } };

  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      { query: mutation, variables },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    console.log('Cart updated:', data.data.createCartProduct);
    return data.data.createCartProduct;
  } catch (error) {
    console.error(`Error adding product ${productCode} to cart:`, error.message);
    return null;
  }
}

/**
 * Create an order for the current cart
 */
async function createOrder(token) {
  const mutation = `
    mutation {
      createOrder {
        user {
          id
          name
        }
        totalPrice
        status
        comingDate
        orderDate
      }
    }
  `;

  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      { query: mutation },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    console.log('Order created:', data.data.createOrder);
    return data.data.createOrder;
  } catch (error) {
    console.error('Error creating order:', error.message);
    return null;
  }
}

/**
 * Simulate a single consumer's activity
 */
async function simulateConsumer(consumer) {
  console.log(`Starting simulation for consumer: ${consumer.username}`);

  // Step 1: Login to get the token
  const token = await loginUser(consumer.username, consumer.password);
  if (!token) {
    console.error(`Failed to login ${consumer.username}`);
    return;
  }

  // Step 2: Perform random cart and order actions
  for (let i = 0; i < 5; i++) {
    const waitTime = getRandomInt(1000, 5000);
    console.log(`${consumer.username} waiting ${waitTime}ms before next action...`);
    await sleep(waitTime);

    // Randomly pick a product code and quantity
    const productCode = EXAMPLE_PRODUCT_CODES[getRandomInt(0, EXAMPLE_PRODUCT_CODES.length - 1)];
    const quantity = getRandomInt(1, 3);

    // Add product to cart
    await addProductToCart(productCode, quantity, token);

    // Immediately place an order
    await createOrder(token);
  }

  console.log(`Finished simulation for consumer: ${consumer.username}`);
}

/**
 * Main function to simulate traffic
 */
(async function main() {
  console.log('Starting traffic simulation...');

  // Simulate each consumer's activity in parallel
  const promises = FAKE_CONSUMERS.map(simulateConsumer);
  await Promise.all(promises);

  console.log('Traffic simulation completed.');
})();
