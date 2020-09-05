const initState = {
    tasks: [],
    error: null
}

export const addTask = (state = initState, action)=>{
    switch(action.type){
        case 'ADD_TASK':
            const newTasks = state.tasks.concat(action.task)
            console.log('newState',newTasks)
            return {
                ...state,
                tasks: newTasks,
                error: null
            }
        
        case 'ADD_TASK_ERROR':
            return {
                ...state,
                error: action.err 
            }
            
        case 'REMOVE_ERR_MESSAGE':
            return {
                ...state,
                error: null
            } 
        default:
            return state
    }
}