import React from 'react';
import { connect } from 'react-redux';
import Details from '../table/details';
import {taskDetails} from '../table/multipleTasks'

class PostCard extends React.Component{

    componentDidMount(){
        taskDetails()
    }

    render(){
        const {task, detailsEnable} = this.props;        
        
        return(
            <>
            <div className="post-card">
                <div className="circle"></div>
                <div className="post-details">
                    <h3>{task.eventName}</h3>
                    <p>{task.timeStart} - {task.timeEnd}</p>
                    <div 
                        className="dots task-div"
                        data-name={task.eventName}
                        data-start = {task.timeStart}
                        data-end = {task.timeEnd}
                        data-id = {task.id}
                        data-date = {task.date}
                    >
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            </div>
                {detailsEnable ?
                    <Details/>
                    : null
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return{
        detailsEnable: state.toggleModal.detailsEnable,
    }
}

export default connect(mapStateToProps)(PostCard);