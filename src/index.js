import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './utils/configureStore';
import { saveStorage } from './utils/localStorage';

const store = configureStore();

store.subscribe(() => {
  var state = store.getState();
  saveStorage(`${window.origin}/state`, { ...state });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
