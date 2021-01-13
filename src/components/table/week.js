import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../store/actions/toggleModalAction';
import { setWidthDay, removeIdenticalDivs, removeTaskDivs } from './multipleTasks';
import Modal from './modal';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import {taskDetails} from './multipleTasks';

class Week extends React.Component {
    state = {
        day: new Date(),
        daysInWeek: '',
        dateOnMonday: '',
        hours: '',
        weekDaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }

    totalDaysInMonth = (month) => {
        return new Date(2020, month, 0).getDate()
    }

    componentDidMount() {
        this.setDaysInWeek();
        this.setHours();
        setTimeout(() => {
            this.displayTasks()
        });
        taskDetails()
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.displayTasks()
        });
        taskDetails()
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


    dateOnChange = (e) => {
        this.setState({
            day: new Date(e.target.value)
        })
        removeTaskDivs(document.querySelectorAll('.task-div'))
        setTimeout(() => {
            this.setDaysInWeek()
        }, 10);
    }


    setDaysInWeek = () => {
        const { day } = this.state,
            date = day.getDate(),
            weekDay = day.getDay(),
            year = day.getFullYear()
        let month = day.getMonth(),
            dateOnMonday = weekDay > 0 ? date - weekDay + 1 : date - 6,
            daysInWeek = []

        if (dateOnMonday < 1) {
            if (dateOnMonday === 0) {
                dateOnMonday = this.totalDaysInMonth(month)
            } else if (dateOnMonday < 0) {
                dateOnMonday = this.totalDaysInMonth(month) + dateOnMonday
            }
        }
        if (dateOnMonday > date) month--;

        for (let i = 0; i < 7; i++) {
            daysInWeek.push(new Date(year, month, dateOnMonday + i))
        }

        this.setState({
            daysInWeek: [...daysInWeek]
        })
    }

    displayTasks = () => {
        const { tasks } = this.props,
            weekdays = Array.from(document.querySelectorAll('.weekday'))
        let ths = Array.from(document.querySelectorAll('th'));
        //weekdays = Array.from(document.querySelectorAll('.weekday'))

        ths = ths.filter(th => th.id)
        for (let i = 0; i < ths.length; i++) {
            weekdays[i].style.top = ths[i].getBoundingClientRect().bottom + 'px';
            weekdays[i].style.left = ths[i].getBoundingClientRect().left + 'px';
            weekdays[i].style.width = ths[i].getBoundingClientRect().width - 8 + 'px';
        }


        tasks && tasks.forEach(task => {

            ths.forEach(th => {
                if (th.id === new Date(task.date).toString().slice(0, 15)) {

                    const div = document.createElement('div'),
                        p = document.createElement('p'),
                        dayTask = new Date(task.date).getDay(),
                        dayConverted = dayTask === 0 ? 6 : dayTask - 1,
                        divWeekday = weekdays[dayConverted],
                        height = task.height,
                        minsTotal = parseInt(task.timeStart.slice(0, 2)) * 60 + parseInt(task.timeStart.slice(3, 5))

                    p.innerHTML = `${task.eventName} </br> <span>${task.timeStart}-${task.timeEnd}</span>`;
                    div.classList.add('task-div');
                    div.setAttribute('id', task.id);
                    div.setAttribute('data-id', task.id)
                    div.setAttribute('data-date', task.date)
                    div.setAttribute('data-start', task.timeStart)
                    div.setAttribute('data-end', task.timeEnd)
                    div.setAttribute('data-name', task.eventName)
                    div.style.height = height * 35 / 30 + 'px';
                    div.style.top = minsTotal * 35 / 30 + 2 + 'px';
                    div.appendChild(p)

                    divWeekday.appendChild(div);
                    removeIdenticalDivs()
                    setWidthDay(divWeekday.children)
                }
            })
        })
    }

    render() {
        window.addEventListener('resize', () => this.displayTasks());

        const { day, daysInWeek, weekDaysShort, hours } = this.state,
            month = day.toLocaleString('default', { month: 'short' }),
            year = day.getFullYear(),
            { modalEnable, openModal, uid } = this.props

        if(!uid)this.props.history.push('/login');
        return (
            <div className="week">

                <div className="top-bar">
                    <div>
                        <h3>{month} {daysInWeek && daysInWeek[0].getDate()}-{daysInWeek && daysInWeek[6].getDate()}, {year}</h3>
                        <input id='top-bar-calendar' type="date" onChange={this.dateOnChange} />
                    </div>
                    <ul>
                        <li><a href="/">Day</a></li>
                        <li><a href="/week">Week</a></li>
                        <li><a href="/month">Month</a></li>
                    </ul>
                </div>

                <table>

                    <thead>
                        <tr className='tr-heading'>
                            <th></th>
                            {daysInWeek && daysInWeek.map(day => {
                                return (
                                    <>
                                        <th
                                            id={day.toString().slice(0, 15)}
                                        >
                                            {day.toLocaleDateString('locale', { weekday: 'short' })}
                                            <br />
                                            {day.getDate()}
                                        </th>
                                    </>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {hours && hours.map(hour => {
                            return (
                                <>
                                    <tr>
                                        <th rowSpan='2'>{hour}</th>
                                        {[...Array(7)].map(() =>
                                            <td
                                                onClick={openModal}
                                            ></td>
                                        )}
                                    </tr>
                                    <tr>
                                        {[...Array(7)].map(() =>
                                            <td
                                                onClick={openModal}
                                            ></td>
                                        )}
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>

                {weekDaysShort.map(day =>
                    <div
                        className={day + ' weekday'}
                    >
                    </div>
                )}

                {modalEnable ?
                    <Modal
                        // startTime={startTime}
                        cellDetails={day}
                    /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        modalEnable: state.toggleModal.modalEnable,
        tasks: state.firestore.ordered.tasks,
        uid: state.firebase.auth.uid
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
)(Week)