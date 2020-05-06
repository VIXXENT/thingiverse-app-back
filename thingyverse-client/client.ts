import cache from "../cache/cache";
import express from "express";
import {RestClient, IRequestOptions, IRestResponse} from "typed-rest-client";
import { Cursor } from "../graphql/resolverMap";

const thingiverseApiUrl = 'https://api.thingiverse.com';
const searchResource = "/search";
const thingsResource = "/things";
const imagesResource = "/images";
const filesResource = "/files";
export const sort = {
    relevant: 'relevant',
    text: 'text',
    popular: 'popular',
    makes: 'makes',
    newest: 'newest'
}

export const sendPopularThings = function (res: express.Response) {
    try {
        searchThings({cursor:{page: 1, per_page: 50, sort: 'popular', is_featured:false}})
        .then((things)=>res.send(JSON.stringify(things)))
        .catch((error)=>sendErrorResponse(error, res));
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

export const searchThings = async function({cursor}:{cursor:Cursor}):Promise<Array<any>>{
    const client = new RestClient(null, thingiverseApiUrl);
    const options:IRequestOptions = {
        queryParameters: {
            params: {                
                access_token: getAccessToken(),
                sort: cursor.sort,
                page: cursor.page,
                per_page: cursor.per_page,
            }
        }
    };
    if(cursor.is_featured){
        options&&
        options.queryParameters&&
        options.queryParameters.params&&
        (options.queryParameters.params.is_featured = 'true');
    }
    
    return client.get(searchResource, options)
        .catch(logError)
        .then((response:any)=>{
            return response.result;
        });
}

export const sendThingDetails = function(thingId:any, res: express.Response){
    try {
        getThingDetails(thingId)
        .then((thing)=>res.send(JSON.stringify(thing)))
        .catch((error)=>sendErrorResponse(error, res));
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

export const getThingDetails = function(thingId:any):Promise<any>{
    const client = new RestClient(null, thingiverseApiUrl);
    const options:IRequestOptions = {
        queryParameters: {
            params: {
                access_token: getAccessToken()
            }
        }
    };

    return client.get<any>(thingsResource+"/"+thingId, options)
        .catch(logError)
        .then((response:void|IRestResponse<any>)=>{
            if(response !== undefined){
                return response.result;
            }else{
                return null;
            }
        });
}

export const getThingImages = function(thingId:string):Promise<any>{
    const client = new RestClient(null, thingiverseApiUrl);
    const options:IRequestOptions = {
        queryParameters: {
            params: {
                access_token: getAccessToken()
            }
        }
    };

    return client.get<any>(`${thingsResource}/${thingId}${imagesResource}`, options)
    .then((response)=>response?response.result:null)
    .catch(logError)
    ;
}

export const getThingFiles = function(thingId:string):Promise<any>{
    const client = new RestClient(null, thingiverseApiUrl);
    const options:IRequestOptions = {
        queryParameters: {
            params: {
                access_token: getAccessToken()
            }
        }
    };

    return client.get<any>(`${thingsResource}/${thingId}${filesResource}`, options)
    .then((response)=>response?response.result:null)
    .catch(logError)
    ;
}

function getAccessToken(){
    const tokenData:any = cache.get("tokenData");
    const accessToken = tokenData&&tokenData.access_token;
    if(!accessToken){
        throw new Error("No access_token registered in caché!");
    }
    return accessToken;
}

function sendErrorResponse(error: any, response: any) {
    let errorMessage = '';
    error&&error.message&&(errorMessage+=error.message+'\n');
    error&&error.stack&&(errorMessage+=error.stack+'\n');
    response.status(500).send(errorMessage)
}

const logError = (error:any)=>{
    console.error(error,'\n', error.toString, '\n', error.stack)
}