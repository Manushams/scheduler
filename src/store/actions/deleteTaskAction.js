export const deleteTask = (task) => {
    return (dispatch, getState, getFirebase) => {

        const firestore = getFirebase().firestore(),
            uid = getState().firebase.auth.uid;

        firestore.collection('users').doc(uid)
            .collection('tasks').doc(task.id.toString()).delete()
            .then(() => {
                dispatch({type: 'TASK_DELETED',category: 'TASK_DELETED', task})
            }).catch(err => {
                dispatch({type: 'TASK_DELETE_ERR', err})
            })
    }
}