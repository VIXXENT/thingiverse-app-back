import { IResolvers } from 'graphql-tools';
import * as thingiverseClient from '../thingyverse-client/client';
export const sort = thingiverseClient.sort;

const resolverMap: IResolvers = {
    Query:{
        thingDetail: async (_, { id }) => {
            return await thingiverseClient.getThingDetails(id);
        },

        things: async(_, queryParams:{sort:string, page?:number}) =>{
            return await thingiverseClient.searchThings(queryParams);
        }
    }

};

export default resolverMap;