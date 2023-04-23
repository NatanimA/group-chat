const getRooms = async (_,arg,{models}) => {
    const {Room,Message,User} = models
    const rooms = await Room.findAll(
        {
            raw:true,
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
    console.log("Rooms: ",rooms)

}

module.exports = {getRooms}



