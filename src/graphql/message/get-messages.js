const getMessages = async (_,arg,{models}) => {
    console.log("Models: ",models)
    const {Message} = models
    return Message.findAll()
}


module.exports ={getMessages}


