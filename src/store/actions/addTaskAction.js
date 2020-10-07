export const addTask = (task) => {
    const startHour = parseInt(task.timeStart)
    const endHour = parseInt(task.timeEnd)
    const startMinutes = parseInt(task.timeStart.toString().slice(3,5))
    const endMinutes = parseInt(task.timeEnd.toString().slice(3,5))
    const startTotalMins = startHour * 60 + startMinutes
    const endTotalMins = endHour * 60 + endMinutes
    const height = (endTotalMins - startTotalMins ) * (2/15)

    if(height > 0){
        return {type: 'ADD_TASK', task}
    }else{
        return {type: 'ADD_TASK_ERROR', err: 'Wrong Time Input'}
    }
}

export const removeErrMessage = () => {
    return {type: 'REMOVE_ERR_MESSAGE'}
}

export const errMessage = () => {
    return {type: 'ADD_TASK_ERROR', err: 'Wrong Time Input'}
}