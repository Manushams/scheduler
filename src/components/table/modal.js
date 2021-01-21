import React from 'react';
import {closeModal} from '../../store/actions/toggleModalAction';
import {addTask, errMessage} from '../../store/actions/addTaskAction'
import {removeErrMessage} from '../../store/actions/addTaskAction'
import {connect} from 'react-redux'
import {Height} from './task'

class Modal extends React.Component{

    state = {
        timeStart: '',
        eventName: 'Untitled',
        date: ''
    }

    componentDidMount(){
        if(this.props.date){
            const {date} = this.props,
                monthFixed = (month) => {
                    if(month >= 0 && month < 9)return `0${month+1}`;
                    else if(month >= 9)return month + 1;
                },
                dayFixed = (day) => {
                    if(day > 0 && day < 10)return `0${day}`;
                    else if(day >= 10)return day ;
                },
                dateValue = `${date.getFullYear()}-${monthFixed(date.getMonth())}-${dayFixed(date.getDate())}`

            this.setState({
                date: dateValue
            })
        }
    }

    onChangeHandle = e => {
        const {details} = this.props
        this.setState({
            [e.target.id]: e.target.value,
            cellDetails: details ? details : null ,
        })
    }

    onSubmitHandle = (e) => {
        e.preventDefault();        
        if (!this.state.timeStart){
            this.setState({
                timeStart: this.props.startTime
            })
        }
        setTimeout(() => {
            if(!this.state.timeEnd || !this.state.date){
                this.props.errMessage()
            }else{
                const details = {...this.state}
                const newTask = {...details, height: Height(details), id: Math.random()}
                this.props.addTask(newTask)
            }
        },100)
    }

    onCloseModal = () => {
        this.props.removeErrMessage()
        this.props.closeModal();
    }

    render(){    
    const {  startTime, error } = this.props,
        { timeStart, date } = this.state
    
    return (
        <div className='modal'>
        <div className='modal-card'>
            <div className='modal-title'>
                <h3>Add an Event</h3>
                <i onClick = {this.onCloseModal}
                >
                    x
                </i>
            </div>
            <form onSubmit = {this.onSubmitHandle}>
                <div className='input-field'>
                    <label htmlFor="eventName">Event/Task Name</label>
                    <input 
                        placeholder = 'Type here...'
                        type="text"
                        onChange = {this.onChangeHandle}
                        id='eventName'
                    />
                </div>
                <div className='input-field-time'>
                    <div className='time-field'>
                        <label htmlFor="timeStart">Start</label>
                        <input 
                            type='time'
                            id='timeStart'
                            value={timeStart !== '' ? timeStart : startTime}
                            onChange = {this.onChangeHandle}
                        />
                    </div>
                    <div className='time-field'>
                        <label htmlFor="timeEnd">End</label>
                        <input 
                            type='time'
                            id='timeEnd'
                            onChange = {this.onChangeHandle}
                        />
                    </div>
                </div>
                <div className='input-field'>
                    <label htmlFor="day">Day</label>
                    <input  
                        type="date"
                        id='date'
                        value = {date}
                        onChange = {this.onChangeHandle}
                    />
                </div>
                {error ? <p className = 'time-input-error'>{error}</p> : null}
                <div className='input-field-submit'>
                    <input 
                        type="submit"
                        className = 'submit-btn'
                        onSubmit={this.onSubmitHandle}
                    />
                </div>
            </form>
            </div>
        </div>
    )
    }
}

const mapStateToProps = state => {
    return{
        error: state.addTask.error,
        tasks: state.addTask.tasks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        closeModal: () => dispatch(closeModal()),
        addTask: task => dispatch(addTask(task)),
        removeErrMessage: () => dispatch(removeErrMessage()),
        errMessage: () => dispatch(errMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);