import { IResolvers } from 'graphql-tools';
import * as thingiverseClient from '../thingyverse-client/client';

const resolverMap: IResolvers = {
    Query:{
        helloWorld(_, args:void): string{
            console.log('ResolverMap: Query: args:', args); // [VLOG]
            return `👋 Hello world! 👋`;
        },

        thing: async (_, { id }) => {
            return await thingiverseClient.getThingDetails(id);
        },

        things: async(_) =>{
            return await thingiverseClient.getPopularThings();
        }
    }

};

export default resolverMap;