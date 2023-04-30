const { withFilter } = require('graphql-subscriptions');
const { MESSAGE_NOTIFICATION,pubSub } = require('../../../constants/index.js');

const messageNotification = {
    subscribe: withFilter(() => pubSub.asyncIterator(MESSAGE_NOTIFICATION),(payload,variables) => {
                console.log("payload",payload)
                return(variables.room.includes(payload.messageNotification.roomId))
            })
}


module.exports = {messageNotification}


