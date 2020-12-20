import {combineReducers} from 'redux'
import {toggleModal} from './toggleModal'
import {addTask} from './addTaskReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'

export const rootReducer = combineReducers({
    toggleModal,
    addTask,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})