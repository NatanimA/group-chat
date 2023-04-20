import { PubSub,withFilter } from "graphql-subscriptions"
const { MESSAGE_NOTIFICATION } = require("../../../constants/index.js")

const pubSub = new PubSub()


export const messageNotification = {
    subscribe: withFilter(() => pubSub.asyncIterator([MESSAGE_NOTIFICATION]),(payload,variables) => {
                return(variables.room.includes(payload.messageNotification.room.id))
            })
}



