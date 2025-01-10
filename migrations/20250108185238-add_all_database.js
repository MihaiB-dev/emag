'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {type: Sequelize.STRING},
      description: {type: Sequelize.STRING},
      reviewStars: {type: Sequelize.FLOAT},
      date: {type: Sequelize.DATE},
      userId: {type: Sequelize.INTEGER},
      productId: {type: Sequelize.INTEGER},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });


    // Product
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {type: Sequelize.STRING},
      description: {type: Sequelize.STRING},
      picture: {type: Sequelize.STRING},
      price: {type: Sequelize.INTEGER},
      productCode: {type: Sequelize.STRING},
      stock: {type: Sequelize.INTEGER},
      producerId: {type: Sequelize.INTEGER},
      tagId: {type: Sequelize.INTEGER},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Producer
    await queryInterface.createTable('Producers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {type: Sequelize.INTEGER},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Cart
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {type: Sequelize.INTEGER},
      consumerId: {type: Sequelize.INTEGER},
      totalPrice: {type: Sequelize.INTEGER},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // CartProduct

    await queryInterface.createTable('CartProducts', {
      CartId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Carts',
          },
          key: 'id',
        },
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Products',
          },
          key: 'id',
        }
      },
      quantity: {type: Sequelize.INTEGER},

    });

    // Order
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {type: Sequelize.INTEGER},
      totalPrice: {type: Sequelize.INTEGER},
      status: {type: Sequelize.STRING},
      comingDate: {type: Sequelize.DATE},
      orderDate: {type: Sequelize.DATE},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // OrderProduct

    await queryInterface.createTable('OrderProducts', {
      OrderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Orders',
          },
          key: 'id',
        },
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Products',
          },
          key: 'id',
        }
      },
      quantity: {type: Sequelize.INTEGER},
    });

    // Consumer
    await queryInterface.createTable('Consumers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {type: Sequelize.INTEGER},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });



  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Consumers');
    await queryInterface.dropTable('OrderProducts');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('CartProducts');
    await queryInterface.dropTable('Carts');
    await queryInterface.dropTable('Producers');
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('Messages');
    
    
    
    
    
    
    
  }
};
