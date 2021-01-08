export const closeModal = () => {
    return {type: 'CLOSE_MODAL'}
}

export const openModal = () => {
    return {type: 'OPEN_MODAL'}
}

export const openDetailsModal = (task) => {
    return {type: 'OPEN_DETAILS_MODAL', details: task}
}

export const closeDetailsModal = () => {
    return {type: 'CLOSE_DETAILS_MODAL'}
}