const {withFilter } = require('graphql-subscriptions');
const { ROOM_NOTIFICATION,pubSub } = require('../../../constants/index.js');



const roomNotification = {
    subscribe: withFilter(() => pubSub.asyncIterator(ROOM_NOTIFICATION),(payload,variables) => {
                console.log("Payload: ",payload)
                return(payload.roomNotification.id === variables.roomId)
            })
}

module.exports ={roomNotification}


