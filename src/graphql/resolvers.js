import { uuid } from 'uuidv4';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { subscribe } from 'graphql';

const Rooms = []
const Users = []
const Messages = []
const ROOM_NOTIFICATION = 'ROOM_NOTIFICATION'
const MESSAGE_NOTIFICATION = 'MESSAGE_NOTIFICATION'
const pubSub = new PubSub();

const resolvers = {
    Query: {
        getRooms: () => {
            return Rooms
        },
        getRoom: (parent,arg) => {
            const {id} = arg
            return Rooms.filter(room => room.id === id)
        },
        messages: (parent,arg) => {
            return Messages
        }
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
        addRoom: (parent,arg) => {
            const {name} = arg
            const newRoom = {id:uuid(),name,users:[],messages:[]}
            Rooms.push(newRoom)
            return newRoom;
        },
        addUser: (parent,arg) => {
            const {name,email} = arg
            const newUser = {id:uuid(),name,email}
            Users.push(newUser)
            return newUser;
        },
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
                    console.log("RRRRRRRRRRRR: ",r)
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
