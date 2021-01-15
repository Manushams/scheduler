import React from 'react';

class Stats extends React.Component{
    render(){
        const {tasks, upcomingTasks} = this.props,
            overdue = tasks && upcomingTasks && tasks.length - upcomingTasks.length,
            total = tasks && tasks.length;
        let completed = 0;

        upcomingTasks && upcomingTasks.forEach(task => {
            if(task.completed)completed++;
        })
        return(
            <>
                <h3 className='stats-title'>Stats</h3>
                <div className="stats-content">
                    <div className="stats-task">
                        <h3>Tasks</h3>
                        <div className='info-tasks'>
                            <div className="stat">
                                <p>Total</p>
                                <h4>{total ? total : 0}</h4>
                            </div>
                            <div className="stat">
                                <p>Completed</p>
                                <h4>{completed}</h4>
                            </div>
                            <div className="stat">
                                <p>Overdue</p>
                                <h4>{overdue ? overdue : 0}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Stats