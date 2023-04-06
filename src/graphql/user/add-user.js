const Users = require('../../../models').User


const addUser = async (parent,arg) => {
            const {name,email} = arg
            const newUser = await Users.create({name,email})
            return newUser;
        }

module.exports = {addUser}
