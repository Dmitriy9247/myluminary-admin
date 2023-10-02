import { gql } from "@apollo/client"

export const CREATE_CATEGORY = gql`
 mutation CreateCategory($title: String!, $description:String, $parentId:ID, $pictureId:ID, $slug: String!, $status:Boolean){
    createCategory(input: {title:$title, description:$description, parent:$parentId, picture:$pictureId, slug:$slug, status:$status}){
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
`;

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
`;

export const DELETE_BRAND = gql`
 mutation DeleteBrand($id: ID!){
    deleteBrand(_id:$id) {
        _id
    }
 }
`;

export const CREATE_PRODUCT = gql`
mutation CreateProduct($name: String!, $long_description:String, $short_description:String, $category:ID!, $slug: String!, $brands:[ID], $pictures: [ID]){
    createProduct(input: {name:$name, long_description:$long_description, short_description:$short_description, category: $category, slug:$slug, brands:$brands, pictures:$pictures}){
        _id,
        name,
        slug,
        short_description,
    }
 }
`;

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($id:ID!, $name: String, $long_description:String, $short_description:String, $category:ID, $slug: String, $brands:[ID], $pictures: [ID]){
    updateProduct(_id:$id, input: { name:$name, long_description:$long_description, short_description:$short_description, category: $category, slug:$slug, brands:$brands, pictures:$pictures }){
        _id,
        name,
        slug,
        short_description,
    }
 }
`;

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: ID!){
    deleteProduct(_id:$id)
 }
`;


export const CREATE_MEDIA = gql`
mutation CreateMedia($bucket:String!, $key:String!){
    createMedia(input: {bucket:$bucket, key:$key}){
        _id,
        bucket,
        key
    }
}
`;

export const CREATE_VARIANT = gql`
mutation CreateVariant($color: String, $size:Float, $quantity:Float, $sku:String!, $price: Float!, $sale_price:Float!, $product:ID!, $picture:ID) {
    createVariant(input: {color:$color, size:$size, quantity:$quantity, sku:$sku, price:$price, sale_price:$sale_price, product:$product, picture:$picture}) {
        _id,
        sku
    }
 }
`;

export const UPDATE_VARIANT = gql`
mutation UpdateVariant($id:ID!, $color: String, $size:Float, $quantity:Float, $sku:String, $price: Float, $sale_price:Float, $picture:ID) {
    updateVariant(_id:$id, input: {color:$color, size:$size, quantity:$quantity, sku:$sku, price:$price, sale_price:$sale_price, picture:$picture}) {
        _id,
        sku
    }
 }
`;

export const DELETE_VARIANT = gql`
mutation DeleteVariant($id: ID!){
    deleteVariant(_id:$id) {
        _id
    }
 }
`;


export const UPDATE_USER = gql`
mutation UpdateUser($id:ID!, $name: String, $family_name:String, $given_name:String, $nickname:String, $picture: String, $role:String){
    updateUser(_id:$id, input: {name:$name, family_name:$family_name, given_name:$given_name, nickname:$nickname, picture:$picture, role:$role}){
        _id,
        name,
        role
    }
 }
`;

export const DELETE_USER = gql`
mutation DeleteUser($id: ID!){
    deleteUser(_id:$id)
 }
`;