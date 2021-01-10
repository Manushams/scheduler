import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import {rootReducer} from './store/reducers/combinedReducers';
import { ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase';
import {firebaseConfig} from './config/fbconfig';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from 'firebase/app';
import thunk from 'redux-thunk';
import 'firebase/firestore'

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
}

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(getFirebase))
    )
    );
    
firebase.initializeApp(firebaseConfig);
firebase.firestore()
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance 
}


ReactDOM.render(
  <Provider store = {store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider >
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
