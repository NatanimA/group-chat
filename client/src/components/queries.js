import { gql } from "@apollo/client";

export const GET_MESSAGES = () => {
    return gql `
    query {
        messages {
            id
            content
            user
        }
    }
    `
}

export const POST_MESSAGES = (user,content) =>{
    return gql`
    mutation(${user},${content}) {
        id
        user
        content
    }
`}
