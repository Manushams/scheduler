import React from 'react';
import PostCard from '../dashboard/postCard';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class All extends React.Component{
    render(){
        const today = new Date();
        let {tasks} = this.props

        let sorted = tasks && tasks.slice().sort((t1, t2) =>  Date.parse(t1.date) -  Date.parse(t2.date))
        
        return(
            <div className="overdue">
           
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
                <div className="tasks">

                    <div className="title">
                        <h3>All</h3>
                    </div>

                    <div className="section">
                        {sorted && sorted.map(task => 
                            <PostCard task = {task} key={task.id} />
                        )}
                    </div>
                </div>

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
)(All);