const { ROOM_NOTIFICATION,pubSub } = require('../../../constants/index.js');

const joinRoom = async(_,arg,{models}) => {
    const {userId,roomId} = arg
    const {Room,RoomUser,User,Message} = models
    try {
        await RoomUser.create({roomId,userId})
        const room = await Room.findOne({
        where:{
            id:roomId
        },
        include:[
            {
                model:User,
                as:"users"
            },
            {
                model:Message,
                as:"messages"
            }
        ]
         })


        pubSub.publish(ROOM_NOTIFICATION,{roomNotification:room})
        return room;
    }catch(error){
        return error;
    }

}

module.exports = {joinRoom}



