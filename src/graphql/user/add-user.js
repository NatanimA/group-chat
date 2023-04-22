const addUser = async (_,arg,{models}) => {
            const {name,email} = arg
            const {User} = models
            const newUser = await User.create({name,email})
            return newUser;
        }

module.exports ={addUser}

