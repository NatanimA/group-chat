'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Message extends Model {
/**
* Helper method for defining associations.
* This method is not a part of Sequelize lifecycle.
* The models/index file will call this method automatically.
*/
static associate(models) {
// define association here
Message.belongsTo(models.User,{
foreignKey:'userId',
as:'user'
})

Message.belongsTo(models.Room,{
    foreignKey:'roomId'
  })
}

}
Message.init({
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
content: DataTypes.STRING
}, {
sequelize,
modelName: 'Message',
});
return Message;
};
