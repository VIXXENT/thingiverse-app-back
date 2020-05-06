import { IResolvers } from 'graphql-tools';
import * as thingiverseClient from '../thingyverse-client/client';
export const sort = thingiverseClient.sort;

export interface Cursor {
    page: number
    per_page: number
    sort: string
    is_featured: boolean
}

interface ThingsCursoredList{
    cursor: Cursor
    hasMore: Boolean
    things: any[]
}

const resolverMap: IResolvers = {
    Query: {
        thing: async (_, { id }) => {
            return await thingiverseClient.getThingDetails(id);
        },

        thingsCursoredList: async(_, queryParams: { cursor: Cursor }) => {
            const cursor:Cursor = queryParams.cursor? queryParams.cursor : {page:1, per_page:10, sort:'popular', is_featured: false};
            queryParams.cursor = cursor;
            const results = await thingiverseClient.searchThings(queryParams);
            const list:ThingsCursoredList = {
                cursor,
                hasMore: (results.length>0),
                things: results 
            }

            return list;
        }
    },
    
    Thing: {
        images: async (thing: any) => {
            return await thingiverseClient.getThingImages(thing.id);
        },
        files: async (thing: any) => {
            const files = await thingiverseClient.getThingFiles(thing.id);
            return files;
        }
      },

};

export default resolverMap;