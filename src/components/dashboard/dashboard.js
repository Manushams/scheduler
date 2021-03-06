import React from 'react';
import {Link} from 'react-router-dom'
import Section from './section';
import Stats from './stats';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import Modal from '../table/addTaskModal'
import Empty from '../../images/empty.svg'

class Dashboard extends React.Component{
    render(){
        const today = new Date(),
            todayDate = today.getDate(),
            month = today.getMonth(),
            year =  today.getFullYear(),
            dayFromStart = new Date(year, month, todayDate);            
        let {tasks} = this.props,
            upcomingTasks = tasks && tasks.filter(task => 
                Date.parse(dayFromStart) <= Date.parse(task.date) &&
                task.completed === false)
        
        upcomingTasks && upcomingTasks.sort((t1, t2) => Date.parse(t1.date) - Date.parse(t2.date))

        return(
            <div className="dashboard">

                <div className="top-bar">
                    <div>
                        <h3>
                            {today.toLocaleString('default', {month: 'long'})} {today.getDate()}, {today.getFullYear()}
                        </h3>
                    </div>
                    <ul>
                        <li><Link to="/">Day</Link></li>
                        <li><Link to="/week">Week</Link></li>
                        <li><Link to="/month">Month</Link></li>
                    </ul>
                </div>

                <main>
                    {upcomingTasks && upcomingTasks.length ?
                        <div className='agenda'>
                            <Section
                                tasks = {upcomingTasks}
                            /> 
                        </div>
                        :
                        <div className="img-empty">
                            <h4>You do not have any upcoming tasks for this week!</h4>
                            <img 
                                src={Empty}
                                alt="empty"
                                className='svg empty'

                            />                         
                        </div>   
                    }

                    <div className="stats">
                        <Stats
                            tasks = {tasks}
                            upcomingTasks = {upcomingTasks}
                        />
                    </div>
                    
                </main>
                <Modal/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        tasks: state.firestore.ordered.tasks,
        uid: state.firebase.auth.uid
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
        return [
            { 
                collection: 'users',
                doc: props.uid ? props.uid : ' ',
                subcollections: [{collection: 'tasks'}],
                storeAs: 'tasks'
            },
        ]
    }),
)(Dashboard);