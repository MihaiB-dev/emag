'use strict';
import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {

    class Message extends Model {
        static associate(models) {
        Message.belongsTo(models.User, {
            foreignKey: 'userId',
        });
        }
    }
    Message.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        reviewStars: DataTypes.FLOAT,
        date: DataTypes.DATE,
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
}