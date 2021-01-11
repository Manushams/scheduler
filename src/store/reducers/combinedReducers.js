import {combineReducers} from 'redux'
import {toggleModal} from './toggleModal';
import {deleteTaskReducer} from './deleteTaskReducer'
import {addTask} from './addTaskReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import {authReducer} from './authReducer'

export const rootReducer = combineReducers({
    toggleModal,
    addTask,
    deleteTask: deleteTaskReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer
})