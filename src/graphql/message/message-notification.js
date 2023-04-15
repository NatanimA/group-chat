import { PubSub,withFilter } from "graphql-subscriptions"
import { MESSAGE_NOTIFICATION } from "../../../constants"

const pubSub = new PubSub()


export const messageNotification = {
    subscribe: withFilter(() => pubSub.asyncIterator([MESSAGE_NOTIFICATION]),(payload,variables) => {
                return(variables.room.includes(payload.messageNotification.room.id))
            })
}



