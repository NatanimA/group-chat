const addRoom = async (_,arg,{models}) => {
            const {name} = arg
            const {Room} = models
            const newRoom = await Room.create({name})
            return newRoom;
        }

module.exports = {addRoom}


