'use strict';
const { faker } = require('@faker-js/faker'); // CommonJS import for faker

const PRODUCERS = 50;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const producers = [];

    for (let i = 0; i < PRODUCERS; i++) {
      // Insert a new user
      await queryInterface.bulkInsert('Users', [
        {
          name: faker.company.name(),
          password: faker.internet.password(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      // Fetch the last inserted user's ID using SQLite's `lastInsertRowid()`
      const user = await queryInterface.sequelize.query(
        `SELECT last_insert_rowid() as id;`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Push producer data with the fetched user ID
      producers.push({
        userId: user[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert producers
    await queryInterface.bulkInsert('Producers', producers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Producers', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
