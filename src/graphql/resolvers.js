import { uuid } from 'uuidv4';
import { PubSub} from 'graphql-subscriptions';
const Rooms = require('../../models').Room
const Users = require('../../models').User
const  {addUser}= require('./user/add-user')
const { addRoom } = require('./room/add-room')
const { getRooms} = require('./room/get-rooms')
const { getRoom } = require('./room/get-room')
const { getMessages} = require('./message/get-messages')
const { roomNotification } = require('./room/room-notification')
const { messageNotification } = require('./message/message-notification')

import { MESSAGE_NOTIFICATION,ROOM_NOTIFICATION } from '../../constants';


const ROOM_NOTIFICATION = 'ROOM_NOTIFICATION'

const pubSub = new PubSub();

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
        joinRoom: (parent,arg) => {
            const {userId,roomId} = arg
            const user = Users.find(user => user.id === userId)

            Rooms.forEach( room => {
                if(room.id === roomId){
                    room.users.push(user)
                }
            })

            const room = Rooms.find(room => room.id === roomId)
            pubSub.publish(ROOM_NOTIFICATION,{roomNotification:room})
            return room;
        },
        postMessage: (parent,{user,content,room}) => {
            const inRoom  = Rooms.find(r => r.id === room)
            const newMessage = {id:uuid(),user,content,room:inRoom}
            Rooms.forEach( r => {
                if(r.id === room){
                    r.messages.push(newMessage)
                }
            })
            Messages.push(newMessage)
            pubSub.publish(MESSAGE_NOTIFICATION,{messageNotification:newMessage})
            return newMessage;
        }
    }
}

export default resolvers
