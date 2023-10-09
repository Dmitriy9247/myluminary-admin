
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
      bucket
      key
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
          bucket
          key
        }
        parent {
            _id
            title
            slug
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
      bucket
      key
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
          bucket
          key
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
        bucket
        key
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
        color
        size
        quantity
        price
        sale_price
        picture {
          bucket
          key
        }
    }
  }
}`

export const GET_PRODUCTS = gql`
  query Products($name: String, $category:String, $limit: Int, $skip: Int, $sortby:String) {
    products(input: { filter: {name: $name, category:$category}, limit: $limit, skip: $skip, sortby:$sortby }) {
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
            bucket
            key
        }
        brands {
            _id
        }
        category {
            _id
            title
        }
        variants {
          price
          sale_price
        }
      }
      totalProducts
    }
  }
`

export const GET_VARIANT = gql`
query Variant($id:ID!) {
  variant(_id: $id){
    _id
    color
    size
    quantity
    price
    sale_price
    sku
    picture {
      _id
      bucket
      key
    }
  }
}`;

export const GET_USERS = gql`
query Users {
  users {
      _id
      name
      picture
      email
      role
      phone_number
      email_verified
  }
}
`;

export const GET_USER_BY_EMAIL = gql`
query FindbyEmail($email:String!) {
  findbyEmail(email:$email) {
      _id
      email
      role
  }
}
`;

export const GET_FAQS = gql`
query Faqs {
  faqs {
    _id
    question
    answer
    faq_type
  }
}
`

export const GET_FAQ = gql`
query Faq($id:ID!) {
  faq(_id:$id){
    _id
    question
    answer
    faq_type
  }
}
`