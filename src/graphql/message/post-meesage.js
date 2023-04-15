const Messages = require('../../../models').Message
import { PubSub } from 'graphql-subscriptions'
import { MESSAGE_NOTIFICATION } from '../../../constants'

const pubSub = new PubSub()

export const postMessages = async (parent,{user,content,room}) => {
    try{
        const newMessage = await Messages({content,userId:user,roomId:room})
        pubSub.publish(MESSAGE_NOTIFICATION,{messageNotification:newMessage})
        return newMessage;
    }catch(error){
        return error
    }
}



