const http = require('http');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const fs = require('fs');
const { gql } = require('apollo-server');
const resolvers = require('./src/graphql/resolvers.js');
const cors = require('cors');
const dotenv = require('dotenv');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const db = require('./models/index.js');
const {startStandaloneServer} =  require('@apollo/server/standalone');
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


    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: 9000 },
        context:({req}) => {
            // Instantiate your models with the Sequelize instance
            const {Message,Room,RoomUser,User} = db
            const models = {
                Message,
                Room,
                RoomUser,
                User
            };

            // Return the context object with the user ID and models
            return {
            req,
            models,
            };
        },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

main().catch(err => {
    console.log(err)
})
