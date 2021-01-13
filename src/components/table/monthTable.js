import React from 'react';
import {TaskMonth} from './task';
import {connect} from 'react-redux';
import Modal from './modal';
import { openModal } from '../../store/actions/toggleModalAction';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import {taskDetails} from './multipleTasks';
import {Redirect} from 'react-router-dom'

class MonthTable extends React.Component{

    state = { 
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        monthTo: null,
        modalEnable: false,
        cellDetails: ''
    }

    componentDidMount(){
        this.idTds();
        this.setDays();
        this.displayTasks();
        taskDetails()
    }

    componentDidUpdate(){
        this.idTds();
        this.setDays();
        this.displayTasks();
        taskDetails()
    }

    onClickHandle = (e) => {
        this.props.openModal()
        this.setState({
            cellDetails: {title: e.target.title},
            modalEnable: true
        })
    }

    handleMonthChange = (e) => {
        this.setState({
            monthTo: new Date(new Date(e.target.value).getFullYear(), new Date(e.target.value).getMonth())
        })
    }

    daysInMonth = (day) => {
        if(day)return (new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate())
        if(!day)return (new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate())
    }
    
    idTds = () => {
        const tds = document.querySelectorAll('td');
        let i = 0;
        tds.forEach(td => {
            i++
            td.setAttribute('id', i)
        });
    }

    setDays = () => {
        const {monthTo} = this.state,
            today = monthTo ? monthTo : new Date(),
            tds = document.querySelectorAll('td');
        let dayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            daysPrevMonth = this.daysInMonth(new Date(today.getFullYear(), today.getMonth()-1)),      
            day = 1,
            dayNextMonth = 1;

        if(dayOfWeek === 0){dayOfWeek=7}
        daysPrevMonth = daysPrevMonth-dayOfWeek+2
        tds.forEach(td => {
            
            if(td.id >= dayOfWeek && parseInt(td.id) - dayOfWeek < this.daysInMonth(today)){
                td.innerHTML = `<p class="day-month">${day}</p>`
                td.setAttribute('title',new Date(today.getFullYear(), today.getMonth(), day).toString().slice(0,15))
                day++
            }else if(td.id < dayOfWeek){
                td.innerHTML = `<p class="day-other-month">${daysPrevMonth}</p>`
                td.setAttribute('title',new Date(today.getFullYear(), today.getMonth()-1, daysPrevMonth).toString().slice(0,15));
                daysPrevMonth++
            }else if(parseInt(td.id) - dayOfWeek >= this.daysInMonth(today)){
                td.innerHTML = `<p class="day-other-month">${dayNextMonth}</p>`;
                td.setAttribute('title',new Date(today.getFullYear(), today.getMonth()+1, dayNextMonth).toString().slice(0,15));
                dayNextMonth++
            }

        })    
    }

    displayTasks = () => {
        const tds = document.querySelectorAll('td'),
            {tasks} = this.props;

        tds.forEach(td => {
            tasks && tasks.forEach(task => {
                if(td.title === new Date(task.date).toString().slice(0,15)
                    && td.childElementCount < 4
                ){
                    td.append(TaskMonth(task))
                }
            })
        })
    }

    render(){
        const {weekDays, monthTo,cellDetails} = this.state,
            {modalEnable, uid} = this.props,
            today = monthTo ? monthTo : new Date(),
            td = [...Array(6)].map(() => 
                <tr key={Math.random()} className='table-row'>
                    {[...Array(7)].map(() =>
                        <td 
                            key={Math.random()} 
                            className='table-data'
                            onClick={this.onClickHandle}    
                        >
                        </td>
                    )}
                </tr>
            )        
            
            if(!uid)this.props.history.push('/login')
    
        return(
            <div className='monthtable'>
                <div className="top-bar">
                    <div>
                        <h3>
                            {today.toLocaleString('default', {month: 'long'})}, {today.getFullYear()}
                        </h3>
                        <input id='top-bar-calendar' type="date" onChange={this.handleMonthChange}/>
                    </div>
                        <ul>
                            <li><a href="/">Day</a></li>
                            <li><a href="/week">Week</a></li>
                            <li><a href="/month">Month</a></li>
                        </ul>
                </div>
                <table className='table fixed'>
                    <thead>
                        <tr className='table-row table-row-heading-month'>
                            {weekDays.map((weekDay, i) => <th className='table-heading th-month' key={i}>{weekDay}</th>)}
                        </tr>

                    </thead>
                    
                    <tbody id='month-tbody'>
                        {td}
                    </tbody>

                </table>
                {modalEnable ?
                    <Modal
                        // startTime={startTime}
                        cellDetails={cellDetails}
                    /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.firestore.ordered.tasks,
        modalEnable: state.toggleModal.modalEnable,
        uid: state.firebase.auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return{
        openModal: () => dispatch(openModal())
    }
}

export default compose(
    firestoreConnect([
        { collection: 'tasks' },
    ]),
    connect(mapStateToProps, mapDispatchToProps),
)(MonthTable)
