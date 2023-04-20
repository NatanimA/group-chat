import { addUser } from './user/add-user.js'
import { getRoom } from './room/get-room.js'
import { getRooms } from './room/get-rooms.js'
import { addRoom } from './room/add-room.js'
import { getMessages } from './message/get-messages.js'
import { roomNotification } from './room/room-notification.js'
import { joinRoom } from './room/join-room.js'
import { messageNotification } from './message/message-notification.js'
import { postMessages } from './message/post-meesage.js'


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
        postMessages
    }
}

export default resolvers
