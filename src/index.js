import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { hydrate, render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { RetryLink } from "apollo-link-retry";
import { withClientState } from "apollo-link-state";
import { persistCache } from "apollo-cache-persist";
import { BrowserRouter } from "react-router-dom";
const cache = new InMemoryCache();

const request = async operation => {
  const token = (await localStorage.getItem("authtoken")) || "";

  operation.setContext({
    headers: {
      Authorization: `JWT ${token}`
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
      }
      if (networkError) {
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true,
        isLoggedIn: !!localStorage.getItem("authtoken"),
        authRoute: false,
        showProfile: false,
        tempuser: false
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } });
            return null;
          }
        }
      },
      cache
    }),
    new HttpLink({
      uri: "https://api.buzzraker.com/graphql/"
      //uri: "http://localhost:8000/graphql/"
    })
  ]),
  cache
});

/* const client = new ApolloClient({
  uri: 'https://api.buzzraker.com/graphql/',

  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('authtoken') || ''
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`
      }
    })
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem('authtoken'),
      authRoute: false,
      showProfile: false,
      tempuser: false
    }
  }
})
 */
const storage = window.localStorage;
const waitOnCache = persistCache({ cache, storage });
waitOnCache.then(() => {
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider fetchPolicy="cache-first" client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
});

serviceWorker.unregister();
