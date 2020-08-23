const initState = {
    tasks: []
}

export const addTask = (state = initState, action){
    switch(action.type){
        case 'ADD_TASK':
            const newState = [...state.tasks, action.task]
            console.log('newState',newState)
            return newState
        
        default:
            return state
    }
}