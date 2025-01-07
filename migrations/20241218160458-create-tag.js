'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Post_Tag', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: 'Posts',
          }
        },
        key: 'id',
      }

    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tags');
  }
};