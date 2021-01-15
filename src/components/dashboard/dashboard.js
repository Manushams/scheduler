import React from 'react';
import {Link} from 'react-router-dom'

class Dashboard extends React.Component{
    render(){
        const today = new Date();
        return(
            <div className="dashboard">

                <div className="top-bar">
                    <div>
                        <h3>
                            {today.toLocaleString('default', {month: 'long'})} {today.getDate()}, {today.getFullYear()}
                        </h3>
                        <input
                            id='top-bar-calendar'
                            type="date"
                            onChange={this.handleDayChange}
                        />
                    </div>
                    <ul>
                        <li><Link to="/">Day</Link></li>
                        <li><Link to="/week">Week</Link></li>
                        <li><Link to="/month">Month</Link></li>
                    </ul>
                </div>
                <main>
                    <div className='agenda'>

                        <div className="section">
                            <div className="post-day">
                                <h3>Today</h3>
                                <p>Jan 15, 2021</p>
                            </div>
                            
                            <div className="post-card">
                                <div className="circle"></div>
                                <div className="post-details">
                                    <h3>Meeting</h3>
                                    <p>12:00 - 13:00</p>
                                    <div className="dots">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    
                    </div>

                    <div className="stats">
                        <h3 className='stats-title'>Stats</h3>
                        <div className="stats-content">
                            <div className="stats-task">
                                <h3>Tasks</h3>
                                <div className='info-tasks'>
                                    <div className="stat">
                                        <p>Total</p>
                                        <h4>56</h4>
                                    </div>
                                    <div className="stat">
                                        <p>Completed</p>
                                        <h4>51</h4>
                                    </div>
                                    <div className="stat">
                                        <p>Overdue</p>
                                        <h4>2</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
export default Dashboard;