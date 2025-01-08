'use strict';
import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
  class CartProduct extends Model {
    static associate(models) {
    }
  }
  CartProduct.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'CartProduct',
    tableName: 'Cart_Product',
    timestamps: false,
  });
  return CartProduct;
};