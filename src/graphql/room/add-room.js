const Rooms = require('../../../models').Room

const addRoom = async (parent,arg) => {
            const {name} = arg
            const newRoom = await Rooms.create({name})
            return newRoom;
        }

module.exports = { addRoom }
