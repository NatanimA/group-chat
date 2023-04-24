const getRooms = async (_,arg,{models}) => {
    const {Room,Message,User} = models
    const rooms = await Room.findAll(
        {
            include:[
                {
                    model:Message,
                    as:"messages"
                },
                {
                    model:User,
                    as:"users"
                }
            ]
        }
        );
    return rooms;

}

module.exports = {getRooms}



