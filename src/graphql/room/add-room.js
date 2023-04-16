const Rooms = require('../../../models').Room

export const addRoom = async (parent,arg) => {
            const {name} = arg
            const newRoom = await Rooms.create({name})
            return newRoom;
        }


