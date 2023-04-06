import { uuid } from 'uuidv4';
import { PubSub, withFilter } from 'graphql-subscriptions';
const  {addUser}= require('./user/add-user')
const { addRoom } = require('./room/add-room')
const { getRooms} = require('./room/get-rooms')
const { getRoom } = require('./room/get-room')
const { getMessages} = require('./message/get-messages')
import { subscribe } from 'graphql';

const Rooms = []
const Users = []
const Messages = []
const ROOM_NOTIFICATION = 'ROOM_NOTIFICATION'
const MESSAGE_NOTIFICATION = 'MESSAGE_NOTIFICATION'
const pubSub = new PubSub();

const resolvers = {
    Query: {
        getRooms,
        getRoom,
        getMessages
    },

    Subscription: {
        roomNotification:{
            subscribe: withFilter(() => pubSub.asyncIterator([ROOM_NOTIFICATION]),(payload,variables) => {
                return(payload.roomNotification.id === variables.roomId)
            })
        },
        messageNotification:{
            subscribe: withFilter(() => pubSub.asyncIterator([MESSAGE_NOTIFICATION]),(payload,variables) => {
                console.log("Payload: ",payload)
                console.log("variables: ",variables)
                return(variables.room.includes(payload.messageNotification.room.id))
            })
        }
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
