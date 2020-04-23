import 'graphql-import-node'; //import without name... WHAT?!
//import * as typeDefs from './schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        helloWorld: String!
        thing(id: ID!): Thing
        creator(id: ID!): Creator
        things: [Thing]
        creators: [Creator]
    }

    type Thing {
        id: ID!,
        name: String,
        url: String,
        public_url: String,
        created_at: String,
        thumbnail: String,
        preview_image: String,
        creator: Creator,
        is_private: Boolean,
        is_purchased: Boolean,
        is_published: Boolean
    }

    type Creator{
        id: ID,
        name: String,
        first_name: String,
        last_name: String,
        url: String,
        public_url: String,
        thumbnail: String,
        accepts_tips: Boolean,
        is_following: Boolean,
        location: String,
        cover: String
    }

`;

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;