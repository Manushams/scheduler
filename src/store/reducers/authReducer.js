const initState = {
    error: null
}

export const authReducer = (state = initState, action) => {
    switch(action.type){

        case 'SIGNIN_SUCCESS':
            console.log('sign in success')
            return {
                ...state,
                error: null
            }  

        case 'SIGNIN_ERR':
            console.log('sign in error:', action.err)
            return {
                ...state,
                error: action.err.message
            }   
            
        case 'LOGIN_SUCCESS':
            console.log('successfuly logged in')
            return {
                ...state,
                error: null
            }  

        case 'LOGIN_ERR':
            console.log('login error:', action.err)
            return {
                ...state,
                error: action.err.message
            } 

        case 'LOGOUT_SUCCESS':
            console.log('logout success')
            return state;
            
        case 'LOGOUT_ERROR':
            console.log('logout error:', action.err)
            return state;
            
        default:
            return state
    }
}