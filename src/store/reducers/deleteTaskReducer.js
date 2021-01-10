export const deleteTaskReducer = (state = [], action) => {
    switch(action.type){
        case 'TASK_DELETED':
            console.log('task has been deleted')
            return state;
        
        case 'TASK_DELETE_ERR':
            console.log('failed to delete', action.err)
            return state;

        default:
            return state
    }
}