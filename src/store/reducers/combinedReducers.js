const initState = {
    modalEnable: false
}

export const reducers = (state = initState, action) => {
    switch(action.type){
        case 'CLOSE_MODAL':
            return{
                ...state,
                modalEnable: false
            }
        case 'OPEN_MODAL':
            return{
                ...state,
                modalEnable: true
            }    
        default:
            return state   
    }
}