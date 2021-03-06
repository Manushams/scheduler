export const addTask = (task) => {
    const startHour = parseInt(task.timeStart)
    const endHour = parseInt(task.timeEnd)
    const startMinutes = parseInt(task.timeStart.toString().slice(3,5))
    const endMinutes = parseInt(task.timeEnd.toString().slice(3,5))
    const startTotalMins = startHour * 60 + startMinutes
    const endTotalMins = endHour * 60 + endMinutes
    const height = (endTotalMins - startTotalMins ) * (2/15)
    if(height > 0){
        return (dispatch, getState, getFirebase) => {
            const firestore = getFirebase().firestore(),
                uid = getState().firebase.auth.uid
            
            firestore.collection('users').doc(uid)
                     .collection('tasks').doc(task.id.toString()).set({
                ...task,
                completed: false
            }).then(() =>{
                console.log(task)
                dispatch({type: 'ADD_TASK', task})
            }).catch(err => {
                dispatch({type: 'ADD_TASK_FAILED', err})
            })
        }
    }else{
        return {type: 'ADD_TASK_ERROR', err: 'Wrong Time Input'}
    }
}

export const completed = (task) => {
    return (dispatch, getState, getFirebase) => {
        const firestore = getFirebase().firestore(),
            uid = getState().firebase.auth.uid;

        firestore.collection('users').doc(uid).collection('tasks').doc(task.id + '').update({
            completed: true,
            completedAt: new Date()
        }).then(() => {
            dispatch({type: 'COMPLETED_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'COMPLETED_ERROR', err})
        } )
    }
}

export const removeErrMessage = () => {
    return {type: 'REMOVE_ERR_MESSAGE'}
}

export const errMessage = () => {
    return {type: 'ADD_TASK_ERROR', err: 'Wrong Time Input'}
}