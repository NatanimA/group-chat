const getRooms = async (_,arg,{models}) => {
    console.log("models: ",models)
    const {Room} = models
    return await Room.findAll();
}

module.exports = {getRooms}



