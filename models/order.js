'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
        Order.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        Order.belongsToMany(models.Product, {
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId',
        });
        }
    }
    Order.init({
        userId: DataTypes.INTEGER,
        totalPrice: DataTypes.INTEGER,
        status: DataTypes.STRING,
        comingDate: DataTypes.DATE,
        orderDate: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
    }