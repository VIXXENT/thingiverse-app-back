import bodyParser from "body-parser";
import express from "express";
import querystring from 'querystring';
import cache from '../cache/cache'
//import { Client } from "node-rest-client"; //incompatible with "noImplicitAny: true"
const Client = (require("node-rest-client") as any).Client;//TODO: change to a typed rest client


const authUrl = "https://www.thingiverse.com/login/oauth/authorize";
const tokenUrl = "https://www.thingiverse.com/login/oauth/access_token";
const tokenInfoUrl = "https://www.thingiverse.com/login/oauth/tokeninfo";
const redirectCodeUrl = "http://localhost:8080/thingiverse/authCode";
const clientId = "b2de5a3ecb494ab9040b";
const clientSecret = "7fb62ab0061ec771793f71287d239746";
const client = new Client();

export const authenticate = function (respo: express.Response) {
    try {
        const args = {
            "parameters": {
                "client_id": clientId,
                "redirect_uri": redirectCodeUrl,
                "response_type": "code"
            }
        };

        client.get(authUrl, args, ({}, response: any) => {
            try {
                respo.redirect(response.responseUrl);
            } catch (error) {
                sendErrorResponse(error, respo);
            }
        });
    } catch (error) {
        sendErrorResponse(error, respo);
    }
}

export const requestAndStoreAuthorizationToken = function (req: express.Request, res: express.Response) {
    try {
        const code = req.query.code;

        const args = {
            parameters: {
                "client_id": clientId,
                "client_secret": clientSecret,
                "code": code
            }
        };

        client.post(tokenUrl, args, (data: any) => {
            try {
                const dataString = data.toString('utf8');
                const tokenData = querystring.decode(dataString);
                bodyParser.urlencoded

                cache.set("tokenData", tokenData, 0);
                res.send({message:'token received and stored!'});
            } catch (error) {
                sendErrorResponse(error, res);
            }
        });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

export const sendTokenInfo = function (res: express.Response) {
    try {
        const tokenData: any = cache.get("tokenData");
        if (!tokenData) {
            const errorMessage = "No token registered in caché!";
            res.status(500).send(errorMessage);
            throw new Error(errorMessage);
        }

        const args = {
            parameters: {
                access_token: tokenData.access_token
            }
        }

        client.post(tokenInfoUrl, args, (data: any) => {
            try {
                const tokenClient = data.audience;
                const isTokenValid = tokenClient === clientId;
                let message = `Current token is ${JSON.stringify(tokenData)}\n`;
                message += `Token info: ${JSON.stringify(data)}\n`;
                message += `Token is${isTokenValid ? " " : " NOT "}valid.`;
                const json = {...data, ...tokenData, message};
                res.send(JSON.stringify(json));
            } catch (error) {
                sendErrorResponse(error, res);
            }

        });
    } catch (error) {
        sendErrorResponse(error, res);
    }

}

function sendErrorResponse(error: any, response: express.Response) {
    console.log("Sending error response", error);
    try{
        response.status(500).send(JSON.stringify(error))
    }catch(errorShowingErrror){
        error&&console.error(error.toString());
    }
}

