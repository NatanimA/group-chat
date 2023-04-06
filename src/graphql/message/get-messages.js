const Messages = require('../../../models').Message

const getMessages = async () => {
    return Messages.findAll()
}

module.exports = { getMessages }
