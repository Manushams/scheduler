import React from 'react';
import PostCard from '../dashboard/postCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Modal from '../table/addTaskModal';
import NoTask from './notask';
import Nodata from '../../images/no_data.svg'
class Overdue extends React.Component {
    render() {
        const today = new Date(),
            date = today.getDate(),
            month = today.getMonth(),
            year = today.getFullYear(),
            { tasks } = this.props

        let overdue = tasks && tasks.filter((task) =>
            Date.parse(new Date(year, month, date)) > Date.parse(new Date(task.date))
            && !task.completed
        );

        overdue = overdue && overdue.sort((t1, t2) => Date.parse(t1.date) - Date.parse(t2.date))

        return (
            <div className="overdue">

                <div className="top-bar">
                    <div>
                        <h3>
                            {today.toLocaleString('default', { month: 'long' })} {today.getDate()}, {today.getFullYear()}
                        </h3>
                    </div>
                    <ul>
                        <li><Link to="/">Day</Link></li>
                        <li><Link to="/week">Week</Link></li>
                        <li><Link to="/month">Month</Link></li>
                    </ul>
                </div>
                <div className="tasks">

                    <div className="title">
                        <h3>Overdue</h3>
                    </div>

                    {tasks && tasks.length ? 

                        <div className="section">
                            {overdue && overdue.map(task =>
                                <PostCard task={task} key={task.id} />
                            )}
                        </div>
                        :
                        < NoTask 
                            text='You do not have any overdue tasks' 
                            img = {Nodata}
                        /> 
                    }
                </div>
                <Modal/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
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
                subcollections: [{
                    collection: 'tasks',
                    where: [
                        ['completed', '==', false]
                    ]
                }],
                storeAs: 'tasks'
            },
        ]
    }),
)(Overdue);