const Rooms = require('../../../models').Room

const getRooms = async (parent,arg) => {
    return await Rooms.findAll();
}


module.exports = { getRooms}
