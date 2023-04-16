const Messages = require('../../../models').Message

export const getMessages = async () => {
    return Messages.findAll()
}


