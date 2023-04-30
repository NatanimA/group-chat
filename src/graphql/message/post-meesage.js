const { MESSAGE_NOTIFICATION,pubSub } = require('../../../constants/index.js');

const postMessages = async (_,{user,content,room},{models}) => {
    const {Message,User,Room} = models
    try{
        const newMessage = await Message.create({content,userId:user,roomId:room})
        pubSub.publish(MESSAGE_NOTIFICATION,{messageNotification:newMessage.get()})
        return newMessage;
    }catch(error){
        return error
    }
}

module.exports = {postMessages}



