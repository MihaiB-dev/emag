'use strict';
import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
    class OrderProduct extends Model {
        static associate(models) {
        }
    }
    OrderProduct.init({
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    
    }, {
        sequelize,
        modelName: 'OrderProduct',
        tableName: 'Order_Product',
        timestamps: false,
    });
    return OrderProduct;
};