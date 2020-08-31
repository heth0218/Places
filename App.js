import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default function App() {
  return (<Provider store={store}>
    <PlacesNavigator />
  </Provider>)
}
