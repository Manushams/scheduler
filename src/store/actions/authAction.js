export const createUser = (user) => {
    return (dispatch, getState, getFirebase) => {
        
        const firebase = getFirebase(),
            firestore = firebase.firestore();

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(resp => {
                console.log(resp.user)
                firestore.collection('users').doc(resp.user.uid).set({
                    username: user.username,
                    email: user.email,
                    uid: resp.user.uid
                }).then(() => {
                    dispatch({type: 'SIGNIN_SUCCESS'})
                })

            }).catch(err => {
                dispatch({type: 'SIGNIN_ERR', err})
            })

    }
}

export const logIn = (user) => {
    return (dispatch, getState, getFirebase) => {

        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                dispatch({type: 'LOGIN_SUCCESS'})
            }).catch(err => {
                dispatch({type: 'LOGIN_ERR', err})
            })

    }
}

export const logOut = () => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();

        firebase.auth().signOut()
            .then(() => {
                dispatch({type: 'LOGOUT_SUCCESS'})
            }).catch(err => {
                dispatch({type: 'LOGOUT_ERROR', err})
            })
    }
}