'user strict';
import {
    Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
    class Consumer extends Model {
        static associate(models) {
            Consumer.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });
            Consumer.hasOne(models.Cart, {
                foreignKey: 'consumerId',
                as: 'cart',
            });
            Consumer.hasMany(models.Order, {
                foreignKey: 'consumerId',
                as: 'orders',
            });
        }
    }
    Consumer.init({
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Consumer',
    });
    return Consumer;
}