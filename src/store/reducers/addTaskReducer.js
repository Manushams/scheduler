const initState = {
    tasks: [
        {
            cellDetails: {id: '0.1234512312348', row: 2, title: 'Fri Nov 06 2020'},
            date: '2020-11-06',
            eventName: 'hey There',
            height: 96.5333333333,
            id: '0.181213481234',
            timeEnd: '12:15',
            timeStart: '10:45'
        },
        {
            cellDetails: {id: '0.123441231234', row: 2, title: 'Fri Nov 06 2020'},
            date: '2020-11-06',
            eventName: 'second',
            height: 96.5333333333,
            id: '0.881283481234',
            timeEnd: '11:42',
            timeStart: '11:11'
        },
        
    ],
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