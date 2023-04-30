const { PubSub } = require("graphql-subscriptions")

const ROOM_NOTIFICATION = 'ROOM_NOTIFICATION'
const MESSAGE_NOTIFICATION = 'MESSAGE_NOTIFICATION'
const pubSub = new PubSub()

module.exports = {ROOM_NOTIFICATION,MESSAGE_NOTIFICATION,pubSub}
