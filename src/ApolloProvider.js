import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import  {createUploadLink} from 'apollo-upload-client'


const httpLink = createUploadLink({
    uri:"http://localhost:4000/graphql"
})

const client = new ApolloClient({
    link:httpLink,
    cache: new InMemoryCache()
})

export default (

    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)