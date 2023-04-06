const Rooms = require('../../../models').Room

const getRoom = async (parent,arg) => {
            const {id} = arg
            return Rooms.findOne({
                where:{
                    id
                }
            })
        }

module.exports = { getRoom}
