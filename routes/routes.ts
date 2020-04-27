import express from "express";
import * as authenticator from "../thingyverse-client/authenticator";
import * as thingiverseClient from "../thingyverse-client/client"
import cors from 'cors';

var corsOptions = cors({
    origin: 'http://localhost:3000'
  })

function logRequest(req: express.Request){
    const fullUrl = `[${req.method}] ${req.protocol}://${req.host}${req.originalUrl}`;
    console.log('Request received: ', fullUrl);
}

export default function(app:express.Application){

    app.get('/thingiverse/authCode', corsOptions, (req: express.Request, res: express.Response) => {
        logRequest(req);
        authenticator.requestAndStoreAuthorizationToken(req, res);
    })

    app.get('/thingiverse/login', (req: express.Request, res:express.Response)=>{
        logRequest(req);
        console.log(req.url)
        authenticator.authenticate(res);
    })

    app.get('/thingiverse/validate-token', corsOptions, (req:express.Request, res:express.Response)=>{
        logRequest(req);
        authenticator.sendTokenInfo(res);
    })

    app.get('/thingiverse/popular-things', (req:express.Request, res:express.Response)=>{
        logRequest(req);
        thingiverseClient.sendPopularThings(res);
    })

    app.get('/thingiverse/thing', (req:express.Request, res:express.Response)=>{
        logRequest(req);
        const thingId = req.query.thingId;
        thingiverseClient.sendThingDetails(thingId, res);
    })

};