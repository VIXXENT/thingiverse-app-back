import { IResolvers } from 'graphql-tools';
import * as thingiverseClient from '../thingyverse-client/client';
export const sort = thingiverseClient.sort;

export interface Cursor {
    page: number,
    per_page: number
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

        thingsCursoredList: async(_, queryParams: { sort: string, cursor?: Cursor }) => {
            console.log("RESOLVER_MAP - MORE_THINGS - queryParams:", queryParams);
            console.log("RESOLVER_MAP - MORE_THINGS - sort:", queryParams.sort);
            console.log("RESOLVER_MAP - MORE_THINGS - cursor:", queryParams.cursor);
            const cursor:Cursor = queryParams.cursor? queryParams.cursor : {page:1, per_page:10};
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
      },

};

export default resolverMap;