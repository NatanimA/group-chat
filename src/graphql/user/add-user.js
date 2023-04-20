
import { Users } from "../../../constants/index.js";


export const addUser = async (parent,arg) => {
            const {name,email} = arg
            const newUser = await Users.create({name,email})
            return newUser;
        }



