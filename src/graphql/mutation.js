import { gql } from "@apollo/client"

export const CREATE_CATEGORY = gql`
 mutation CreateCategory($title: String!, $description:String, $parentId:ID, $pictureId:ID, $slug: String!, $status:Boolean){
    createCategory(input: {title:$title, description:$description, parentId:$parentId, pictureId:$pictureId, slug:$slug, status:$status}){
        _id,
        title,
        slug
    }
 }
`;

export const DELETE_CATEGORY = gql`
 mutation DeleteCategory($id: ID!){
    deleteCategory(_id:$id) {
        _id
    }
 }
`;

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($id:ID!, $title: String, $description:String, $parentId:ID, $pictureId:ID, $slug: String, $status:Boolean){
    updateCategory(_id:$id, input: {title:$title, description:$description, parent:$parentId, picture:$pictureId, slug:$slug, status:$status}){
        _id,
        title,
        slug,
        status,
        slug
    }
 }
`;

export const CREATE_BRAND = gql`
mutation CreateBrand($title: String!, $description:String, $picture:ID, $slug: String, $url: String!){
    createBrand(input: {title:$title, description:$description, picture:$picture, url:$url, slug:$slug}){
        _id,
        title,
        slug,
        description,
        url,
    }
}
`

export const UPDATE_BRAND = gql`
mutation UpdateBrand($id:ID!, $title: String, $description:String, $picture:ID, $slug: String, $url: String){
    updateBrand(_id:$id, input: {title:$title, description:$description, picture:$picture, url:$url, slug:$slug}){
        _id,
        title,
        slug,
        description,
        url,
    }
}
`

export const DELETE_BRAND = gql`
 mutation DeleteBrand($id: ID!){
    deleteBrand(_id:$id) {
        _id
    }
 }
`;