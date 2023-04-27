const { PubSub } = require('graphql-subscriptions');
const { MESSAGE_NOTIFICATION } = require('../../../constants/index.js');

const pubSub = new PubSub()

const postMessages = async (_,{user,content,room},{models}) => {
    const {Message,User,Room} = models
    try{
        const newMessage = await Message.create({content,userId:user,roomId:room},{
            returning:true,
            include:[
                {
                model:User,
                as:"user"
                },
                {
                    model:Room,
                    as:"room"
                }
        ]
        })
        console.log("Message: ",newMessage)
        pubSub.publish(MESSAGE_NOTIFICATION,{messageNotification:newMessage})
        return newMessage;
    }catch(error){
        return error
    }
}

module.exports = {postMessages}



