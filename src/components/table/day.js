import React from 'react';
import { connect } from 'react-redux';
import { setWidthDay, removeIdenticalDivs, removeTaskDivs, displayTask } from './multipleTasks';
import { openModal } from '../../store/actions/toggleModalAction';
import Modal from './modal';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom'

class Day extends React.Component {

    state = {
        hours: [],
        day: new Date(),
        displayed: []
    };

    componentDidMount() {
        this.setHours();
        this.displayTasks();
    }

    componentDidUpdate() {
        this.displayTasks()
    }

    setHours = () => {

        let hours = []
        for (let i = 0; i < 24; i++) {
            if (i < 10) {
                hours.push(`0${i}:00`)
            } else {
                hours.push(`${i}:00`)
            }
        }

        this.setState({
            hours: [...hours]
        })
    }

    handleDayChange = (e) => {
        this.setState({
            day: new Date(e.target.value)
        });
        removeTaskDivs(document.querySelectorAll('.task-div'))
    }

    displayTasks = () => {
        let { tasks } = this.props;
        const { day } = this.state,
            divParent = document.querySelector('.td-parent').querySelector('div'),
            taskDivs = document.querySelectorAll('.task-div')

        if (tasks) {
            tasks = tasks.filter(task => new Date(task.date).toString().slice(0, 15) === day.toString().slice(0, 15))

            tasks.length > 1 && tasks.sort((task1, task2) => task2.height - task1.height) 

            tasks.forEach(task => {
                displayTask(task, divParent)
            })
        }

        removeTaskDivs(taskDivs)
        removeIdenticalDivs()
        setWidthDay()
    }


    render() {
        const { day, hours } = this.state,
            date = day.getDate(),
            month = day.toLocaleString('default', { month: 'long' }),
            year = day.getFullYear(),
            dayWeek = day.toLocaleString('default', { weekday: 'short' }),
            { modalEnable, openModal } = this.props

        return (
            <div className='day'>
                <div className="top-bar">
                    <div>
                        <h3>
                            {month} {date}, {year}
                        </h3>
                        <input
                            id='top-bar-calendar'
                            type="date"
                            onChange={this.handleDayChange}
                        />
                    </div>
                    <ul>
                        <li><a href="/">Day</a></li>
                        <li><a href="/week">Week</a></li>
                        <li><a href="/month">Month</a></li>
                    </ul>
                </div>

                <table className='table-parent'>
                    <thead>
                        <tr>
                            <td className='td-parent'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th
                                                className='table-heading table-heading-today'
                                            ></th>
                                            <th
                                                className='table-heading table-heading-today'
                                            >
                                                {dayWeek}, {date}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hours.map((hour, i) => {
                                            return (
                                                <tr key={i}>
                                                    <th>{hour}</th>
                                                    <td
                                                        onClick={openModal}
                                                    ></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div
                                    className='div-parent'
                                ></div>
                            </td>
                        </tr>
                    </thead>
                </table>
                {modalEnable ?
                    <Modal
                        cellDetails={day}
                    />
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.firestore.ordered.tasks,
        modalEnable: state.toggleModal.modalEnable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch(openModal())
    }
}

export default compose(
    firestoreConnect([
        { collection: 'tasks' },
    ]),
    connect(mapStateToProps, mapDispatchToProps),
)(Day);