const { addUser } = require('./user/add-user.js')
const { addRoom } = require('./room/add-room.js')
const { getRooms } = require('./room/get-rooms.js')
const { getRoom } = require('./room/get-room.js')
const { getMessages } = require('./message/get-messages.js')
const { roomNotification } = require("./room/room-notification.js")
const { joinRoom } = require('./room/join-room.js')
const { messageNotification } = require('./message/message-notification.js')
const { postMessages } = require('./message/post-meesage.js')


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
