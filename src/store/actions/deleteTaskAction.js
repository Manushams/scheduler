export const deleteTask = (task) => {
    return (dispatch, getState, getFirebase) => {

        const firestore = getFirebase().firestore();
        console.log(task)
        firestore.collection('tasks').doc(task.id.toString()).delete()
            .then(() => {
                dispatch({type: 'TASK_DELETED',category: 'TASK_DELETED'})
            }).catch(err => {
                dispatch({type: 'TASK_DELETE_ERR', err})
            })
    }
}