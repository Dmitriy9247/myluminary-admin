
import { gql } from "@apollo/client"
export const GET_CATEGORIES = gql`
query Categories {
    categories {
        _id
        title
        slug
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