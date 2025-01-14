'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { default: db } = await import('../models/index.js');

    const products = await db.Product.findAll();

    const consumers = await db.Consumer.findAll();

    if (!products.length || !consumers.length) {
      console.log('No products or consumers found. Please seed products and consumers first.');
      return;
    }

    const possibleStars = [
      0, 0.5, 1, 1.5, 2, 2.5,
      3, 3.5, 4, 4.5, 5
    ];

    const messagesToInsert = [];

    for (const product of products) {
      const numberOfMessages = faker.number.int({ min: 0, max: 10 });

      for (let i = 0; i < numberOfMessages; i++) {
        const randomConsumer = consumers[
          faker.number.int({ min: 0, max: consumers.length - 1 })
        ];
        const reviewStars = possibleStars[faker.number.int({ min: 0, max: possibleStars.length - 1 })];

        messagesToInsert.push({
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          reviewStars,
          userId: randomConsumer.userId,  // consumer's userId
          productId: product.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    if (messagesToInsert.length) {
      await queryInterface.bulkInsert('Messages', messagesToInsert, {});
      console.log(`Inserted ${messagesToInsert.length} fake messages.`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
