import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Windmill } from '@windmill/react-ui';
import './assets/css/custom.css';
import './assets/css/tailwind.css';
import './assets/css/tailwind.output.css';
import '@pathofdev/react-tag-input/build/index.css';
import App from './App';
import myTheme from './assets/theme/myTheme';
import { AdminProvider } from './context/AdminContext';
import { SidebarProvider } from './context/SidebarContext';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from './graphql'
import ThemeSuspense from './components/theme/ThemeSuspense';
import { Auth0Provider } from '@auth0/auth0-react';
// import * as serviceWorker from './serviceWorker';

// if (process.env.NODE_ENV !== "production") {
//   const axe = require("react-axe");
//   axe(React, ReactDOM, 1000);
// }

const providerConfig = {  
  domain: 'dev-6wfmyrzd8pj2qewp.us.auth0.com',
  clientId: 'aTdnve44aHq3vMFF7zcKu3O2bxLJ4Jzq',
  authorizationParams: {
    redirect_uri: 'http://localhost:4000/',
  },
}

ReactDOM.render(
    <ApolloProvider client={ApolloClient}>
      <AdminProvider>
        <SidebarProvider>
          <Suspense fallback={<ThemeSuspense />}>
            <Windmill usePreferences theme={myTheme}>
                <Auth0Provider {...providerConfig}>
                  <App />
                </Auth0Provider>
            </Windmill>
          </Suspense>
        </SidebarProvider>
      </AdminProvider>
    </ApolloProvider>
,

  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
