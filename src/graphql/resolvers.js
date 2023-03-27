import { uuid } from 'uuidv4';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { subscribe } from 'graphql';

const Rooms = []
const Users = []
const ROOM_NOTIFICATION = 'ROOM_NOTIFICATION'
const pubSub = new PubSub();

const resolvers = {
    Query: {
        getRooms: () => {
            return Rooms
        },
        getRoom: (parent,arg) => {
            const {id} = arg
            return Rooms.filter(room => room.id === id)
        }
    },

    Subscription: {
        roomNotification:{
            subscribe: withFilter(() => pubSub.asyncIterator([ROOM_NOTIFICATION]),(payload,variables) => {
                return(payload.roomNotification.id === variables.roomId)
            })
        }
    },

    Mutation: {
        addRoom: (parent,arg) => {
            const {name} = arg
            const newRoom = {id:uuid(),name,users:[]}
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
        }
    }
}

export default resolvers
