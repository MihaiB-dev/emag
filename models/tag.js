'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models){
      Tag.hasMany(models.Product, {
        foreignKey: 'tagId',
    });
    }
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};