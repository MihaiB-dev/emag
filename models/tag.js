'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Tag extends Model {
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};