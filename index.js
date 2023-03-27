import http from 'http'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import fs from 'fs'
import { gql } from 'apollo-server'
import resolvers  from './src/graphql/resolvers.js'
import cors from 'cors'
import dotenv from 'dotenv'
import { makeExecutableSchema } from '@graphql-tools/schema'
import {WebSocketServer} from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

dotenv.config()

const main = async () => {
    const app = express();
    const httpServer = http.createServer(app)
    const typeDefs = gql(fs.readFileSync('./src/graphql/typeDefs.graphql',{encoding:'utf-8'}))
    const schema = makeExecutableSchema({typeDefs,resolvers})



    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql'
    })

    const serverCleanUp = useServer({schema},wsServer)

    const apolloServer = new ApolloServer({
        schema,
        plugins:[
            ApolloServerPluginDrainHttpServer({httpServer}),
            {
                async serverWillStart(){
                    return {
                        async drainServer() {
                            await serverCleanUp.dispose()
                        }
                    }
                }
            }
        ]
    })

    await apolloServer.start()

    app.use('/graphql',
    cors({origin:'*',credentials:false}),
    express.json(),
    expressMiddleware(apolloServer))

    httpServer.listen(process.env.PORT,() => {
        console.log(`Server is running on http://localhost:${process.env.PORT}/graphql`)
    })
}

main().catch(err => {
    console.log(err)
})
