const getRoom = async (_,arg,{models}) => {
            const {id} = arg
            const {Room,User,Message} = models
            return await Room.findOne({
                where:{
                    id
                },
                include:[{
                    model: User,
                    as:"users"
                },

                {
                    model: Message,
                    as:"messages"
                }
            ]
            })
        }

module.exports = {getRoom}


