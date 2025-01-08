'user strict';
import {
    Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
    class Consumer extends Model {
        static associate(models) {
            Consumer.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            Consumer.hasOne(models.Cart, {
                foreignKey: 'consumerId',
            });
            Consumer.hasMany(models.Order, {
                foreignKey: 'consumerId',
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