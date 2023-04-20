import { PubSub,withFilter } from "graphql-subscriptions"
const {ROOM_NOTIFICATION } = require("../../../constants/index.js")

const pubSub = new PubSub()


export const roomNotification = {
    subscribe: withFilter(() => pubSub.asyncIterator([ROOM_NOTIFICATION]),(payload,variables) => {
                return(payload.roomNotification.id === variables.roomId)
            })
}


