import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider, useSelector } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import {rootReducer} from './store/reducers/combinedReducers';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded} from 'react-redux-firebase';
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

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children
}


ReactDOM.render(
  <Provider store = {store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider >
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
