const Rooms = require('../../../models').Room

export const getRooms = async (parent,arg) => {
    return await Rooms.findAll();
}



