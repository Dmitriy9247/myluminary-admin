
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


export const GET_BRAND = gql`
query Brand($id:ID!) {
  brand(_id:$id) {
    _id
    title
    slug
    description
    url
    picture {
      _id
      url
    }
  }
}
`

export const GET_BRANDS = gql`
  query Brands {
      brands {
        _id
        title
        slug
        url
        picture {
          _id
          url
        }
      }
  }
`

export const GET_PRODUCT = gql`
query Product($id:ID!) {
  product(_id:$id) {
    _id
    name
    slug
    long_description
    short_description
    ratings
    reviews
    pictures {
        _id
        url
    }
    brands {
        _id
    }
    category {
        _id
        title
    }
    variants {
        _id
    }
  }
}`

export const GET_PRODUCTS = gql`
  query Products($name: String, $category:ID, $limit: Int, $skip: Int) {
    products(input: { filter: {name: $name, category:$category}, limit: $limit, skip: $skip }) {
      products {
        _id
        name
        slug
        long_description
        short_description
        ratings
        reviews
        pictures {
            _id
            url
        }
        brands {
            _id
        }
        category {
            _id
            title
        }
        variants {
            _id
        }
      }
      totalProducts
    }
  }
`