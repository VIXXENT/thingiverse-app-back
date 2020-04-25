import 'graphql-import-node'; //import without name... WHAT?!
//import * as typeDefs from './schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        helloWorld: String!
        things(sort:String!, page:Int): [Thing]
        thingDetail(id: ID!): ThingDetail
        creator(id: ID!): Creator
        creators: [Creator]
    }

    type Thing {
        id: ID!
        name: String
        url: String
        public_url: String
        created_at: String
        thumbnail: String
        preview_image: String
        creator: Creator
        is_private: Boolean
        is_purchased: Boolean
        is_published: Boolean
    }

    type Creator{
        id: ID
        name: String
        first_name: String
        last_name: String
        url: String
        public_url: String
        thumbnail: String
        accepts_tips: Boolean
        is_following: Boolean
        location: String
        cover: String
    }

    type ThingDetail{
        id: ID
        name: String
        thumbnail: String
        url: String
        public_url: String
        creator: Creator
        added: String
        modified: String
        is_published: Int
        is_wip: Int
        is_featured: String
        is_nsfw: Boolean
        like_count: Int
        is_liked: Boolean
        collect_count: Int
        is_collected: Boolean
        comment_count: Int
        is_watched: Boolean
        default_image: Image
        description: String
        instructions: String
        description_html: String
        instructions_html: String
        details: String
        details_parts: [DetailsPart]
        edu_details:String
        edu_details_parts:[EduDetailsPart]
        license: String
        files_url: String
        images_url: String
        likes_url: String
        ancestors_url: String
        derivatives_url: String
        tags_url: String
        categories_url: String
        file_count: Int
        layout_count: Int
        layouts_url: String
        is_private: Int
        is_purchased: Int
        in_library: Boolean
        print_history_count: Int
        app_id: ID
        download_count: Int
        view_count: Int
        education: Education
        remix_count: Int
        make_count: Int
        app_count: Int
    }

    type Image {
        id: ID
        url: String
        name: String
        sizes: [ImageSize]
        added: String
    }

    type ImageSize {
        type: String
        size: String
        url: String
    }

    type DetailsPart {
        type: String
        name: String
        required: String
        data: [DetailsPartData]
    }

    type DetailsPartData{
        content: String
    }

    type EduDetailsPart {
        type: String
        name: String
        required: String
        label: String
        save_as_component:Boolean
        template: String
        fieldname: String
        default: String
        #opts: String # {"15":"Kindergarten","16":"1st Grade"...}
    }

    type Education {
        grades: [String]
        subjects: [String]
    }

`;

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;