import React from 'react';
import {connect} from 'react-redux';
import {closeDetailsModal} from '../../store/actions/toggleModalAction'

class Details extends React.Component{
    render(){
        const {task} = this.props

        return(
            <div className ='modal details'>
                <div className="modal-card">
                    <div className="modal-title">
                        <h3>Details</h3>
                        <i onClick = {this.props.closeDetailsModal}
                        >
                            x
                        </i>
                    </div>
                    <div className='modal-body'>
                        
                        <div className='group'>
                            <h4 className='group-title'>Event/Task Name</h4>
                            <h3>{task.name}</h3>
                        </div>

                        <div className="group-time">
                            <div className="start">
                                <h4 className='group-title'>Start</h4>
                                <h3>{task.start}</h3>
                            </div>

                            <div className="end">
                                <h4 className='group-title'>End</h4>
                                <h3>{task.end}</h3>
                            </div>
                        </div>

                        <div className='group'>
                            <h4 className='group-title'>Day</h4>
                            <h3>{task.date}</h3>
                        </div>

                        <div className="group-btn">
                            <button className='btn btn-delete submit-btn'>Delete</button>
                            <button className='btn btn-cancel submit-btn'>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        task: state.toggleModal.taskDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeDetailsModal: () => dispatch(closeDetailsModal())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Details)