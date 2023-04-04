'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoomUser.init({
    userId: DataTypes.STRING,
    roomId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RoomUser',
  });
  return RoomUser;
};