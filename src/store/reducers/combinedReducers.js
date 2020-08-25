import {combineReducers} from 'redux'
import {toggleModal} from './toggleModal'
import {addTask} from './addTaskReducer'

export const rootReducer = combineReducers({
    toggleModal,
    addTask
})