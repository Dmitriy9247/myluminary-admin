
import { gql } from "@apollo/client"

export const GET_CATEGORY = gql`
query Category($id:ID!) {
  category(_id:$id) {
    _id
    title
    slug
    description
    picture {
      _id
      url
    }
    parent {
      _id
    }
  }
}
`
export const GET_CATEGORIES = gql`
  query Categories {
      categories {
        _id
        title
        slug
        status
        picture {
          _id
          url
        }
        parent {
            _id
            title
        }
        children {
            _id
            title
        }
      }
  }
`

export const GET_PRODUCTS = gql`
  query Products {
    products {
      _id
      name
      price
      slug
      ratings
      reviews
      stock
      short_description
      is_featured
      is_new
      until
      discount
      variants {
        price
        sale_price
      }
      pictures {
        url
        width
        height
      }
      small_pictures {
        url
        width
        height
      }
      categories {
        title
        slug
      }
    }
  }
`