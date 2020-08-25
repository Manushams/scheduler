const initState = {
    tasks: []
}

export const addTask = (state = initState, action)=>{
    switch(action.type){
        case 'ADD_TASK':
            const newTasks = state.tasks.concat(action.task)
            console.log('newState',newTasks)
            return {
                ...state,
                tasks: newTasks
            }
        
        default:
            return state
    }
}