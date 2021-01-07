import React from 'react';

class Details extends React.Component{
    render(){
        return(
            <div className ='modal details'>
                <div className="modal-card">
                    <div className="modal-title">
                        <h3>Details</h3>
                        <i //onClick = {this.onCloseModal}
                        >
                            x
                        </i>
                    </div>
                    <div className='modal-body'>
                        
                        <div className='group'>
                            <h4 className='group-title'>Event/Task Name</h4>
                            <h3>Untitled</h3>
                        </div>

                        <div className="group-time">
                            <div className="start">
                                <h4 className='group-title'>Start</h4>
                                <h3>12:00</h3>
                            </div>

                            <div className="end">
                                <h4 className='group-title'>End</h4>
                                <h3>12:20</h3>
                            </div>
                        </div>

                        <div className='group'>
                            <h4 className='group-title'>Day</h4>
                            <h3>7 January 2021</h3>
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

export default Details