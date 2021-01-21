import React from 'react';
import { connect } from 'react-redux';
import Modal from './modal'

const AddTaskModal = ({modalEnable}) => {
    return(
        <>
            {modalEnable ? <Modal/> : null}
        </>
    )
}

const mapStateToProps = state => {
    return{
        modalEnable: state.toggleModal.modalEnable,
    }
}

export default connect(mapStateToProps)
(AddTaskModal)