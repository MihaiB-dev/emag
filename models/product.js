'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
    
    class Product extends Model {
        static associate(models) {
        Product.belongsTo(models.Producer, {
            foreignKey: 'producerId',
        });
        Product.hasMany(models.Message, {
            foreignKey: 'productId',
        });
        Product.belongsTo(models.Tag, {
            foreignKey: 'tagId',
        });

        Product.belongsToMany(models.Cart, {
            through: models.CartProduct,
            foreignKey: 'productId',
            otherKey: 'cartId'
        });
        Product.belongsToMany(models.Order, {
            through: models.OrderProduct,
            foreignKey: 'productId',
            otherKey: 'orderId'
        });

        }
    }
    Product.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        picture: DataTypes.STRING,
        price: DataTypes.INTEGER,
        productCode: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        producerId: DataTypes.INTEGER,
        tagId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
    }); 
    return Product;
}