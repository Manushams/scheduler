import React from 'react'

const Modal = ({startTime}) => {
    return (
        <div className='modal'>
            <div className='modal-title'>
                <h3>Add an Event</h3>
            </div>
            <form action="" className='form'>
                <div>
                    <label htmlFor="eventName">
                        Name
                </label>
                    <input
                        type="text"
                        placeholder='Name of event'
                        id='eventName'
                    />
                </div>
                <div>
                    <label htmlFor="timeStart">
                        Start
                </label>
                    <input
                        type="time"
                        value={startTime}
                        id='timeStart'
                    />
                </div>
                <div>
                    <label htmlFor="timeEnd">
                        End
                </label>
                    <input
                        type="time"
                        id='timeEnd'
                    />
                </div>
                <div>
                    <label htmlFor="day">
                        Day
                </label>
                    <input
                        type="date"
                        id='day'
                    />
                </div>
            </form>
        </div>
    )
}

export default Modal