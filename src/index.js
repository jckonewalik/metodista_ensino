import React from 'react';
import HttpsRedirect from 'react-https-redirect';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import App from './app/App';
import { store, persistor } from './redux/store';
import * as serviceWorker from './serviceWorker';

const env = runtimeEnv();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HttpsRedirect disabled={env.NODE_ENV === 'development'}>
        <App />
      </HttpsRedirect>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
