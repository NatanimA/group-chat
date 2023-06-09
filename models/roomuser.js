'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class RoomUser extends Model {
/**
* Helper method for defining associations.
* This method is not a part of Sequelize lifecycle.
* The models/index file will call this method automatically.
*/
static associate(models) {
// RoomUser.belongsTo(models.User,{
//   foreignKey:'userId',
//   as:"users"
// })

// RoomUser.belongsTo(models.Room,{
//     foreignKey:'roomId',
//     as:"rooms"
//   })
}

}
RoomUser.init({
id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
userId: {
type: DataTypes.UUID,
references:{
model:{
tableName:'Users'
},
key: 'id'
},
allowNull:false
},
roomId:{
type: DataTypes.UUID,
references:{
model:{
tableName: 'Rooms'
},
key: 'id'
},
allowNull:false
},
}, {
sequelize,
modelName: 'RoomUser',
});
return RoomUser;
};
