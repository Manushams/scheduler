import React from 'react';
import {connect} from 'react-redux';
import {closeDetailsModal} from '../../store/actions/toggleModalAction';
import {} from '../../store/actions/deleteTaskAction'
import { deleteTask } from '../../store/actions/deleteTaskAction';
import { completed } from '../../store/actions/addTaskAction';

class Details extends React.Component{

    deleteTaskHandle = () => {
        const {task, deleteTask} = this.props;
        // document.querySelector('#' + CSS.escape(`${task.id}`)).remove()
        deleteTask(task)
    }

    render(){
        const {task, completed} = this.props

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
                            <button 
                                className='btn submit-btn'
                                onClick = {() => completed(task)}
                            >
                                Completed
                            </button>
                            <button 
                                className='btn submit-btn'
                                onClick = {this.deleteTaskHandle}
                            >
                                Delete
                            </button>
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
        closeDetailsModal: () => dispatch(closeDetailsModal()),
        deleteTask: (task) => dispatch(deleteTask(task)),
        completed: task => dispatch(completed(task))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Details)