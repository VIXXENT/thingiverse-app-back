import express from "express";
import {ApolloServer} from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import cors from 'cors';
import compression from 'compression'; //Reduces body response size -> speeds up
import { createServer } from 'http';
import schema from './graphql/schema';

import routes from "./routes";

const portNumber = 8080;
const app = express();

//Apollo Server
const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)]
});

routes(app);
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);

httpServer.listen(
    {port: portNumber},
    ():void=>console.log(`\n🚀     GraphQL is now running on http://localhost:3000/graphql`)
);

