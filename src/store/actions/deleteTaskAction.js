export const deleteTask = (task) => {
    return (dispatch, getState, getFirebase) => {

        const firestore = getFirebase().firestore();

        firestore.collection('tasks').doc(task.id.toString()).delete()
            .then(() => {
                //document.querySelector('#' + CSS.escape(`${task.id}`)).remove()
                //console.log('getState().firestore.ordered.tasks' ,getState())
                console.log(getState().firestore.ordered.tasks)
                dispatch({type: 'TASK_DELETED',category: 'TASK_DELETED', task})
            }).catch(err => {
                dispatch({type: 'TASK_DELETE_ERR', err})
            })
    }
}