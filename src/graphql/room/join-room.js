const Rooms = require('../../../models').Room
const Users = require('../../../models').User
const RoomUsers = require('../../../models').RoomUser
import { PubSub} from "graphql-subscriptions"
import { ROOM_NOTIFICATION } from "../../../constants"

const pubSub = new PubSub()


const joinRoom = async(parent,arg) => {
    const {userId,roomId} = arg
    try {
        await RoomUsers.create({roomId,userId})
        const room = await Rooms.findOne({
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


module.exports = { joinRoom }