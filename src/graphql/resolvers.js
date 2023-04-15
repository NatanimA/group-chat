const  {addUser}= require('./user/add-user')
const { addRoom } = require('./room/add-room')
const { getRooms} = require('./room/get-rooms')
const { getRoom } = require('./room/get-room')
const { getMessages} = require('./message/get-messages')
const { roomNotification } = require('./room/room-notification')
import { joinRoom } from './room/join-room';
import { messageNotification } from './message/message-notification'


const resolvers = {
    Query: {
        getRooms,
        getRoom,
        getMessages
    },

    Subscription: {
        roomNotification,
        messageNotification
    },

    Mutation: {
        addRoom,
        addUser,
        joinRoom,
        postMessage
    }
}

export default resolvers
