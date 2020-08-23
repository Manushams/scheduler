import React from 'react';
import {closeModal} from '../../store/actions/toggleModalAction';
import {connect} from 'react-redux'

class Modal extends React.Component{

    state = {
        timeStart: '',
    }

    onChangeHandle = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e)
    }

    render(){    
    const {  startTime } = this.props
    const { timeStart  } = this.state

    return (
        <div className='modal'>
            <div className='modal-title'>
                <h3>Add an Event</h3>
                <i onClick = {() => this.props.closeModal()}
                >
                    x
                </i>
            </div>
            <form action="">
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
                            value={timeStart ? timeStart : startTime}
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
                        onChange = {this.onChangeHandle}
                    />
                </div>
                <div className='input-field'>
                    <button className='submit-btn'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(null, mapDispatchToProps)(Modal);