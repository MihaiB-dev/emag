'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const consumerPassword = await bcrypt.hash('1234', 5);
    const producerPassword = await bcrypt.hash('1234', 5);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'testConsumer', 
        password: consumerPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const consumerUser = await queryInterface.sequelize.query(
      `SELECT last_insert_rowid() as id;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert('Consumers', [
      {
        userId: consumerUser[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Insert the test producer user
    await queryInterface.bulkInsert('Users', [
      {
        name: 'testProducer', // Test producer username
        password: producerPassword, // Hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Get the last inserted user's ID for testProducer
    const producerUser = await queryInterface.sequelize.query(
      `SELECT last_insert_rowid() as id;`, // Works for SQLite
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Insert a producer record using the user ID
    await queryInterface.bulkInsert('Producers', [
      {
        userId: producerUser[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove the test users and related records
    const testUserNames = ['testConsumer', 'testProducer'];
    await queryInterface.bulkDelete('Users', {
      name: { [Sequelize.Op.in]: testUserNames },
    });

    await queryInterface.bulkDelete('Consumers', null, {}); // Clean up Consumers table
    await queryInterface.bulkDelete('Producers', null, {}); // Clean up Producers table
  },
};
