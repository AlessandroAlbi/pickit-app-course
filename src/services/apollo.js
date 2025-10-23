import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// HTTP connection to the API
const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
