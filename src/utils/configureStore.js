import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducer';
import { loadStorage } from './localStorage';

const initialState = loadStorage(`${window.origin}/state`) || {};

export default function configureStore() {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
