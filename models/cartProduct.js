import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CartProduct extends Model {
    static associate(models) {
      CartProduct.belongsTo(models.Cart, { foreignKey: 'cartId' });
      CartProduct.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  CartProduct.init(
    {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,

      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CartProduct',
      tableName: 'CartProducts',
      timestamps: false,
    }
  );
  return CartProduct;
};