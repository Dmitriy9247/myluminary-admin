import { ApolloClient, InMemoryCache } from "@apollo/client";

const SERVER_URI = process.env.REACT_APP_API_BASE_URL

const client = new ApolloClient({
    uri: `${SERVER_URI}/api/graphql/`,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
    },
})
export default client