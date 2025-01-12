'use strict';
const { faker } = require('@faker-js/faker'); // CommonJS import for faker

const PRODUCTS_PER_PRODUCER = 30;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all producers directly using the Sequelize model
    const { default: db } = await import('../models/index.js');
    const {findOrCreateTag} = await import('../core/repositories/tagsRepository.js');
    
    const producers = await db.Producer.findAll();

    if (!producers.length) {
      console.log('No producers found. Please seed producers first.');
      return;
    }

    const products = [];

    for (const producer of producers) {
      for (let i = 0; i < PRODUCTS_PER_PRODUCER; i++) {
        // Generate a random tag and ensure it exists in the database
        const tagName = faker.commerce.department();
        const tag = await findOrCreateTag(tagName);

        products.push({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          picture: `${faker.internet.url()}/product/${faker.string.alphanumeric(10)}.jpg`,
          price: faker.number.int({ min: 10, max: 1000 }),
          productCode: faker.string.alphanumeric(6).toUpperCase(),
          stock: faker.number.int({ min: 100, max: 500 }),
          tagId: tag.id, // Foreign key reference to the tag
          producerId: producer.id, // Foreign key reference to the producer
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // Insert all generated products into the database
    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Tags', null, {}); // Optionally clean up tags if needed
  },
};
