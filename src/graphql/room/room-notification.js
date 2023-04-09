import { PubSub,withFilter } from "graphql-subscriptions"
import { ROOM_NOTIFICATION } from "../../../constants"

const pubSub = new PubSub()


const roomNotification = {
    subscribe: withFilter(() => pubSub.asyncIterator([ROOM_NOTIFICATION]),(payload,variables) => {
                return(payload.roomNotification.id === variables.roomId)
            })
}

module.exports = { roomNotification }
