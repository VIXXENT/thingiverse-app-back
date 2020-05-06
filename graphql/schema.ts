import 'graphql-import-node'; //import without name... WHAT?!
//import * as typeDefs from './schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        thingsCursoredList(cursor:CursorInput): ThingsCursoredList
        thing(id: ID!): Thing
        creator(id: ID!): Creator
        creators: [Creator]
        images: [Image]
        files: [File]
    }

    input CursorInput {
        page: Int
        per_page: Int
        sort: String!
        is_featured: Boolean
    }

    type Cursor{
        page: Int
        per_page: Int
        sort: String
        is_featured: Boolean
    }

    type ThingsCursoredList{
        cursor: Cursor
        hasMore: Boolean
        things: [Thing]
    }

    type Thing {
        added: String
        ancestors_url: String
        app_count: Int
        app_id: ID
        categories_url: String
        collect_count: Int
        comment_count: Int
        created_at: String
        creator: Creator
        default_image: Image
        derivatives_url: String
        description: String
        description_html: String
        details: String
        details_parts: [DetailsPart]
        download_count: Int
        edu_details:String
        edu_details_parts:[EduDetailsPart]
        education: Education
        file_count: Int
        files: [File]
        files_url: String
        id: ID
        images: [Image]
        images_url: String
        in_library: Boolean
        instructions: String
        instructions_html: String
        is_collected: Boolean
        is_featured: String
        is_liked: Boolean
        is_nsfw: Boolean
        is_private: Int
        is_published: Int
        is_purchased: Int
        is_watched: Boolean
        is_wip: Int
        layout_count: Int
        layouts_url: String
        license: String
        like_count: Int
        likes_url: String
        make_count: Int
        modified: String
        name: String
        preview_image: String
        print_history_count: Int
        public_url: String
        remix_count: Int
        tags_url: String
        thumbnail: String
        url: String
        view_count: Int
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

    type File{
        id: ID!
        name: String
        size: Int
        url: String
        public_url: String
        download_url: String
        threejs_url: String
        thumbnail: String
        default_image: String
        date: String
        formatted_size: String
        # meta_data: String
        download_count: Int
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