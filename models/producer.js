'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Producer extends Model {
    static associate(models) {
      Producer.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Producer.hasMany(models.Product, {
        foreignKey: 'producerId',
      });
    }
  }

  Producer.init(
    {
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Producer',
    }
  );

  return Producer;
};
