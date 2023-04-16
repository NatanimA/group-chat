const Rooms = require('../../../models').Room

export const getRoom = async (parent,arg) => {
            const {id} = arg
            return Rooms.findOne({
                where:{
                    id
                }
            })
        }


