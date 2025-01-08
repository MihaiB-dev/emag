'use strict';
import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
    
    class Cart extends Model {
        static associate(models) {
        Cart.belongsTo(models.User, {
            foreignKey: 'userId',
        });
        
        Cart.belongsToMany(models.Product, {
            through: models.CartProduct,
            foreignKey: 'CartId',
            otherKey: 'ProductId',
        });
        }
    }
    Cart.init({
        userId: DataTypes.INTEGER,
        totalPrice: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
}