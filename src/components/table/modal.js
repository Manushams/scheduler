import React from 'react'

const Modal = ({ startTime }) => {
    
    return (
        <div className='modal'>
            <div className='modal-title'>
                <h3>Add an Event</h3>
            </div>
            <form action="">
                <div className='input-field'>
                    <label htmlFor="eventName">Event/Task Name</label>
                    <input 
                        placeholder = 'Type here...'
                        type="text"
                        id='eventName'
                    />
                </div>
                <div className='input-field-time'>
                    <div className='time-field'>
                        <label htmlFor="timeStart">Start</label>
                        <input 
                            type='time'
                            id='timeStart'
                            value={startTime}
                        />
                    </div>
                    <div className='time-field'>
                        <label htmlFor="timeEnd">End</label>
                        <input 
                            type='time'
                            id='timeEnd'
                        />
                    </div>
                </div>
                <div className='input-field'>
                    <label htmlFor="day">Day</label>
                    <input type="date"/>
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

export default Modal