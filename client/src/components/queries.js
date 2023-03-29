import { gql } from "@apollo/client";

export const GET_MESSAGES =
    gql `
    query {
        messages {
            id
            content
            user
        }
    }
    `


export const POST_MESSAGES = gql `
    mutation($user: String!,$content:String!){
        postMessage(user:$user,content:$content){
            id
            user
            content
        }
    }
    `

export const MESSAGE_SUBSCRIPTION = gql `
    subscription{
        messageNotification {
            id
            user
            content
        }
    }
`

