'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash passwords for test users
    const consumerPassword = await bcrypt.hash('1234', 5);
    const producerPassword = await bcrypt.hash('1234', 5);

    // Create 10 test consumers
    const consumerUsers = [];
    const carts = [];
    for (let i = 1; i <= 10; i++) {
      consumerUsers.push({
        name: `testConsumer${i}`,
        password: consumerPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert all test consumers into the Users table
    await queryInterface.bulkInsert('Users', consumerUsers);

    // Fetch all inserted user IDs for test consumers
    const consumerUserIds = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE name LIKE 'testConsumer%' ORDER BY id ASC;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create Consumers and Carts for each test consumer
    consumerUserIds.forEach((user, index) => {
      carts.push({
        userId: user.id,
        totalPrice: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    // Insert Consumers into the Consumers table
    const consumers = consumerUserIds.map((user) => ({
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Consumers', consumers);

    // Insert Carts into the Carts table
    await queryInterface.bulkInsert('Carts', carts);

    // Add the test producer
    await queryInterface.bulkInsert('Users', [
      {
        name: 'testProducer',
        password: producerPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Fetch the last inserted user's ID for the producer
    const producerUser = await queryInterface.sequelize.query(
      `SELECT last_insert_rowid() as id;`, // Works for SQLite
      { type: Sequelize.QueryTypes.SELECT }
    );

    const producerUserId = producerUser[0].id;

    // Insert the producer into the Producers table
    await queryInterface.bulkInsert('Producers', [
      {
        userId: producerUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove the test consumers and producer
    const testUserNames = ['testProducer'];
    for (let i = 1; i <= 10; i++) {
      testUserNames.push(`testConsumer${i}`);
    }

    await queryInterface.bulkDelete('Users', {
      name: { [Sequelize.Op.in]: testUserNames },
    });

    await queryInterface.bulkDelete('Consumers', null, {}); // Clean up Consumers table
    await queryInterface.bulkDelete('Carts', null, {});     // Clean up Carts table
    await queryInterface.bulkDelete('Producers', null, {}); // Clean up Producers table
  },
};
