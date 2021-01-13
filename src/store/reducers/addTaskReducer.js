export const addTask = (state = [], action)=>{
    switch(action.type){
        case 'ADD_TASK':
            console.log('task successfully added')
            return state
        
        case 'ADD_TASK_FAILED':
            console.log('error:', action.err)
            return state;

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
        
        case 'COMPLETED_SUCCESS':
            console.log('task marked completed')
            return state

        case 'COMPLETED_ERROR':            
            console.log('task completed error:', action.err)
            return state

        default:
            return state
    }
}