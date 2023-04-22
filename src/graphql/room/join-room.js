const { PubSub } = require('graphql-subscriptions');
const { ROOM_NOTIFICATION } = require('../../../constants/index.js');

const pubSub = new PubSub()


const joinRoom = async(_,arg,{models}) => {
    const {userId,roomId} = arg
    const {Room,RoomUser} = models
    try {
        await RoomUser.create({roomId,userId})
        const room = await Room.findOne({
        raw:true,
        where:{
            id:roomId
        }
         })
        pubSub.publish(ROOM_NOTIFICATION,{roomNotification:room})
        return room;
    }catch(error){
        return error;
    }

}

module.exports = {joinRoom}



