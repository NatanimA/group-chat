const { PubSub } = require('graphql-subscriptions');
const { MESSAGE_NOTIFICATION } = require('../../../constants/index.js');

const pubSub = new PubSub()

const postMessages = async (_,{user,content,room},{models}) => {
    const {Message} = models
    try{
        const newMessage = await Message({content,userId:user,roomId:room})
        pubSub.publish(MESSAGE_NOTIFICATION,{messageNotification:newMessage})
        return newMessage;
    }catch(error){
        return error
    }
}

module.exports = {postMessages}



