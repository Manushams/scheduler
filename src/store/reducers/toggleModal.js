const initState = {
    modalEnable: false,
    detailsEnable: false
}

export const toggleModal = (state = initState, action) => {
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
        
        case 'OPEN_DETAILS_MODAL':
            return{
                ...state,
                detailsEnable: true
            }
        case 'CLOSE_DETAILS_MODAL':
            return{
                ...state,
                detailsEnable: false
            }
        default:
            return state   
    }
}