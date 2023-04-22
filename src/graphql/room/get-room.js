const getRoom = async (_,arg,{models}) => {
            const {id} = arg
            const {Room} = models
            return await Room.findOne({
                where:{
                    id
                }
            })
        }

module.exports = {getRoom}


