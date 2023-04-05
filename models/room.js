'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.Message,{
        foreignKey:'roomId',
        as: 'messages'
      })

      Room.hasMany(models.User,{
        through:'RoomUsers',
        foreignKey: 'roomId',
        as: 'users'
      })
    }
  }
  Room.init({
    name: DataTypes.STRING,
    messages: DataTypes.STRING,
    users: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
